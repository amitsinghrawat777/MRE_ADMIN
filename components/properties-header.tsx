import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function PropertiesHeader() {
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

        {/* This is a non-functional search bar for design purposes only */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 bg-background border rounded-lg p-2 shadow-sm">
            <div className="flex-1 px-2">
              <input
                type="text"
                placeholder="Search by location, property type, or features..."
                className="w-full bg-transparent border-none focus:outline-none text-sm"
                disabled
              />
            </div>
            <Button aria-label="Search" disabled>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Note: Search functionality is not implemented in this demo
          </p>
        </div>
      </div>
    </section>
  );
}