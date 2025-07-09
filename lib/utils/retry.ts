export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 500
): Promise<T> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (e) {
      attempt++;
      if (attempt >= retries) throw e;
      await new Promise((res) => setTimeout(res, delay * 2 ** attempt));
    }
  }
  throw new Error('Retry limit exceeded');
}
