"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Bed, 
  Bath, 
  Move, 
  ChevronLeft, 
  ChevronRight,
  Home as HomeIcon,
  Tag,
  Check
} from "lucide-react";

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <div className="space-y-10">
      {/* Property Title & Location */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {property.property_type}
          </Badge>
          <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground border-secondary/20">
            {property.status}
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
        <div className="flex items-center text-lg text-muted-foreground">
          <MapPin className="h-5 w-5 mr-2" />
          {property.location}
        </div>
        <div className="text-2xl md:text-3xl font-bold text-primary">
          {formatCurrency(property.price)}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative overflow-hidden rounded-xl bg-muted aspect-[16/9] md:aspect-[2/1]">
        <div className="absolute inset-0">
          <Image
            src={property.images[activeImageIndex]}
            alt={`${property.title} - Image ${activeImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="object-cover transition-opacity duration-200"
            priority
          />
        </div>

        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-xs font-medium">
            {activeImageIndex + 1} / {property.images.length}
          </span>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {property.images.map((image, index) => (
          <div 
            key={index} 
            className={`aspect-[4/3] relative rounded-md overflow-hidden cursor-pointer transition-all ${
              index === activeImageIndex ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => goToImage(index)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 20vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Property Details */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">About this property</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Key Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-medium">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-medium">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Move className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Square Feet</p>
                      <p className="font-medium">{property.sqft.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Year Built</p>
                      <p className="font-medium">{property.year_built}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <HomeIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-medium">{property.property_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{property.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Card */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Interested in this property?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Contact us for viewing or more information
                </p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                    placeholder="I'm interested in this property..."
                    defaultValue={`I'm interested in ${property.title} (${property.location})`}
                  ></textarea>
                </div>
                
                <Button className="w-full" size="lg">
                  Send Inquiry
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Note: This form is non-functional in this demo
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}