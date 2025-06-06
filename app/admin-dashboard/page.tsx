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

  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    // Handle error appropriately
  }

  return <AdminDashboardContent userEmail={user.email} initialProperties={properties || []} />;
}