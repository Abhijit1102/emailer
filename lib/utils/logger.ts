export function log(...args: any[]) {
  console.log('[LOG]', new Date().toISOString(), ...args);
}
