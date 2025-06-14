"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Plus, LogOut, Mail, Users } from 'lucide-react';
import AdminPropertiesList from '@/components/admin-properties-list';
import AdminPropertyForm from '@/components/admin-property-form';
import AdminInquiriesList from '@/components/admin/admin-inquiries-list';
import AdminTeamList from '@/components/admin-team-list';
import AdminTeamForm from '@/components/admin-team-form';
import { toast } from 'sonner';
import { Property, PropertyFormData } from '@/types/property';
import { Inquiry } from '@/types/inquiry';
import { TeamMember, TeamMemberFormData } from '@/types/team';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const parseNumericValue = (value: any): number | undefined => {
  if (value === null || value === undefined || value === '') return undefined;
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return undefined;

  const cleanedValue = value.toLowerCase().replace(/,/g, '').trim();
  
  let num = parseFloat(cleanedValue);

  if (cleanedValue.includes('lakh')) {
    num *= 100000;
  } else if (cleanedValue.includes('crore')) {
    num *= 10000000;
  }

  return isNaN(num) ? undefined : num;
};

interface AdminDashboardContentProps {
  userEmail: string | undefined;
  initialProperties: Property[];
  initialInquiries: Inquiry[];
  initialTeamMembers: TeamMember[];
}

export default function AdminDashboardContent({ userEmail, initialProperties, initialInquiries, initialTeamMembers }: AdminDashboardContentProps) {
  const [activeTab, setActiveTab] = useState('properties');
  const [view, setView] = useState<'list' | 'form' | 'team_form'>('list');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);

  const router = useRouter();
  const supabase = createClient();

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
    setView('form');
  }, []);

  const handleEditProperty = useCallback((property: Property) => {
    setEditingProperty(property);
    setView('form');
  }, []);

  const handleCancelForm = useCallback(() => {
    setEditingProperty(null);
    setView('list');
  }, []);

  const handleSaveProperty = async (propertyData: PropertyFormData, id?: number) => {
    try {
      const processedData = {
        ...propertyData,
        price: parseNumericValue(propertyData.price) ?? 0,
        bedrooms: parseNumericValue(propertyData.bedrooms),
        bathrooms: parseNumericValue(propertyData.bathrooms),
        sqft: parseNumericValue(propertyData.sqft),
        year_built: parseNumericValue(propertyData.year_built),
      };
      
      if (id) {
      // Update existing property
        const { id: _, created_at, ...updateData } = processedData as any;

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
          .insert(processedData)
          .select()
          .single();

        if (error) throw error;

        setProperties(prev => [data, ...prev]);
        toast.success("Property added", {
          description: `${data.title} has been added successfully`,
      });
    }
    setView('list');
    setEditingProperty(null);
      router.refresh();
    } catch (error: any) {
      console.error('Error saving property:', error);
      toast.error("Error", {
        description: error.message || "There was an error saving the property. Please try again.",
      });
    }
  };

  const handleDeleteProperty = async (id: number) => {
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

  const handleDeleteInquiry = async (id: number) => {
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);

      if (error) throw error;

      setInquiries(prev => prev.filter(i => i.id !== id));
      toast.success("Inquiry deleted", {
        description: "The inquiry has been deleted successfully",
      });
      router.refresh();
    } catch (error: any) {
      console.error('Error deleting inquiry:', error);
      toast.error("Error", {
        description: error.message || "There was an error deleting the inquiry. Please try again.",
      });
  }
  };

  const handleAddNewMemberClick = useCallback(() => {
    setEditingMember(null);
    setView('team_form');
  }, []);

  const handleEditMember = useCallback((member: TeamMember) => {
    setEditingMember(member);
    setView('team_form');
  }, []);

  const handleCancelTeamForm = useCallback(() => {
    setEditingMember(null);
    setView('list');
  }, []);
  
  const handleSaveTeamMember = async (memberData: TeamMemberFormData, id?: number) => {
    try {
      if (id) {
        // Exclude protected fields before updating
        const { id: memberId, created_at, ...updateData } = memberData as any;
        const { data, error } = await supabase.from('team').update(updateData).eq('id', id).select().single();
        if (error) throw error;
        setTeamMembers(prev => prev.map(m => (m.id === id ? data : m)));
        toast.success("Team member updated");
      } else {
        const { data, error } = await supabase.from('team').insert(memberData).select().single();
        if (error) throw error;
        setTeamMembers(prev => [data, ...prev]);
        toast.success("Team member added");
      }
      setView('list');
      setEditingMember(null);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to save team member.");
    }
  };
  
  const handleDeleteTeamMember = async (id: number) => {
    try {
      const { error } = await supabase.from('team').delete().eq('id', id);
      if (error) throw error;
      setTeamMembers(prev => prev.filter(m => m.id !== id));
      toast.success("Team member deleted");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete team member.");
  }
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              {view === 'form' 
                ? (editingProperty ? 'Editing Property' : 'Adding New Property')
                : view === 'team_form'
                ? (editingMember ? 'Editing Team Member' : 'Adding New Team Member')
                : `Logged in as: ${userEmail}`
              }
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-3">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {view === 'list' ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
              <TabsTrigger value="team" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Team
              </TabsTrigger>
            </TabsList>
            
            {activeTab === 'properties' && (
              <Button onClick={handleAddNewClick} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Property
              </Button>
            )}
            {activeTab === 'team' && (
              <Button onClick={handleAddNewMemberClick} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
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

            <TabsContent value="inquiries" className="pt-4">
              <AdminInquiriesList 
                inquiries={inquiries}
                onDelete={handleDeleteInquiry}
              />
            </TabsContent>

            <TabsContent value="team" className="pt-4">
              <AdminTeamList 
                teamMembers={teamMembers}
                onEdit={handleEditMember}
                onDelete={handleDeleteTeamMember}
              />
            </TabsContent>
          </Tabs>
        ) : view === 'form' ? (
            <AdminPropertyForm 
              property={editingProperty} 
              onSave={handleSaveProperty}
            onCancel={handleCancelForm}
          />
        ) : (
          <AdminTeamForm
            member={editingMember}
            onSave={handleSaveTeamMember}
            onCancel={handleCancelTeamForm}
            />
        )}
      </div>
    </div>
  );
}