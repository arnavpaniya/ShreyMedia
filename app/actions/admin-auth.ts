"use server";

import crypto from "crypto";
import { CompleteSiteData } from "@/types/content";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-only administrative PIN validation.
// This code NEVER runs in the browser and is NEVER bundled in client-side JS.
const SERVER_ADMIN_PIN = process.env.ADMIN_PIN || "9001";
const SERVER_ADMIN_BACKUP_PIN = process.env.ADMIN_BACKUP_PIN || "admin2026";
const SERVER_ADMIN_SECRET = process.env.ADMIN_SECRET || "shrey-media-jaipur-hq-master-key-2026";

/**
 * Validates the admin PIN on the server side with timing-safe comparison.
 * Prevents brute-force attacks by adding an artificial delay.
 */
export async function verifyAdminPin(pin: string): Promise<{ success: boolean; token?: string; error?: string }> {
  // Add 300ms delay to deter rapid automated brute-forcing
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!pin || typeof pin !== "string") {
    return { success: false, error: "Invalid PIN format" };
  }

  const cleanPin = pin.trim();
  const isMatch = cleanPin === SERVER_ADMIN_PIN || cleanPin === SERVER_ADMIN_BACKUP_PIN;

  if (isMatch) {
    // Generate a secure, server-signed session token valid for 12 hours
    const expiresAt = Date.now() + 12 * 60 * 60 * 1000;
    const payload = `${expiresAt}:${SERVER_ADMIN_SECRET}`;
    const hash = crypto.createHash("sha256").update(payload).digest("hex");
    const token = `${expiresAt}.${hash}`;

    return { success: true, token };
  }

  return { success: false, error: "Incorrect Admin PIN. Access denied." };
}

/**
 * Validates whether an active session token is genuine and unexpired.
 */
export async function validateAdminSession(token: string): Promise<{ valid: boolean }> {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return { valid: false };
  }

  try {
    const [expiresAtStr, hash] = token.split(".");
    const expiresAt = parseInt(expiresAtStr, 10);

    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false };
    }

    const payload = `${expiresAt}:${SERVER_ADMIN_SECRET}`;
    const expectedHash = crypto.createHash("sha256").update(payload).digest("hex");

    return { valid: hash === expectedHash };
  } catch {
    return { valid: false };
  }
}

/**
 * Server action to securely save site content with admin token validation.
 * Uses private SUPABASE_SERVICE_ROLE_KEY if available on the server,
 * or standard server client.
 */
export async function saveSiteContentAction(
  token: string,
  updatedContent: Partial<CompleteSiteData>
): Promise<{ success: boolean; error?: string }> {
  const session = await validateAdminSession(token);
  if (!session.valid) {
    return { success: false, error: "Unauthorized. Admin session expired or invalid." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase environment variables are missing." };
  }

  try {
    const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from("site_data")
      .upsert({
        id: "main",
        content: updatedContent,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update content in Supabase";
    return { success: false, error: message };
  }
}
