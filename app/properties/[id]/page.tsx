import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ALL_PROPERTIES } from '@/lib/data';
import PropertyDetails from '@/components/property-details';
import { ArrowLeft } from 'lucide-react';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: PropertyPageProps) {
  const property = ALL_PROPERTIES.find(p => p.id === params.id);
  
  if (!property) {
    return {
      title: 'Property Not Found | Luxury Estates',
      description: 'The property you are looking for could not be found.',
    };
  }
  
  return {
    title: `${property.title} | Luxury Estates`,
    description: property.description.slice(0, 160),
  };
}

export function generateStaticParams() {
  return ALL_PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = ALL_PROPERTIES.find(p => p.id === params.id);
  
  if (!property) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </Button>
        
        <PropertyDetails property={property} />
      </div>
    </div>
  );
}