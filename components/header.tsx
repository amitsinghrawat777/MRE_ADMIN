"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Building, Info } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

/**
 * Renders the main header for the website.
 * It includes the site logo, desktop navigation, mobile navigation, and a theme toggle.
 * The header has a transparent background that becomes opaque on scroll.
 */
export default function Header() {
  // State to track whether the user has scrolled down the page.
  const [isScrolled, setIsScrolled] = useState(false);
  // State to control the visibility of the mobile navigation menu.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // `usePathname` hook from Next.js to get the current URL path.
  const pathname = usePathname();

  // `useEffect` hook to handle the scroll event.
  useEffect(() => {
    /**
     * Updates the `isScrolled` state based on the window's vertical scroll position.
     */
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Adds the scroll event listener when the component mounts.
    window.addEventListener('scroll', handleScroll);
    // Removes the scroll event listener when the component unmounts to prevent memory leaks.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggles the `isMenuOpen` state to show or hide the mobile menu.
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Array of navigation links with their paths, labels, and icons.
  const navLinks = [
    { href: '/', label: 'Home', icon: <Home className="h-4 w-4 mr-2" /> },
    { href: '/properties', label: 'Properties', icon: <Building className="h-4 w-4 mr-2" /> },
    { href: '/about', label: 'About', icon: <Info className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        // Applies a background and shadow when the user has scrolled.
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-xl md:text-2xl font-semibold transition-colors">
            A.myth Estates
          </Link>

          {/* Desktop Navigation: Hidden on medium screens and below. */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-foreground',
                  // Highlights the link if it matches the current path.
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
            <ModeToggle />
          </nav>

          {/* Mobile Menu Button: Hidden on medium screens and above. */}
          <div className="flex md:hidden items-center space-x-4">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
              {/* Shows close (X) or menu (hamburger) icon based on menu state. */}
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu: Conditionally rendered based on `isMenuOpen` state. */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center text-sm font-medium p-2 rounded-md transition-colors',
                  // Applies different styles for the active link.
                  pathname === link.href
                    ? 'bg-foreground/10 text-foreground'
                    : 'hover:bg-foreground/5 text-foreground/60 hover:text-foreground'
                )}
                // Closes the menu when a link is clicked.
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}