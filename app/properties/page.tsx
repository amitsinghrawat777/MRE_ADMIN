import PropertiesGrid from "@/components/properties-grid";
import PropertiesHeader from "@/components/properties-header";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: 'Properties | Luxury Estates',
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
    // You might want to show a proper error page here
    return <p className="text-center py-20">Could not load properties.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      <PropertiesHeader />
      <section className="py-10 flex-grow">
        <div className="container mx-auto px-4">
          <PropertiesGrid initialProperties={properties || []} />
        </div>
      </section>
    </div>
  );
}