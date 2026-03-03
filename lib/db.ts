import { cache } from "react";
import { createServerSupabaseClient } from "./supabase/server";
import type {
  Service,
  SiteSettings,
  Image,
  User,
  Meta,
  Post,
  PostSection,
} from "./types";

export const getServices = cache(async (): Promise<Service[]> => {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }
    return (data as Service[]) || [];
  } catch (error) {
    console.error("Error in getServices:", error);
    return [];
  }
});

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching site settings:", error);
      return null;
    }
    return (data as SiteSettings | null) || null;
  } catch (error) {
    console.error("Error in getSiteSettings:", error);
    return null;
  }
});

export const getGlobalMeta = cache(async (): Promise<Meta | null> => {
  try {
    const supabase = await createServerSupabaseClient();
    const settings = await getSiteSettings();

    let query = supabase.from("meta").select("*").limit(1);
    if (settings?.meta_id) {
      query = query.eq("id", settings.meta_id);
    }

    const { data, error } = await query.single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching global meta:", error);
      return null;
    }

    return (data as Meta | null) || null;
  } catch (error) {
    console.error("Error in getGlobalMeta:", error);
    return null;
  }
});

export const getImages = cache(async (section?: string): Promise<Image[]> => {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase
      .from("images")
      .select("*")
      .order("order", { ascending: true });

    if (section) {
      query = query.eq("section", section);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching images:", error);
      return [];
    }
    return (data as Image[]) || [];
  } catch (error) {
    console.error("Error in getImages:", error);
    return [];
  }
});

export type PostWithSectionsAndMeta = {
  post: Post;
  meta: Meta | null;
  sections: PostSection[];
};

export const getPosts = cache(async (): Promise<Post[]> => {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return [];
    }

    return (data as Post[]) || [];
  } catch (error) {
    console.error("Error in getPosts:", error);
    return [];
  }
});

export const getPostSlugs = cache(async (): Promise<string[]> => {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("posts").select("slug");

    if (error) {
      console.error("Error fetching post slugs:", error);
      return [];
    }

    const rows = (data ?? []) as Array<{ slug: string }>;
    return rows.map((item) => item.slug);
  } catch (error) {
    console.error("Error in getPostSlugs:", error);
    return [];
  }
});

export const getPostBySlug = cache(
  async (slug: string): Promise<PostWithSectionsAndMeta | null> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();
      const post = postData as Post | null;

      if (postError || !post) {
        if (postError?.code !== "PGRST116") {
          console.error("Error fetching post:", postError);
        }
        return null;
      }

      const [metaResult, sectionsResult] = await Promise.all([
        supabase.from("meta").select("*").eq("id", post.meta_id).single(),
        supabase
          .from("post_sections")
          .select("*")
          .eq("post_id", post.id)
          .order("order", { ascending: true }),
      ]);

      if (sectionsResult.error) {
        console.error("Error fetching post sections:", sectionsResult.error);
      }

      if (metaResult.error && metaResult.error.code !== "PGRST116") {
        console.error("Error fetching post meta:", metaResult.error);
      }

      return {
        post: post as Post,
        meta: (metaResult.data as Meta | null) || null,
        sections: (sectionsResult.data as PostSection[]) || [],
      };
    } catch (error) {
      console.error("Error in getPostBySlug:", error);
      return null;
    }
  },
);

export async function checkAdminAccess(userId: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data) return false;
  return (data as User).role === "admin";
}
