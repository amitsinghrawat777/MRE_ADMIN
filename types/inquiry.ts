import { Property } from "./property";

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  property_id: number;
  created_at: string;
  properties: Pick<Property, 'id' | 'title'> | null;
} 