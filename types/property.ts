export interface Property {
  id: number;
  created_at: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  year_built?: number;
  property_type: string;
  status: string;
  images: string[];
  features?: string[];
  agent_name?: string;
  agent_title?: string;
  agent_avatar_url?: string;
}

export type PropertyFormData = Omit<Property, 'price' | 'bedrooms' | 'bathrooms' | 'sqft' | 'year_built'> & {
  price: string | number;
  bedrooms?: string | number;
  bathrooms?: string | number;
  sqft?: string | number;
  year_built?: string | number;
};