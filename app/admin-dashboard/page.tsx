import { createClient } from '@/lib/supabase/server';
import AdminDashboardContent from '@/components/admin-dashboard-content';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Dashboard | Luxury Estates',
  description: 'Manage properties and content for Luxury Estates',
};

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/about');
  }

  const { data: properties, error: propertiesError } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (propertiesError) {
    console.error('Error fetching properties:', propertiesError);
    // Handle error appropriately
  }

  const { data: inquiries, error: inquiriesError } = await supabase
    .from("inquiries")
    .select(`
      *,
      properties (
        id,
        title
      )
    `)
    .order("created_at", { ascending: false });

  if (inquiriesError) {
    console.error("Error fetching inquiries:", inquiriesError);
    // Handle error appropriately
  }

  const { data: team, error: teamError } = await supabase
    .from('team')
    .select('*')
    .order('display_order', { ascending: true });

  if (teamError) {
    console.error("Error fetching team:", teamError);
    // Handle error appropriately
  }

  const serializeData = (data: any[] | null) => {
    if (!data) return [];
    return data.map(item => ({
      ...item,
      created_at: item.created_at.toString(),
    }));
  };

  return <AdminDashboardContent 
    userEmail={user.email} 
    initialProperties={serializeData(properties)} 
    initialInquiries={serializeData(inquiries)}
    initialTeamMembers={serializeData(team)}
  />;
}