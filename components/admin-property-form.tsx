"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminPropertyFormProps {
  property: Property | null;
  onSave: (property: Property) => void;
  onCancel: () => void;
}

// Mock image URLs for new uploads
const MOCK_IMAGE_URLS = [
  "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1280",
  "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1280",
  "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1280",
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1280",
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1280",
  "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=1280",
];

// Default empty property
const DEFAULT_PROPERTY: Omit<Property, 'id'> = {
  title: '',
  description: '',
  price: 0,
  location: '',
  bedrooms: 0,
  bathrooms: 0,
  sqft: 0,
  year_built: new Date().getFullYear(),
  property_type: 'Villa',
  status: 'For Sale',
  images: [],
  features: [],
};

export default function AdminPropertyForm({ 
  property, 
  onSave, 
  onCancel 
}: AdminPropertyFormProps) {
  const isEditing = !!property;
  
  const [formData, setFormData] = useState<Omit<Property, 'id'>>({
    ...(property || DEFAULT_PROPERTY)
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let parsedValue: any = value;
    
    // Parse numeric values
    if (['price', 'bedrooms', 'bathrooms', 'sqft', 'year_built'].includes(name)) {
      parsedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleAddImage = () => {
    // Mock image upload by adding a random image from our predefined list
    const randomIndex = Math.floor(Math.random() * MOCK_IMAGE_URLS.length);
    const newImageUrl = MOCK_IMAGE_URLS[randomIndex];
    
    if (!formData.images.includes(newImageUrl)) {
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl],
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create or update the property
    onSave({
      id: property?.id || '0', // The actual ID will be assigned on the admin-dashboard-content
      ...formData,
    });
    
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {isEditing ? 'Edit Property' : 'Add New Property'}
            </h2>
            <Button type="button" variant="ghost" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </div>

          <Separator />
          
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter property title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the property"
                required
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  placeholder="Property price"
                  min="0"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type *</Label>
                <select
                  id="property_type"
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Estate">Estate</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Mansion">Mansion</option>
                  <option value="Chalet">Chalet</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Sold">Sold</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Property Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Property Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms || ''}
                  onChange={handleInputChange}
                  placeholder="Number of bedrooms"
                  min="0"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms || ''}
                  onChange={handleInputChange}
                  placeholder="Number of bathrooms"
                  min="0"
                  step="0.5"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sqft">Square Feet *</Label>
                <Input
                  id="sqft"
                  name="sqft"
                  type="number"
                  value={formData.sqft || ''}
                  onChange={handleInputChange}
                  placeholder="Property size in sqft"
                  min="0"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year_built">Year Built *</Label>
                <Input
                  id="year_built"
                  name="year_built"
                  type="number"
                  value={formData.year_built || ''}
                  onChange={handleInputChange}
                  placeholder="Year property was built"
                  min="1800"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Features & Amenities</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature (e.g., Pool, Garden, Smart Home)"
                  />
                </div>
                <Button 
                  type="button" 
                  onClick={handleAddFeature} 
                  disabled={!newFeature.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              {formData.features.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No features added yet. Add features to highlight property amenities.
                </p>
              )}
            </div>
          </div>
          
          <Separator />
          
          {/* Images */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Property Images</h3>
            
            <div className="space-y-4">
              <Button 
                type="button" 
                onClick={handleAddImage}
                variant="outline"
                className="w-full h-16 border-dashed"
              >
                <Upload className="h-4 w-4 mr-2" />
                Click to Add Image
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Note: In this demo, clicking "Add Image" will add a random sample image.
                In a real app, this would open a file selector to upload your own images.
              </p>
              
              {formData.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group aspect-[4/3]">
                      <img
                        src={image}
                        alt={`Property Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-muted rounded-md">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No images added yet. Property listings with images get more attention.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Property' : 'Add Property'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}