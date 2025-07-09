import { ProviderA } from './providers/ProviderA';
import { ProviderB } from './providers/ProviderB';
import { retryWithBackoff } from './utils/retry';
import { isRateLimited } from './utils/rateLimiter';
import { log } from './utils/logger';
import { setStatus, getStatus } from './store/StatusStore';
import { isCircuitOpen, recordFailure } from './utils/circuitBreaker';

export class EmailService {
  private providers = [ProviderA, ProviderB];

  async sendEmail(to: string, subject: string, body: string, id: string) {
    if (getStatus(id)) {
      log(`Duplicate request for ID ${id}. Skipping.`);
      return { status: 'duplicate', message: 'Already processed' };
    }

    if (isRateLimited()) {
      return { status: 'rate_limited', message: 'Too many requests' };
    }

    for (const provider of this.providers) {
      if (isCircuitOpen(provider.name)) {
        log(`Skipping ${provider.name} - Circuit Open`);
        continue;
      }

      try {
        await retryWithBackoff(() => provider.sendEmail(to, subject, body));
        setStatus(id, 'sent');
        log(`Email sent via ${provider.name}`);
        return { status: 'sent', provider: provider.name };
      } catch (err) {
        log(`Failed with ${provider.name}: ${err}`);
        recordFailure(provider.name);
      }
    }

    setStatus(id, 'failed');
    return { status: 'failed', message: 'All providers failed' };
  }
}
