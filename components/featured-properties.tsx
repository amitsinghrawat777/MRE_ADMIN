import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Move, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import PropertyImageCarousel from "@/components/property-image-carousel";
import { createClient } from "@/lib/supabase/server";
import { Property } from "@/types/property";

export default async function FeaturedProperties() {
  const supabase = createClient();
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured properties:', error);
    return <p className="text-destructive">Could not load featured properties.</p>;
  }

  if (!properties || properties.length === 0) {
    return <p>No featured properties available.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {properties.map((property: Property) => (
        <Card key={property.id} className="overflow-hidden group border-0 rounded-xl shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-0 relative">
            <PropertyImageCarousel images={property.images} />
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {formatCurrency(property.price)}
            </div>
          </CardContent>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold line-clamp-1">{property.title}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {property.location}
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                {property.bedrooms && (
                <span className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {property.bedrooms} Beds
                </span>
                )}
                {property.bathrooms && (
                <span className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {property.bathrooms} Baths
                </span>
                )}
                {property.sqft && (
                <span className="flex items-center">
                  <Move className="h-4 w-4 mr-1" />
                  {property.sqft.toLocaleString()} sqft
                </span>
                )}
              </div>
              
              <p className="text-muted-foreground line-clamp-2">
                {property.description}
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="px-6 pb-6 pt-0">
            <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Link href={`/properties/${property.id}`}>
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}