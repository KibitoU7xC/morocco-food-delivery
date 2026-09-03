/**
 * Common API Response & Pagination Types
 * Shared across all backend API services
 */

export interface ApiResponse<T> {
  success?: boolean;
  status?: boolean;
  message?: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  start?: number;
  end?: number;
  total: number;
  page_count?: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  next_page?: number | null;
  previous_page?: number | null;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}
