let onLogout: (() => void) | null = null;

export function setLogoutHandler(fn: () => void) {
  onLogout = fn;
}

export function triggerLogout() {
  onLogout?.();
}