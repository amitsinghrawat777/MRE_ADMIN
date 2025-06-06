import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Home, Building2, Award, Sparkles } from "lucide-react";
import FeaturedProperties from "@/components/featured-properties";

const features = [
  {
    icon: Home,
    title: "Premium Properties",
    description: "Access to exclusive luxury properties not available on the general market."
  },
  {
    icon: Building2,
    title: "Expert Guidance",
    description: "Our team of experienced real estate professionals will guide you through every step."
  },
  {
    icon: Award,
    title: "Tailored Service",
    description: "Personalized attention to your specific needs and preferences."
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative h-full mx-auto px-4 flex flex-col justify-center items-start">
          <div className="max-w-2xl space-y-6 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Discover Your Perfect Luxury Property
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Exceptional homes for extraordinary lives. Experience the finest in luxury real estate with Luxury Estates.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link href="/properties">
                  View Properties
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <Link href="/about">
                  About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Luxury Estates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-muted/50">
                  <Icon className="h-8 w-8 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Properties</h2>
              <p className="mt-2 text-muted-foreground">Explore our hand-selected luxury properties</p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link href="/properties">
                View All Properties
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <FeaturedProperties />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Sparkles className="h-10 w-10 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Dream Property?</h2>
            <p className="text-lg opacity-90">
              Our collection of premium properties awaits your discovery. Let us help you find the perfect match for your lifestyle.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-4 font-medium">
              <Link href="/properties">
                Explore Properties
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}