export function log(...args: unknown[]) {
  console.log('[LOG]', new Date().toISOString(), ...args);
}
