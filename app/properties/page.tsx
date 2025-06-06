import PropertiesView from "@/components/properties-view";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: 'Properties | A.myth Estates',
  description: 'Browse our collection of premium luxury properties',
};

export default async function PropertiesPage() {
  const supabase = createClient();
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    return <p className="text-center py-20">Could not load properties.</p>;
  }

  return <PropertiesView properties={properties || []} />;
}