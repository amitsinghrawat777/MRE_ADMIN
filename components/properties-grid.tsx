"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Move, 
  ChevronRight,
  Home as HomeIcon,
  Building,
  IndianRupee
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { renderIcon, IconName } from '@/lib/icons';
import PropertyImageCarousel from "@/components/property-image-carousel";
import { Property } from "@/types/property";

interface PropertiesGridProps {
  initialProperties: Property[];
}

// Property type options
const propertyTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'House', label: 'House' },
  { value: 'Flat / Apartment', label: 'Flat / Apartment' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Farmhouse', label: 'Farmhouse' },
  { value: 'Penthouse', label: 'Penthouse' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'Mansion', label: 'Mansion' },
  { value: 'Chalet', label: 'Chalet' },
  { value: 'Plot / Land', label: 'Plot / Land' },
];

// Price range options
const priceRanges = [
  { value: 'all', label: 'Any Price' },
  { value: '0-20000000', label: 'Under ₹2 Cr' },
  { value: '20000000-30000000', label: '₹2 Cr - ₹3 Cr' },
  { value: '30000000-50000000', label: '₹3 Cr - ₹5 Cr' },
  { value: '50000000-100000000', label: '₹5 Cr - ₹10 Cr' },
  { value: '100000000-10000000000', label: 'Over ₹10 Cr' },
  { value: 'custom', label: 'Custom' },
];

const LAND_TYPES = ['Land', 'Plot / Land'];

export default function PropertiesGrid({ initialProperties }: PropertiesGridProps) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';

  const [propertyType, setPropertyType] = useState(initialType);
  const [priceRange, setPriceRange] = useState('all');
  const [customMinPrice, setCustomMinPrice] = useState('');
  const [customMaxPrice, setCustomMaxPrice] = useState('');
  
  useEffect(() => {
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl && propertyTypes.some(t => t.value === typeFromUrl)) {
      setPropertyType(typeFromUrl);
    }
  }, [searchParams]);
  
  // Filter properties based on selected filters
  const filteredProperties = initialProperties.filter((property: Property) => {
    // Filter by property type
    if (propertyType !== 'all') {
      // If the selected filter is a land type, check if the property is any of the land types.
      if (LAND_TYPES.includes(propertyType)) {
        if (!LAND_TYPES.includes(property.property_type)) {
          return false;
        }
      // Otherwise, do a direct match.
      } else if (property.property_type !== propertyType) {
        return false;
      }
    }
    
    // Filter by price
    if (priceRange === 'custom') {
      const min = parseFloat(customMinPrice);
      const max = parseFloat(customMaxPrice);
      if ((customMinPrice && property.price < min) || (customMaxPrice && property.price > max)) {
        return false;
      }
    } else if (priceRange !== 'all') {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      if (property.price < minPrice || (maxPrice && property.price > maxPrice)) {
        return false;
      }
    }
    
    return true;
  });

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(e.target.value);
    if (e.target.value !== 'custom') {
      setCustomMinPrice('');
      setCustomMaxPrice('');
    }
  };

  return (
    <div>
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-muted/40 rounded-lg items-center">
        <div className="flex items-center gap-2">
          <HomeIcon className="h-4 w-4 text-muted-foreground" />
          <select 
            className="bg-background border rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
          <select 
            className="bg-background border rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={priceRange}
            onChange={handlePriceRangeChange}
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {priceRange === 'custom' && (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min Price"
              className="bg-background border rounded-md text-sm p-2 h-auto"
              value={customMinPrice}
              onChange={(e) => setCustomMinPrice(e.target.value)}
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max Price"
              className="bg-background border rounded-md text-sm p-2 h-auto"
              value={customMaxPrice}
              onChange={(e) => setCustomMaxPrice(e.target.value)}
            />
          </div>
        )}
        
        <div className="ml-auto text-sm text-muted-foreground self-center">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </div>
      </div>
      
      {/* Properties grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProperties.map((property: Property) => {
          const isLand = property.property_type === 'Plot / Land' || property.property_type === 'Land';
          let highlights = [];

          if (isLand) {
            highlights = (property.key_points || []).slice(0, 3).map(p => ({
              icon: p.icon,
              text: p.text,
            }));
          } else {
            if (property.bedrooms) highlights.push({ icon: 'Bed', text: `${property.bedrooms} Beds` });
            if (property.bathrooms) highlights.push({ icon: 'Bath', text: `${property.bathrooms} Baths` });
            if (property.sqft) highlights.push({ icon: 'Ruler', text: `${property.sqft.toLocaleString()} sqft` });
          }
          
          return (
          <Card key={property.id} className="overflow-hidden group border-0 rounded-xl shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-0 relative">
              <PropertyImageCarousel images={property.images} showThumbnails={false} />
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
                
                <div className="flex justify-between text-sm flex-wrap gap-x-4 gap-y-2">
                  {highlights.map((h, i) => (
                    <span key={i} className="flex items-center text-muted-foreground">
                      {renderIcon(h.icon as IconName, { className: "h-4 w-4 mr-1.5" })}
                      {h.text}
                    </span>
                  ))}
                </div>
                
                <p className="text-muted-foreground line-clamp-2 h-[40px]">
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
          )
        })}
      </div>
      
      {filteredProperties.length === 0 && (
        <div className="text-center py-20">
          <Building className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-xl font-medium">No properties found</h3>
          <p className="mt-2 text-muted-foreground">
            Try changing your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
}