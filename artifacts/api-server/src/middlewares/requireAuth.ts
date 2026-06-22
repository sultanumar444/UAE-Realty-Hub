import { getAuth, clerkClient } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";

export interface AuthedRequest extends Request {
  userId?: string;
}

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();

const emailCache = new Map<string, { email: string; expires: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

async function getPrimaryEmail(userId: string): Promise<string | null> {
  const cached = emailCache.get(userId);
  if (cached && cached.expires > Date.now()) return cached.email;

  const user = await clerkClient.users.getUser(userId);
  const primary =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;

  if (primary) {
    emailCache.set(userId, {
      email: primary.toLowerCase(),
      expires: Date.now() + CACHE_TTL_MS,
    });
    return primary.toLowerCase();
  }
  return null;
}

export async function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // Fail closed: the admin email must be configured for any protected access.
  if (!ADMIN_EMAIL) {
    req.log.error("ADMIN_EMAIL is not configured; rejecting protected request");
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }

  // Only the single configured admin account may perform protected actions.
  try {
    const email = await getPrimaryEmail(userId);
    if (email !== ADMIN_EMAIL) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
  } catch {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  req.userId = userId;
  next();
}
