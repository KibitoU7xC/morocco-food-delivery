/**
 * Reviews API Module
 * 
 * Endpoints:
 * - POST /api/v1/reviews
 *   Payload: { order_id: number, rating_food: number, rating_delivery: number, comment: string, is_anonymous?: boolean }
 * 
 * - GET /api/v1/reviews/pending
 *   List of delivered orders awaiting customer ratings
 * 
 * - GET /api/v1/restaurants/{id}/reviews
 *   Store reviews and overall rating metrics
 */

export {};
