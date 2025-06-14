"use client";

import { useState, useMemo } from 'react';
import { Property } from '@/types/property';
import { Search, MapPin, Tag, Building } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PropertiesHeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  properties: Property[];
}

export default function PropertiesHeader({ 
  searchTerm, 
  onSearchTermChange,
  properties,
}: PropertiesHeaderProps) {
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];

    const lowercasedTerm = searchTerm.toLowerCase();
    const results: { type: 'Property' | 'Location' | 'Feature'; value: string }[] = [];
    const addedValues = new Set<string>();

    properties.forEach(property => {
      // Titles
      if (property.title.toLowerCase().includes(lowercasedTerm) && !addedValues.has(property.title)) {
        results.push({ type: 'Property', value: property.title });
        addedValues.add(property.title);
      }
      // Locations
      if (property.location.toLowerCase().includes(lowercasedTerm) && !addedValues.has(property.location)) {
        results.push({ type: 'Location', value: property.location });
        addedValues.add(property.location);
      }
      // Key Points
      property.key_points?.forEach(point => {
        if (point.text.toLowerCase().includes(lowercasedTerm) && !addedValues.has(point.text)) {
          results.push({ type: 'Feature', value: point.text });
          addedValues.add(point.text);
        }
      });
    });

    return results.slice(0, 7); // Limit to 7 suggestions
  }, [searchTerm, properties]);

  const getIcon = (type: 'Property' | 'Location' | 'Feature') => {
    switch(type) {
      case 'Property': return <Building className="h-4 w-4 text-muted-foreground" />;
      case 'Location': return <MapPin className="h-4 w-4 text-muted-foreground" />;
      case 'Feature': return <Tag className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <section className="bg-muted/30 py-10 md:py-16 border-b">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Exclusive Properties
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Discover our handpicked collection of exceptional properties, each offering unique character and luxury amenities.
          </p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <Popover open={isFocused && searchTerm.length > 0 && suggestions.length > 0}>
            <PopoverTrigger asChild>
              <div 
                className="flex items-center gap-2 bg-background border rounded-lg p-2 shadow-sm"
              >
                <Search className="h-4 w-4 text-muted-foreground ml-1" />
                <div className="flex-1 px-2">
                  <input
                    type="text"
                    placeholder="Search by location, property type, or features..."
                    className="w-full bg-transparent border-none focus:outline-none text-sm"
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 150)} // delay to allow click
                  />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent 
              className="w-[var(--radix-popover-trigger-width)]"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <ul className="space-y-1">
                {suggestions.map((s, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                    onMouseDown={(e) => {
                      onSearchTermChange(s.value);
                      setIsFocused(false);
                    }}
                  >
                    {getIcon(s.type)}
                    <span className="text-sm">{s.value}</span>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
}