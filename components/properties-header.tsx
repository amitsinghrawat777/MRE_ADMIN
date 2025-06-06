"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface PropertiesHeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export default function PropertiesHeader({ 
  searchTerm, 
  onSearchTermChange,
}: PropertiesHeaderProps) {
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
          <div className="flex items-center gap-2 bg-background border rounded-lg p-2 shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground ml-1" />
            <div className="flex-1 px-2">
              <input
                type="text"
                placeholder="Search by location, property type, or features..."
                className="w-full bg-transparent border-none focus:outline-none text-sm"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}