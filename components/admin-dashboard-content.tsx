"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isUserLoggedIn, logoutUser, getUserEmail } from '@/lib/auth';
import { Building, Plus, LogOut, AlertCircle } from 'lucide-react';
import AdminPropertiesList from '@/components/admin-properties-list';
import AdminPropertyForm from '@/components/admin-property-form';
import { useToast } from '@/hooks/use-toast';
import { Property } from '@/types/property';
import { ALL_PROPERTIES } from '@/lib/data';

export default function AdminDashboardContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('properties');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = isUserLoggedIn();
      const email = getUserEmail();
      
      setIsAuthenticated(isLoggedIn);
      setUserEmail(email);
      setIsLoading(false);
      
      // If not logged in, redirect to home
      if (!isLoggedIn) {
        router.push('/about');
        
        toast({
          title: "Authentication required",
          description: "Please login to access the admin dashboard",
          variant: "destructive",
        });
      }
    };

    checkAuth();
    
    // Initialize properties from our mock data
    setProperties([...ALL_PROPERTIES]);
  }, [router, toast]);

  const handleLogout = () => {
    logoutUser();
    router.push('/');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin dashboard",
      duration: 3000,
    });
  };

  const handleAddNewClick = () => {
    setEditingProperty(null);
    setActiveTab('add-edit');
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setActiveTab('add-edit');
  };

  const handleSaveProperty = (property: Property) => {
    if (editingProperty) {
      // Update existing property
      setProperties(properties.map(p => p.id === property.id ? property : p));
      toast({
        title: "Property updated",
        description: `${property.title} has been updated successfully`,
      });
    } else {
      // Add new property
      const newProperty = {
        ...property,
        id: (Math.max(...properties.map(p => parseInt(p.id)), 0) + 1).toString(),
      };
      setProperties([...properties, newProperty]);
      toast({
        title: "Property added",
        description: `${property.title} has been added successfully`,
      });
    }
    setActiveTab('properties');
    setEditingProperty(null);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
    toast({
      title: "Property deleted",
      description: "The property has been deleted successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="animate-pulse text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center max-w-md p-6 rounded-lg bg-muted">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-4">
            You need to be logged in to access the admin dashboard.
          </p>
          <Button onClick={() => router.push('/about')}>Go to Login</Button>
        </div>
      </div>
    );
  }

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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="properties" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Properties
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
              onCancel={() => setActiveTab('properties')}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}