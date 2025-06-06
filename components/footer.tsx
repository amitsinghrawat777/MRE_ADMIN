import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">A.myth Estates</h3>
            <p className="text-muted-foreground max-w-xs">
              Specializing in premium properties that offer exceptional living experiences and investment opportunities.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Navigate</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/properties', label: 'Properties' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Property Types</h4>
            <ul className="space-y-2">
              {[
                { label: 'Luxury Homes' },
                { label: 'Penthouses' },
                { label: 'Waterfront Estates' },
                { label: 'Historic Properties' },
                { label: 'Vacation Homes' },
              ].map((item) => (
                <li key={item.label}>
                  <span className="text-muted-foreground">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Bhauwala, Uttarakhand 248007</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">+91 5639925569</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">info@amythestetes.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} A.myth Estates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}