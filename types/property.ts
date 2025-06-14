export interface KeyPoint {
  icon: string;
  text: string;
}

export type PropertyBase = {
  title: string;
  description: string;
  price: number;
  location: string;
  property_type: string;
  status: string;
  images: string[];
  features?: string[];
  key_points?: KeyPoint[];
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  year_built?: number;
  agent_name?: string;
  agent_title?: string;
  agent_avatar_url?: string;
};

export type Property = PropertyBase & {
  id: number;
  created_at: string;
};

export type PropertyFormData = Omit<PropertyBase, 'price' | 'bedrooms' | 'bathrooms' | 'sqft' | 'year_built'> & {
  price: string | number;
  bedrooms?: string | number;
  bathrooms?: string | number;
  sqft?: string | number;
  year_built?: string | number;
  agent_name?: string;
  agent_title?: string;
  agent_avatar_url?: string;
  key_points?: KeyPoint[];
};