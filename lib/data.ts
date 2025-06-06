import { Property } from '@/types/property';

export const FEATURED_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Oceanfront Villa',
    description: 'Luxurious oceanfront villa with panoramic views, infinity pool, and direct beach access. This exclusive property offers 6 bedrooms, each with en-suite bathrooms, a gourmet kitchen, home theater, and expansive outdoor entertainment areas.',
    price: 4850000,
    location: 'Malibu, CA',
    bedrooms: 6,
    bathrooms: 7.5,
    sqft: 6200,
    year_built: 2018,
    property_type: 'Villa',
    status: 'For Sale',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1280',
    ],
    features: [
      'Oceanfront', 
      'Infinity Pool', 
      'Home Theater',
      'Wine Cellar',
      'Smart Home System'
    ],
  },
  {
    id: '2',
    title: 'Modern Penthouse',
    description: 'Stunning penthouse in the heart of the city with floor-to-ceiling windows offering spectacular skyline views. Features include custom Italian cabinetry, marble countertops, hardwood floors, and a private rooftop terrace with hot tub.',
    price: 3200000,
    location: 'Downtown Los Angeles, CA',
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3800,
    year_built: 2020,
    property_type: 'Penthouse',
    status: 'For Sale',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=1280',
    ],
    features: [
      'City Views', 
      'Private Rooftop', 
      'Floor-to-ceiling Windows',
      'Smart Home Features',
      'Concierge Service'
    ],
  },
  {
    id: '3',
    title: 'Countryside Estate',
    description: 'Expansive estate set on 10 acres of private land with mature landscaping, outdoor pool, tennis court, and guest house. The main residence features grand entertaining spaces, a chef\'s kitchen, library, and spa-like master retreat.',
    price: 5750000,
    location: 'Santa Barbara, CA',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7500,
    year_built: 2005,
    property_type: 'Estate',
    status: 'For Sale',
    images: [
      'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1280',
    ],
    features: [
      '10 Acre Property', 
      'Pool & Tennis Court', 
      'Guest House',
      'Wine Cellar',
      'Home Office'
    ],
  },
];

export const ALL_PROPERTIES: Property[] = [
  ...FEATURED_PROPERTIES,
  {
    id: '4',
    title: 'Historic Brownstone',
    description: 'Beautifully restored 19th century brownstone with original architectural details perfectly blended with modern conveniences. Features include original hardwood floors, crown molding, 3 fireplaces, a chef\'s kitchen, and a landscaped garden.',
    price: 4200000,
    location: 'Brooklyn, NY',
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 4200,
    year_built: 1890,
    property_type: 'Townhouse',
    status: 'For Sale',
    images: [
      'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1280',
    ],
    features: [
      'Historic Building', 
      'Original Details', 
      'Private Garden',
      'Chef\'s Kitchen',
      'Multiple Fireplaces'
    ],
  },
  {
    id: '5',
    title: 'Mountain Retreat',
    description: 'Stunning mountain home with breathtaking views, built with reclaimed timber and natural stone. This luxury retreat features vaulted ceilings, floor-to-ceiling windows, a gourmet kitchen, and multiple outdoor living spaces.',
    price: 3850000,
    location: 'Aspen, CO',
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 4800,
    year_built: 2016,
    property_type: 'Chalet',
    status: 'For Sale',
    images: [
      'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg?auto=compress&cs=tinysrgb&w=1280',
    ],
    features: [
      'Mountain Views', 
      'Outdoor Hot Tub', 
      'Stone Fireplace',
      'Heated Floors',
      'Ski Room'
    ],
  },
  {
    id: '6',
    title: 'Waterfront Mansion',
    description: 'Extraordinary waterfront property with deep water dock, boathouse, and private beach. The residence boasts soaring ceilings, walls of glass, a chef\'s kitchen, home theater, wine cellar, and a resort-style pool with cabana.',
    price: 7900000,
    location: 'Miami Beach, FL',
    bedrooms: 7,
    bathrooms: 9.5,
    sqft: 9800,
    year_built: 2012,
    property_type: 'Mansion',
    status: 'For Sale',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1280',
      'https://images.pexels.com/photos/1404469/pexels-photo-1404469.jpeg?auto=compress&cs=tinysrgb&w=1280',
    ],
    features: [
      'Waterfront', 
      'Private Dock', 
      'Home Theater',
      'Wine Cellar',
      'Resort Pool'
    ],
  },
];