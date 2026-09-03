/**
 * Customer Support Tickets API Module
 * 
 * Endpoints:
 * - POST /api/v1/customer/tickets
 *   Multipart/form-data:
 *   - target_type: 'restaurant' | 'merchant' | 'order' | 'courier'
 *   - restaurant_id?: number
 *   - order_id?: number
 *   - subject: string
 *   - category: 'wrong_item' | 'late_delivery' | 'damaged' | 'payment_issue' | 'other'
 *   - priority: 'low' | 'medium' | 'high'
 *   - message: string
 *   - attachments[]: binary images
 * 
 * - GET /api/v1/customer/tickets/{id}
 *   Retrieves ticket conversation history and status ('open' | 'in_progress' | 'resolved' | 'closed')
 * 
 * - POST /api/v1/customer/tickets/{id}/reply
 *   Multipart/form-data:
 *   - message: string
 *   - attachments[]: binary images
 */

export {};
