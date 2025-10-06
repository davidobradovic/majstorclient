# Trebami Web Application

A modern, responsive Next.js web application for the Trebami service marketplace platform. This application provides a seamless experience for both customers and service workers, connecting them through an intuitive interface.

## 🚀 Features

### For Customers
- **Modern Homepage**: Beautiful landing page with service categories and quick actions
- **Service Discovery**: Browse and search for service professionals by category and location
- **Order Management**: Create, track, and manage service requests with real-time status updates
- **Worker Profiles**: View detailed worker profiles with ratings, reviews, and skills
- **Messaging**: Direct communication with assigned workers
- **Profile Management**: Update personal information and preferences

### For Workers
- **Worker Dashboard**: Comprehensive dashboard with job management and earnings tracking
- **Job Actions**: Accept, reject, start, complete, or cancel orders with status updates
- **Availability Management**: Set working hours and availability status
- **Skills & Experience**: Showcase professional skills and certifications
- **Earnings Tracking**: View completed jobs, ratings, and income statistics

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom components
- **TypeScript**: Full type safety throughout
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Icons**: Heroicons
- **HTTP Client**: Axios with interceptors
- **UI Components**: Custom component library

## 🎨 Design Features

- **Modern UI/UX**: Clean, intuitive interface inspired by Careem and Uber
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Gradient Backgrounds**: Beautiful color schemes and visual effects
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Role-Based UI**: Completely different interfaces for customers vs workers
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 📱 Pages & Features

### Public Pages
- **Homepage**: Modern landing page with service categories and call-to-actions
- **Login/Register**: Beautiful authentication forms with role selection
- **Categories**: Interactive service category browser

### Customer Pages
- **Dashboard**: Personalized dashboard with quick actions and recent orders
- **Workers**: Search and browse service professionals with filters
- **Orders**: Order management with status tracking and filtering
- **Order Creation**: Comprehensive form for creating service requests
- **Messages**: Communication interface with workers
- **Profile**: Account management and settings

### Worker Pages
- **Dashboard**: Job management with earnings and availability controls
- **Jobs**: Available jobs with accept/reject actions
- **Messages**: Communication with customers
- **Profile**: Professional profile management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd trebami-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://trebami.betcoresolutions.com/api
```

### API Integration

The application connects to the Trebami backend API with the following endpoints:

- **Authentication**: `/api/users/login`, `/api/users/register`
- **Categories**: `/api/categories`, `/api/subcategories`
- **Workers**: `/api/workers`, `/api/workers/nearby`
- **Orders**: `/api/orders`, `/api/orders/customer/:id`, `/api/orders/worker/:id`
- **Messages**: `/api/messages`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── categories/        # Service categories
│   ├── workers/           # Worker listings
│   ├── orders/            # Order management
│   ├── messages/          # Messaging system
│   └── profile/           # User profile
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   └── categories/       # Category components
├── contexts/             # React Context providers
├── lib/                  # Utility functions and API client
└── types/                # TypeScript type definitions
```

## 🎯 Key Features

### Role-Based Interface
- **Customer View**: Service discovery, order creation, and tracking
- **Worker View**: Job management, availability controls, and earnings
- **Dynamic Navigation**: Context-aware menu items and actions

### Modern Design System
- **Color Palette**: Blue and indigo gradients with accent colors
- **Typography**: Inter font family with proper hierarchy
- **Spacing**: Consistent spacing system using Tailwind CSS
- **Components**: Reusable, accessible UI components

### Responsive Layout
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: sm, md, lg, xl responsive breakpoints
- **Touch-Friendly**: Large touch targets and gestures
- **Performance**: Optimized images and lazy loading

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📦 Dependencies

### Core Dependencies
- **Next.js**: React framework with App Router
- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework

### UI Dependencies
- **Heroicons**: Beautiful SVG icons
- **Headless UI**: Accessible UI components
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Utility Dependencies
- **Axios**: HTTP client
- **clsx**: Conditional class names
- **tailwind-merge**: Tailwind class merging
- **date-fns**: Date manipulation

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

1. Build the application:
```bash
npm run build
```

2. Deploy the `out` directory to your hosting platform.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Trebami service marketplace platform.

## 🆘 Support

For support, email support@trebami.com or join our Slack channel.

---

**Built with ❤️ by the Trebami Team**