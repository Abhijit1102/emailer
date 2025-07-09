const RATE_LIMIT = 5; // per minute
const WINDOW_MS = 60 * 1000;
let timestamps: number[] = [];

export function isRateLimited(): boolean {
  const now = Date.now();
  timestamps = timestamps.filter(ts => now - ts < WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  return false;
}
