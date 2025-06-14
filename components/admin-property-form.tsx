"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X, Upload, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { formatNumberForInput } from '@/lib/utils';
import type { Property, PropertyFormData, KeyPoint } from '@/types/property';
import IconPicker from '@/components/icon-picker';
import { IconName, renderIcon } from '@/lib/icons';

interface AdminPropertyFormProps {
  property: Property | null;
  onSave: (propertyData: PropertyFormData, id?: number) => Promise<void>;
  onCancel: () => void;
}

const DEFAULT_PROPERTY: PropertyFormData = {
  title: '',
  description: '',
  price: '',
  location: '',
  property_type: 'House',
  status: 'For Sale',
  images: [],
  features: [],
  key_points: [],
  bedrooms: '',
  bathrooms: '',
  sqft: '',
  year_built: '',
  agent_name: '',
  agent_title: '',
  agent_avatar_url: '',
};

const PROPERTY_TYPES = [
  "House", 
  "Flat / Apartment", 
  "Villa", 
  "Farmhouse",
  "Penthouse", 
  "Townhouse", 
  "Mansion", 
  "Chalet", 
  "Plot / Land"
];
const STATUS_OPTIONS = ["For Sale", "For Rent", "Sold", "Rented"];

const MAX_CUSTOM_KEY_POINTS = 5;

