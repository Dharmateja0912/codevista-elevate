export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export const STORAGE_KEYS = {
  reservations: "codevista:reservations",
  registrations: "codevista:registrations",
  enquiries: "codevista:enquiries",
  seats: "codevista:seats",
  theme: "codevista:theme",
  activity: "codevista:activity",
} as const;

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  batchId: string;
  createdAt: string;
}

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  education: string;
  course: string;
  mode: string;
  batch: string;
  experience: string;
  message: string;
  createdAt: string;
}

export function logActivity(text: string) {
  const list = readStore<{ text: string; at: string }[]>(STORAGE_KEYS.activity, []);
  writeStore(STORAGE_KEYS.activity, [{ text, at: new Date().toISOString() }, ...list].slice(0, 12));
}