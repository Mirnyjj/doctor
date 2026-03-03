import type { Metadata } from "next";
import type { Json } from "@/lib/supabase/database.types";
import type { Meta } from "@/lib/types";

type Author = { name: string; url?: string };
type OgImage = { url: string; width?: number; height?: number; alt?: string };
type GoogleBot = {
  index?: boolean;
  follow?: boolean;
  "max-video-preview"?: number;
  "max-image-preview"?: "none" | "standard" | "large";
  "max-snippet"?: number;
};

const asArray = <T>(value: Json | null): T[] => {
  if (!Array.isArray(value)) return [];
  return value as T[];
};

const asObject = <T>(value: Json | null): T | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as T;
};

export const mapMetaToMetadata = (
  meta: Meta | null,
  fallbackTitle = "Неврологическая клиника",
): Metadata => {
  const keywords = asArray<string>(meta?.keywords ?? null);
  const authors = asArray<Author>(meta?.authors ?? null);
  const ogImages = asArray<OgImage>(meta?.og_images ?? null);
  const twitterImages = asArray<string>(meta?.twitter_images ?? null);
  const googlebot = asObject<GoogleBot>(meta?.googlebot ?? null) || undefined;

  return {
    title: {
      default: meta?.title_default || fallbackTitle,
      template: meta?.title_template || `%s | ${fallbackTitle}`,
    },
    description: meta?.description || undefined,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: authors.length > 0 ? authors : undefined,
    creator: meta?.creator || undefined,
    publisher: meta?.publisher || undefined,
    openGraph: {
      title: meta?.og_title || meta?.title_default || fallbackTitle,
      description: meta?.og_description || meta?.description || undefined,
      url: meta?.og_url || meta?.canonical_url || undefined,
      siteName: meta?.og_site_name || fallbackTitle,
      images: ogImages,
      locale: meta?.og_locale || undefined,
      type: (meta?.og_type as "website" | "article" | undefined) || "website",
    },
    robots: {
      index: meta?.robots_index ?? true,
      follow: meta?.robots_follow ?? true,
      googleBot: googlebot,
    },
    verification: {
      yandex: meta?.yandex_verification || undefined,
    },
    manifest: meta?.manifest || undefined,
    alternates: {
      canonical: meta?.canonical_url || undefined,
    },
    twitter: {
      card:
        (meta?.twitter_card as "summary" | "summary_large_image" | "app" | "player" | undefined) ||
        undefined,
      title: meta?.twitter_title || undefined,
      description: meta?.twitter_description || undefined,
      images: twitterImages.length > 0 ? twitterImages : undefined,
    },
  };
};
