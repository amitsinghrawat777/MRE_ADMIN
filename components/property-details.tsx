"use client";

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { submitInquiry } from '@/app/actions/inquiries';
import { Property } from "@/types/property";
import PropertyImageCarousel from "@/components/property-image-carousel";
import { formatCurrency } from "@/lib/utils";
import {
  MapPin, Bed, Bath, Move, Building, Calendar,
  ChevronLeft, Star, Share2, Heart, Mail, Phone, User
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PropertyDetailsProps {
  property: Property;
}

const initialState = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Submitting...' : 'Send Inquiry'}
    </Button>
  );
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [state, formAction] = useFormState(submitInquiry, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else if (state.errors) {
        // Log all errors
        Object.entries(state.errors).forEach(([field, errors]) => {
          (errors as string[]).forEach(error => {
            toast.error(`${field}: ${error}`);
          });
        });
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="md:col-span-2">
            <PropertyImageCarousel images={property.images} />
            
            <div className="mt-8">
              <div className="flex justify-between items-start">
                <div>
        <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
                  <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
        </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
        </div>
      </div>

              <div className="mt-6 flex flex-wrap gap-4 text-center">
                {property.bedrooms && (
                  <div className="flex-1 bg-muted/40 p-3 rounded-lg">
                    <Bed className="h-6 w-6 mx-auto text-primary" />
                    <p className="mt-1 text-sm font-medium">{property.bedrooms} Beds</p>
        </div>
                )}
                {property.bathrooms && (
                  <div className="flex-1 bg-muted/40 p-3 rounded-lg">
                    <Bath className="h-6 w-6 mx-auto text-primary" />
                    <p className="mt-1 text-sm font-medium">{property.bathrooms} Baths</p>
        </div>
                )}
                {property.sqft && (
                  <div className="flex-1 bg-muted/40 p-3 rounded-lg">
                    <Move className="h-6 w-6 mx-auto text-primary" />
                    <p className="mt-1 text-sm font-medium">{property.sqft.toLocaleString()} sqft</p>
      </div>
                )}
                {property.property_type && (
                  <div className="flex-1 bg-muted/40 p-3 rounded-lg">
                    <Building className="h-6 w-6 mx-auto text-primary" />
                    <p className="mt-1 text-sm font-medium">{property.property_type}</p>
          </div>
                )}
      </div>

              <Separator className="my-8" />

              <div>
                <h2 className="text-2xl font-semibold">Description</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {property.description}
                </p>
              </div>

              <Separator className="my-8" />
              
              {/* Agent Info */}
              <h2 className="text-2xl font-semibold">Agent Information</h2>
              <Card className="mt-4 border-0 shadow-none bg-muted/40">
                <CardContent className="flex items-center gap-4 p-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-agent.jpg" alt="Agent" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
              <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">Lead Agent, A.myth Estates</p>
                    <div className="flex gap-4 mt-2">
                      <Button variant="outline" size="sm"><Phone className="h-4 w-4 mr-2" /> Call</Button>
                      <Button variant="outline" size="sm"><Mail className="h-4 w-4 mr-2" /> Email</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
                    </div>
                  </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{formatCurrency(property.price)}</div>
                <p className="text-muted-foreground text-sm">Estimated monthly payment</p>

                <Separator className="my-6" />

                <form action={formAction} className="space-y-4">
                  <h3 className="text-lg font-semibold">Interested in this property?</h3>
                  
                  <input type="hidden" name="propertyId" value={property.id} />

                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="name" name="name" placeholder="Your Name" className="pl-9" required />
                    </div>
                    {state.errors?.name && <p className="text-red-500 text-xs">{state.errors.name.join(', ')}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-9" required />
                    </div>
                    {state.errors?.email && <p className="text-red-500 text-xs">{state.errors.email.join(', ')}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-sm font-medium">Phone (Optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" name="phone" placeholder="Your Phone Number" className="pl-9" />
                    </div>
                    {state.errors?.phone && <p className="text-red-500 text-xs">{state.errors.phone.join(', ')}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="I'm interested in this property..."
                      rows={4}
                      required
                      defaultValue={`Hello, I am interested in ${property.title} at ${property.location}. Please provide more information.`}
                    />
                    {state.errors?.message && <p className="text-red-500 text-xs">{state.errors.message.join(', ')}</p>}
              </div>

                  <SubmitButton />

              </form>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
}