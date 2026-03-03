import { Database } from "./supabase/database.types";

export type Service = Database["public"]["Tables"]["services"]["Row"];
export type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];
export type ServiceUpdate = Database["public"]["Tables"]["services"]["Update"];

export type Image = Database["public"]["Tables"]["images"]["Row"];
export type ImageInsert = Database["public"]["Tables"]["images"]["Insert"];
export type ImageUpdate = Database["public"]["Tables"]["images"]["Update"];

export type SiteSettings =
  Database["public"]["Tables"]["site_settings"]["Row"];
export type SiteSettingsInsert =
  Database["public"]["Tables"]["site_settings"]["Insert"];
export type SiteSettingsUpdate =
  Database["public"]["Tables"]["site_settings"]["Update"];

export type Meta = Database["public"]["Tables"]["meta"]["Row"];
export type MetaInsert = Database["public"]["Tables"]["meta"]["Insert"];
export type MetaUpdate = Database["public"]["Tables"]["meta"]["Update"];

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

export type PostSection =
  Database["public"]["Tables"]["post_sections"]["Row"];
export type PostSectionInsert =
  Database["public"]["Tables"]["post_sections"]["Insert"];
export type PostSectionUpdate =
  Database["public"]["Tables"]["post_sections"]["Update"];

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
