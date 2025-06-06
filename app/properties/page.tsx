import PropertiesGrid from "@/components/properties-grid";
import PropertiesHeader from "@/components/properties-header";

export const metadata = {
  title: 'Properties | Luxury Estates',
  description: 'Browse our collection of premium luxury properties',
};

export default function PropertiesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      <PropertiesHeader />
      <section className="py-10 flex-grow">
        <div className="container mx-auto px-4">
          <PropertiesGrid />
        </div>
      </section>
    </div>
  );
}