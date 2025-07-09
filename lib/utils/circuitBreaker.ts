type ProviderStatus = {
  failures: number;
  lastFailedAt: number | null;
  isOpen: boolean;
};

const breakerMap = new Map<string, ProviderStatus>();

export function isCircuitOpen(provider: string): boolean {
  const status = breakerMap.get(provider);
  if (!status) return false;
  if (!status.isOpen) return false;

  const timeSinceLastFailure = Date.now() - (status.lastFailedAt || 0);
  if (timeSinceLastFailure > 30000) {
    breakerMap.set(provider, { failures: 0, lastFailedAt: null, isOpen: false });
    return false;
  }
  return true;
}

export function recordFailure(provider: string) {
  const prev = breakerMap.get(provider) || { failures: 0, lastFailedAt: null, isOpen: false };
  const failures = prev.failures + 1;
  const isOpen = failures >= 3;
  breakerMap.set(provider, {
    failures,
    lastFailedAt: Date.now(),
    isOpen,
  });
}
