// src/lib/auth.js
const KEY = 'pv_token';

export function getToken() {
  return localStorage.getItem(KEY);
}
export function isAuthenticated() {
  return !!getToken();
}
export function setToken(t) {
  localStorage.setItem(KEY, t);
}
export function clearToken() {
  localStorage.removeItem(KEY);
}
