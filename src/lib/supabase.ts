import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tjmqatayeqhlunvxusnn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbXFhdGF5ZXFobHVudnh1c25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzUxNjMsImV4cCI6MjA3MzAxMTE2M30.IptNVIfkh-AV7W_x0cPaeWd2cWtTSEN0lWj7LcxluTo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuoteRequestItem {
  service_code: string;
  service_name: string;
  quantity: number;
  details?: Record<string, any>;
}

export interface QuoteRequest {
  p_email: string;
  p_full_name: string;
  p_client_type: 'autonomo' | 'pyme';
  p_notes?: string;
  p_items: QuoteRequestItem[];
}

export async function submitQuoteRequest(request: QuoteRequest): Promise<void> {
  const { error } = await supabase.rpc('create_quote_request', request);
  
  if (error) {
    throw new Error(`Error submitting quote request: ${error.message}`);
  }
}