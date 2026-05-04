import crypto from "crypto";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const SECRET = requireEnv("ADMIN_SECRET");
export const PASSWORD = requireEnv("ADMIN_PASSWORD");

export function createSessionToken(password: string): string {
  return crypto.createHmac("sha256", SECRET).update(password).digest("hex");
}

export function validateSession(token: string | undefined): boolean {
  if (!token) return false;
  return token === createSessionToken(PASSWORD);
}
