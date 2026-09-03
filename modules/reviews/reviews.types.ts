/**
 * Reviews Types
 */

export interface Review {
  id: number;
  order_id: number;
  customer_id?: number;
  restaurant_id: number;
  reviewer_name?: string;
  rating_food: number;
  rating_delivery: number;
  comment: string;
  images?: string[];
  is_anonymous: boolean;
  created_at: string;
}

export interface ReviewSummary {
  total_reviews: number;
  avg_food_rating: number;
  avg_delivery_rating: number;
}

export interface SubmitReviewRequest {
  order_id: number;
  rating_food: number;
  rating_delivery: number;
  comment: string;
  is_anonymous?: boolean;
}
