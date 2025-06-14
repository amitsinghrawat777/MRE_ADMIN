import DeveloperProfileCard from '@/components/developer-profile-card';
import { createClient } from '@/lib/supabase/server';
import { Code, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Our Developers | A.myth Estates',
  description: 'Meet the talented developers behind the A.myth Estates platform.',
};

export default async function DevelopersPage() {
  const supabase = createClient();
  const { data: developerTeam, error } = await supabase
    .from('team')
    .select('*')
    .eq('team_type', 'Developer')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching developers:', error);
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24 bg-muted/30">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Code className="h-10 w-10 text-primary mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Meet the Developers</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              The creative minds and technical experts building the A.myth Estates platform.
            </p>
          </div>

          {developerTeam && developerTeam.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {developerTeam.map((dev) => (
                <DeveloperProfileCard 
                  key={dev.id} 
                  name={dev.name}
                  role={dev.role || ''}
                  avatarUrl={dev.avatar_url || ''}
                  bio={dev.bio || ''}
                  socials={dev.socials || {}}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Developer information is currently not available.
            </p>
          )}

          <div className="mt-16 text-center">
            <Button asChild variant="outline">
              <Link href="/about">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to About Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}