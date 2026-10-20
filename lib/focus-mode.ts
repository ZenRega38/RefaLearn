"use client";

import { useEffect, useSyncExternalStore } from "react";

// Focus mode: while a student is answering a quiz, checkpoint or test,
// the site chrome (navbar, footer, chat bubble) steps aside so nothing
// can be tapped by accident and the page feels like an exam room.

let active = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** True while any page holds focus mode. */
export function useFocusModeActive(): boolean {
  return useSyncExternalStore(subscribe, () => active > 0, () => false);
}

/** Holds focus mode while `on` is true (released on unmount). */
export function useFocusMode(on: boolean) {
  useEffect(() => {
    if (!on) return;
    active += 1;
    emit();
    return () => {
      active -= 1;
      emit();
    };
  }, [on]);
}
