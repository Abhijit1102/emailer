const store = new Map<string, string>();

export function setStatus(id: string, status: string) {
  store.set(id, status);
}
export function getStatus(id: string): string | undefined {
  return store.get(id);
}
