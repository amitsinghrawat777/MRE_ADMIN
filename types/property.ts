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
  features: string[];
}