const COLLECTION_KEY = "ancient-scroll-collected-beasts";

export function getCollectedBeasts(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(COLLECTION_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function setCollectedBeasts(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(ids));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("ancient-scroll:progress-changed"));
    }
  } catch {}
}

export function toggleCollectedBeast(id: string): boolean {
  const current = getCollectedBeasts();
  const exists = current.includes(id);
  const next = exists ? current.filter((x) => x !== id) : [...current, id];
  setCollectedBeasts(next);
  return !exists;
}
