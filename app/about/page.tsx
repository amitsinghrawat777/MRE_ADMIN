import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AdminLoginDialog } from "@/components/admin-login-dialog";
import { User, Building, Award, MapPin, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: 'About Us | A.myth Estates',
  description: 'Learn about Luxury Estates and our commitment to exceptional real estate services',
};

export default async function AboutPage() {
  const supabase = createClient();
  const { data: leadershipTeam, error } = await supabase
    .from('team')
    .select('*')
    .eq('team_type', 'Leadership')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="bg-muted/30 py-12 md:py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">About Luxury Estates</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Dedicated to finding exceptional properties for extraordinary clients
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1280"
                alt="Modern living room in luxury home"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2005, Luxury Estates has established itself as a premier real estate firm specializing in high-end properties. Our journey began with a simple vision: to provide discerning clients with access to the most exceptional properties while delivering unparalleled service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With over two decades of experience in the luxury real estate market, our team has developed an extensive network and deep industry knowledge that allows us to offer exclusive properties often before they reach the public market.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We understand that each client has unique requirements and preferences. That's why we take a highly personalized approach to match you with properties that not only meet your practical needs but also resonate with your lifestyle aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Our Core Values</h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide everything we do at Luxury Estates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <User className="h-10 w-10 text-primary mb-4" />,
                title: "Client-Centered Approach",
                description: "Your satisfaction is our top priority. We listen carefully to your needs and work tirelessly to exceed your expectations."
              },
              {
                icon: <Building className="h-10 w-10 text-primary mb-4" />,
                title: "Property Excellence",
                description: "We maintain the highest standards for the properties we represent, ensuring each one offers exceptional quality and value."
              },
              {
                icon: <Award className="h-10 w-10 text-primary mb-4" />,
                title: "Integrity & Expertise",
                description: "Our team operates with unwavering integrity and brings specialized expertise to every transaction."
              }
            ].map((value, index) => (
              <div key={index} className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  {value.icon}
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      {leadershipTeam && leadershipTeam.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Our Leadership Team</h2>
              <p className="mt-4 text-muted-foreground">
                Meet the experts behind Luxury Estates
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipTeam.map((person) => (
                <div key={person.id} className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                    <Image
                      src={person.avatar_url || ''}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-primary text-sm mb-2">{person.role}</p>
                  <p className="text-sm text-muted-foreground">{person.bio}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button asChild variant="secondary">
                <Link href="/developers">
                  View Our Development Team
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">Visit Our Office</h2>
              <p className="opacity-90 leading-relaxed">
                We invite you to visit our main office to discuss your real estate needs in person. Our team is ready to provide personalized consultations and showcase our exclusive property portfolio.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Luxury Estates Headquarters</p>
                    <p className="opacity-90">123 Luxury Lane</p>
                    <p className="opacity-90">Beverly Hills, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image 
                src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1280"
                alt="Luxury Estates Office Building"
                width={600}
                height={400}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Admin Login (hidden) */}
      <div className="container mx-auto px-4 py-16 text-center">
        <AdminLoginDialog />
      </div>
    </div>
  );
}