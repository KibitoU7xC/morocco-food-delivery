/**
 * Help & Support Content Types
 */

export interface HelpSupportItem {
  id: number;
  title: string;
  category: 'contact_info' | 'faq' | 'general' | string;
  content: string; // HTML or text
  sort_order: number;
  updated_at: string;
}
