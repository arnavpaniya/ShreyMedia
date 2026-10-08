import { createClient } from "@/utils/supabase/client";
import { CompleteSiteData } from "@/types/content";
import { initialSiteData } from "./initial-content";

const CONTENT_KEY = "shrey_media_site_content";

/**
 * Service to fetch complete site content dynamically.
 * Attempts to fetch from Supabase table 'site_data'; falls back to verified initial data.
 */
export async function getSiteContent(): Promise<CompleteSiteData> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_data")
      .select("content")
      .eq("id", "main")
      .single();

    if (data && data.content && !error) {
      return { ...initialSiteData, ...data.content };
    }
  } catch {
    // In local dev or before Supabase table creation, return verified default data
  }

  return initialSiteData;
}

/**
 * Service to update site content in Supabase.
 */
export async function updateSiteContent(updatedContent: Partial<CompleteSiteData>): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
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
    const message = err instanceof Error ? err.message : "Failed to update content";
    return { success: false, error: message };
  }
}
