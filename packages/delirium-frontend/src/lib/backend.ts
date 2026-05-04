const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const ADMIN_API_KEY = requireEnv("ADMIN_API_KEY");

export function backendUrl(path: string) {
  return `${BACKEND_URL}${path}`;
}

export function adminHeaders() {
  return { "x-admin-key": ADMIN_API_KEY, "Content-Type": "application/json" };
}
