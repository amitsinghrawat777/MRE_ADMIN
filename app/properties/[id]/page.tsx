import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PropertyDetails from '@/components/property-details';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const supabase = createClient();
  const { data: property } = await supabase
    .from('properties')
    .select('title, description')
    .eq('id', params.id)
    .single();
  
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

export default async function PropertyPage({ params }: PropertyPageProps) {
  const supabase = createClient();
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.id)
    .single();
  
  if (error || !property) {
    notFound();
  }
  
  const serializableProperty = {
    ...property,
    created_at: property.created_at.toString(),
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </Button>
        
        <PropertyDetails property={serializableProperty} />
      </div>
    </div>
  );
}