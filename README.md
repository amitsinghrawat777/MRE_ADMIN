# Luxury Estates - Premium Real Estate Website

A modern, elegant real estate website built with Next.js, showcasing luxury properties with a clean and minimal design. The website includes both public-facing pages and a secure admin dashboard for property management.

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
├── app/
│   ├── (main)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── admin-dashboard/
│   │   └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── login/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── sonner.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   ├── admin-dashboard-content.tsx
│   ├── admin-login-dialog.tsx
│   ├── admin-properties-list.tsx
│   ├── admin-property-form.tsx
│   ├── featured-properties.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── mode-toggle.tsx
│   ├── property-card.tsx
│   └── theme-provider.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── auth.ts
│   ├── data.ts
│   └── utils.ts
├── public/
│   └── placeholder.svg
├── types/
│   └── property.ts
├── .eslintrc.json
├── .gitignore
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.ts
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

The project can be deployed to any platform that supports Node.js applications (e.g., Vercel, Netlify, AWS).

To build the application for production, run:
```bash
npm run build
```

This will create an optimized production build in the `.next` directory.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

### Code of Conduct

To ensure a welcoming and inclusive environment, we have a Code of Conduct that all contributors are expected to follow. Please read it before contributing. You can find it in the `CODE_OF_CONDUCT.md` file.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Property images from Pexels
- Icons from Lucide React
- UI components from shadcn/ui