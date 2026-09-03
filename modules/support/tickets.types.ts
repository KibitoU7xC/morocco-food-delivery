/**
 * Support Tickets Types
 */

export interface TicketMessage {
  id: number;
  support_ticket_id: number;
  sender_id: number;
  sender_type: 'customer' | 'user' | 'agent';
  message: string;
  attachments: string[];
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: number;
  ticket_number: string;
  creator_id: number;
  creator_type: string;
  target_type: string;
  restaurant_id?: number | string;
  order_id?: number | string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  last_replied_at: string;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  messages?: TicketMessage[];
}

export interface CreateTicketRequest {
  target_type: string;
  restaurant_id?: number;
  order_id?: number;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  message: string;
  attachments?: File[];
}

export interface ReplyTicketRequest {
  message: string;
  attachments?: File[];
}
