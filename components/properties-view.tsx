"use client";

import { useState, useMemo } from 'react';
import PropertiesHeader from './properties-header';
import PropertiesGrid from './properties-grid';
import { Property } from '@/types/property';

interface PropertiesViewProps {
  properties: Property[];
}

export default function PropertiesView({ properties }: PropertiesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) {
      return properties;
    }
    return properties.filter(property => {
      const searchIn = `${property.title} ${property.location} ${property.description}`.toLowerCase();
      return searchIn.includes(lowercasedSearchTerm);
    });
  }, [properties, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      <PropertiesHeader 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <section className="py-10 flex-grow">
        <div className="container mx-auto px-4">
          <PropertiesGrid initialProperties={filteredProperties} />
        </div>
      </section>
    </div>
  );
} 