"use client";

import { useSyncExternalStore } from "react";

// Materials cart, kept in localStorage so it survives a login redirect.
// Only ids are stored — prices are always re-read from the database at
// checkout (and recomputed on the server when the order is created).

const KEY = "refalearn-cart";
const EVENT = "refalearn-cart-change";
const EMPTY: string[] = [];

let cache: { raw: string | null; ids: string[] } = { raw: null, ids: EMPTY };

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cache.raw) return cache.ids;
  let ids: string[] = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    ids = Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : EMPTY;
  } catch {
    ids = EMPTY;
  }
  cache = { raw, ids };
  return ids;
}

function write(ids: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // storage unavailable (private mode) — the cart simply won't persist
  }
  window.dispatchEvent(new Event(EVENT));
}

export function addToCart(id: string) {
  const ids = read();
  if (!ids.includes(id)) write([...ids, id]);
}

export function removeFromCart(id: string) {
  write(read().filter((x) => x !== id));
}

export function clearCart() {
  write([]);
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useCart(): string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
