# Next.js Dashboard Boilerplate

A modern, well-structured dashboard boilerplate built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- 📝 TypeScript for type safety
- 🎯 ESLint & Prettier configured
- 📱 Responsive design
- 🔐 Authentication structure ready
- 📊 Sample dashboard pages
- 🎨 Customizable theme with CSS variables
- 🧩 Reusable UI components

## Project Structure

```
dashboard-boilerplate/
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── login/           # Authentication pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── layout/          # Layout components (Header, Sidebar)
│   │   └── ui/              # Reusable UI components
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── services/            # API services
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Helper functions
├── public/                  # Static files
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.json        # Prettier configuration
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Pages

- `/` - Redirects to dashboard
- `/login` - Login page
- `/dashboard` - Main dashboard with statistics
- `/dashboard/analytics` - Analytics page
- `/dashboard/users` - User management
- `/dashboard/products` - Products placeholder
- `/dashboard/reports` - Reports placeholder
- `/dashboard/settings` - Application settings

## Customization

### Theme

The theme can be customized by modifying the CSS variables in `src/app/globals.css`. The boilerplate includes both light and dark theme variables.

### Layout

The dashboard layout consists of:
- **Sidebar**: Collapsible navigation menu
- **Header**: Search bar and user profile
- **Main Content**: Page-specific content

### Components

Reusable components are located in `src/components/ui/`:
- `Button` - Customizable button component
- `Card` - Card container with header and content sections

## Next Steps

1. **Authentication**: Implement real authentication logic in `src/contexts/AuthContext.tsx`
2. **API Integration**: Add your API calls in `src/services/`
3. **State Management**: Consider adding Redux or Zustand for complex state
4. **Charts**: Integrate a charting library (Chart.js, Recharts, etc.)
5. **Forms**: Add form validation with react-hook-form or similar
6. **Testing**: Set up Jest and React Testing Library

## License

MIT