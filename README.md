# Luxury Estates - Premium Real Estate Website

A modern, elegant real estate website built with Next.js, showcasing luxury properties with a clean, minimal design inspired by Apple's product pages. The website includes both public-facing pages and a secure admin dashboard for property management.

## Features

### Public Website
- **Home Page**: Elegant landing page with property highlights and company introduction
- **Properties Page**: Browse all available properties with advanced filtering
- **Property Details**: Detailed view of each property with image gallery and features
- **About Page**: Company information and hidden admin access
- **Responsive Design**: Optimized for all devices
- **Dark Mode Support**: Toggle between light and dark themes

### Admin Dashboard
- **Secure Authentication**: Email/password login system
- **Property Management**: CRUD operations for all properties
- **Image Gallery**: Support for multiple property images
- **Rich Property Details**: Manage comprehensive property information

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Authentication**: JWT-based auth system
- **State Management**: React Hooks
- **Image Handling**: Next.js Image Component
- **Form Handling**: React Hook Form

## Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/luxury-estates.git
cd luxury-estates
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access

To access the admin dashboard:
1. Navigate to the About page
2. Click the "Admin" link (hidden in footer)
3. Use the following demo credentials:
   - Email: admin@example.com
   - Password: password123

## Project Structure

```
luxury-estates/
├── app/                    # Next.js 13 app directory
│   ├── about/             # About page
│   ├── admin-dashboard/   # Admin dashboard
│   ├── properties/        # Properties listing
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utility functions
├── public/               # Static assets
└── types/                # TypeScript types
```

## Key Features Breakdown

### Property Listings
- Filter by property type
- Filter by price range
- Image carousel for each property
- Detailed property cards

### Property Details
- Full-screen image gallery
- Property specifications
- Features list
- Contact form
- Location information

### Admin Dashboard
- Property management
- Add new properties
- Edit existing properties
- Delete properties
- Image gallery management

## Customization

### Theme
The website uses Tailwind CSS for styling. Customize the theme in:
- `tailwind.config.ts`: Tailwind configuration
- `app/globals.css`: Global styles
- `components.json`: shadcn/ui theme configuration

### Components
All UI components are built using shadcn/ui and can be customized in the `components/ui` directory.

## Deployment

The project is configured for static export and can be deployed to various platforms:

```bash
npm run build
```

This will create a static export in the `out` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Apple's minimal aesthetic
- Property images from Pexels
- Icons from Lucide React
- UI components from shadcn/ui