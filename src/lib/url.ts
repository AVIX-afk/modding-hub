// Builds links that work both at avix-afk.github.io/modding-hub/
// and later on a custom domain. Always link internal pages through this.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function href(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

export function isExternal(url: string): boolean {
  return /^https?:/.test(url);
}
