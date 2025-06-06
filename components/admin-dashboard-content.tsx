"use client";

import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Plus, LogOut, Mail } from 'lucide-react';
import AdminPropertiesList from '@/components/admin-properties-list';
import AdminPropertyForm from '@/components/admin-property-form';
import { toast } from 'sonner';
import { Property } from '@/types/property';
import { createClient } from '@/lib/supabase/client';

interface AdminDashboardContentProps {
  userEmail: string | undefined;
  initialProperties: Property[];
}

export default function AdminDashboardContent({ userEmail, initialProperties }: AdminDashboardContentProps) {
  const [activeTab, setActiveTab] = useState('properties');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    if (pathname === '/admin/inquiries') {
      setActiveTab('inquiries');
    } else if (activeTab === 'inquiries') {
      // If we navigate away from inquiries, default to properties
      setActiveTab('properties');
    }
  }, [pathname, activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
    toast.success("Logged out successfully", {
      description: "You have been logged out of the admin dashboard",
      duration: 3000,
    });
  };

  const handleAddNewClick = useCallback(() => {
    setEditingProperty(null);
    setActiveTab('add-edit');
  }, []);

  const handleEditProperty = useCallback((property: Property) => {
    setEditingProperty(property);
    setActiveTab('add-edit');
  }, []);

  const handleSaveProperty = async (propertyData: Omit<Property, 'id'>, id?: string) => {
    try {
      if (id) {
      // Update existing property
        const { id: _, created_at, ...updateData } = propertyData as any;

        const { data, error } = await supabase
          .from('properties')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        
        setProperties(prev => prev.map(p => (p.id === id ? data : p)));
        toast.success("Property updated", {
          description: `${data.title} has been updated successfully`,
      });
    } else {
      // Add new property
        const { data, error } = await supabase
          .from('properties')
          .insert(propertyData)
          .select()
          .single();

        if (error) throw error;

        setProperties(prev => [data, ...prev]);
        toast.success("Property added", {
          description: `${data.title} has been added successfully`,
      });
    }
    setActiveTab('properties');
    setEditingProperty(null);
      router.refresh();
    } catch (error: any) {
      console.error('Error saving property:', error);
      toast.error("Error", {
        description: error.message || "There was an error saving the property. Please try again.",
      });
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);

      if (error) throw error;

      setProperties(prev => prev.filter(p => p.id !== id));
      toast.success("Property deleted", {
      description: "The property has been deleted successfully",
    });
      router.refresh();
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast.error("Error", {
        description: error.message || "There was an error deleting the property. Please try again.",
      });
  }
  };

  const handleTabChange = (value: string) => {
    if (value === 'inquiries') {
      router.push('/admin/inquiries');
    } else {
      if (pathname === '/admin/inquiries') {
        router.push('/admin-dashboard');
      }
      setActiveTab(value);
  }
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Logged in as: {userEmail}
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-3">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="properties" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Properties
              </TabsTrigger>
               <TabsTrigger value="inquiries" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Inquiries
              </TabsTrigger>
              <TabsTrigger value="add-edit" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                {editingProperty ? 'Edit Property' : 'Add Property'}
              </TabsTrigger>
            </TabsList>
            
            {activeTab === 'properties' && (
              <Button onClick={handleAddNewClick} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Property
              </Button>
            )}
          </div>

          <TabsContent value="properties" className="pt-4">
            <AdminPropertiesList 
              properties={properties}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          </TabsContent>

          <TabsContent value="add-edit" className="pt-4">
            <AdminPropertyForm 
              property={editingProperty} 
              onSave={handleSaveProperty}
              onCancel={() => {
                setEditingProperty(null);
                setActiveTab('properties');
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}