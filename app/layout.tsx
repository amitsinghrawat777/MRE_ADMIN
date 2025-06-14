import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { createClient } from '@/lib/supabase/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Luxury Estates | Premium Real Estate',
  description: 'Discover exceptional luxury properties with our premium real estate services',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: properties } = await supabase.from('properties').select('property_type');

  const typeCounts = (properties || []).reduce((acc, { property_type }) => {
    acc[property_type] = (acc[property_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topPropertyTypes = Object.entries(typeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([type]) => type);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer topPropertyTypes={topPropertyTypes} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}