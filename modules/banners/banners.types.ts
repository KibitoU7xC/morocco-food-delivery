/**
 * Banners Types
 */

export interface Banner {
  id: number;
  title: string;
  image: string;
  redirect_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