export default function AdminPropertyForm({ 
  property, 
  onSave, 
  onCancel 
}: AdminPropertyFormProps) {
  const isEditing = !!property;
  
  const [formData, setFormData] = useState<PropertyFormData>({
    ...DEFAULT_PROPERTY,
    ...(property || {}),
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (property) {
      setFormData({
        ...DEFAULT_PROPERTY,
        ...property,
        price: formatNumberForInput(property.price),
        bedrooms: property.bedrooms?.toString() ?? '',
        bathrooms: property.bathrooms?.toString() ?? '',
        sqft: property.sqft?.toString() ?? '',
        year_built: property.year_built?.toString() ?? '',
      });
    } else {
      setFormData(DEFAULT_PROPERTY);
    }
  }, [property]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const newState: Partial<PropertyFormData> = { ...prev, [name]: value };
      if (name === 'property_type' && (value === 'Land' || value === 'Plot / Land')) {
        newState.bedrooms = '';
        newState.bathrooms = '';
        newState.sqft = '';
        newState.year_built = '';
      }
      return newState as PropertyFormData;
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({ ...prev, features: [...(prev.features || []), newFeature.trim()] }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features?.filter((_, i) => i !== index) || [] }));
  };

  const handleKeyPointChange = (index: number, field: keyof KeyPoint, value: string) => {
    setFormData(prev => {
      const newKeyPoints = [...(prev.key_points || [])];
      newKeyPoints[index] = { ...newKeyPoints[index], [field]: value };
      return { ...prev, key_points: newKeyPoints };
    });
  };

  const handleAddKeyPoint = () => {
    setFormData(prev => ({
      ...prev,
      key_points: [...(prev.key_points || []), { icon: 'Star', text: '' }]
    }));
  };

  const handleRemoveKeyPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      key_points: prev.key_points?.filter((_, i) => i !== index) || []
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      toast.error('ImgBB API key is not configured.');
      return;
    }

    const body = new FormData();
    body.append('image', file);

    setIsUploading(true);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: body,
      });

      const result = await response.json();

      if (result.success) {
        setFormData(prev => ({ ...prev, images: [...(prev.images || []), result.data.display_url] }));
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error(result.error?.message || 'Unknown error uploading to ImgBB');
      }
    } catch (error: any) {
      toast.error('Image upload failed', { description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Note: This only removes the image from the form state.
    // To delete from ImgBB, you would need to store and use the delete_url.
    setFormData(prev => ({ ...prev, images: prev.images?.filter((_, i) => i !== index) || [] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData, property?.id);
    } finally {
    setIsSubmitting(false);
    }
  };

  const isLand = formData.property_type === 'Plot / Land' || formData.property_type === 'Land';

  const fixedHighlights = [
    { name: 'bedrooms', label: 'Bedrooms', icon: 'Bed' as IconName },
    { name: 'bathrooms', label: 'Bathrooms', icon: 'Bath' as IconName },
    { name: 'sqft', label: 'Square Feet', icon: 'Ruler' as IconName },
    { name: 'year_built', label: 'Year Built', icon: 'Calendar' as IconName },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form header */}
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
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., 'Sunset View Villa'" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g., 'Malibu, CA'" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Detailed description of the property" required rows={5} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price (INR) *</Label>
                <Input id="price" name="price" type="text" value={formData.price || ''} onChange={handleInputChange} placeholder="e.g., 2,500,000 or 25 lakh" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type *</Label>
                <Select name="property_type" value={formData.property_type} onValueChange={(value) => handleSelectChange('property_type', value)}>
                  <SelectTrigger><SelectValue placeholder="Select property type" /></SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Property Details */}
          {!isLand && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Property Highlights</h3>
              
              {/* Fixed Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fixedHighlights.map(item => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                      {renderIcon(item.icon, { className: "h-5 w-5 text-muted-foreground" })}
                    </div>
                    <div className="flex-grow space-y-1">
                      <Label htmlFor={item.name}>{item.label}</Label>
                      <Input
                        id={item.name}
                        name={item.name}
                        type="text"
                        value={formData[item.name as keyof PropertyFormData] as string || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., 4"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
            </div>
          )}
          
          {/* Agent Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Agent Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="agent_name">Agent Name</Label>
                <Input id="agent_name" name="agent_name" value={formData.agent_name || ''} onChange={handleInputChange} placeholder="e.g., Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent_title">Agent Title</Label>
                <Input id="agent_title" name="agent_title" value={formData.agent_title || ''} onChange={handleInputChange} placeholder="e.g., Senior Agent" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent_avatar_url">Agent Avatar URL</Label>
              <Input id="agent_avatar_url" name="agent_avatar_url" value={formData.agent_avatar_url || ''} onChange={handleInputChange} placeholder="https://example.com/avatar.jpg" />
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Features</h3>
            <div className="space-y-4">
              {formData.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={feature} readOnly className="flex-grow" />
                  <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveFeature(index)}><X className="h-4 w-4" /></Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add a new feature" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }} />
                <Button type="button" onClick={handleAddFeature}><Plus className="h-4 w-4 mr-2" />Add</Button>
              </div>
            </div>
          </div>
          
          {/* Custom Key Points */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Custom Key Points</h3>
                <p className="text-sm text-muted-foreground">
                  Add up to {MAX_CUSTOM_KEY_POINTS} unique features of the property.
                </p>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddKeyPoint}
                disabled={(formData.key_points?.length || 0) >= MAX_CUSTOM_KEY_POINTS}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Point
              </Button>
            </div>
            <div className="space-y-4">
              {formData.key_points?.map((point, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-md bg-muted/50">
                  <IconPicker 
                    value={point.icon as IconName}
                    onChange={(icon) => handleKeyPointChange(index, 'icon', icon)}
                  />
                  <Input
                    placeholder="e.g., 'Ocean View'"
                    value={point.text}
                    onChange={(e) => handleKeyPointChange(index, 'text', e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveKeyPoint(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {(formData.key_points?.length || 0) === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No custom key points added.
                </p>
              )}
            </div>
          </div>
          
          {/* Image Management */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Image Management</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images?.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt={`Property image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              <Card
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 flex items-center justify-center border-2 border-dashed hover:border-primary transition-colors cursor-pointer"
              >
                {isUploading ? (
                  <div className="text-center">
                    <Loader2 className="h-6 w-6 mx-auto text-muted-foreground animate-spin" />
                    <p className="mt-1 text-sm text-muted-foreground">Uploading...</p>
                </div>
              ) : (
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="mt-1 text-sm text-muted-foreground">Add Image</p>
                </div>
              )}
              </Card>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload}
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>
          
          <Separator />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Changes' : 'Add Property')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}