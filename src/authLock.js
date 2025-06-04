let hasRefreshedOnce = false

export function resetLock() {
  hasRefreshedOnce = false
}

export function markRefreshed() {
  hasRefreshedOnce = true
}

export function hasAlreadyRefreshed() {
  return hasRefreshedOnce
}