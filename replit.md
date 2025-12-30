# Vyaparify

## Overview

Vyaparify is a SaaS landing page and checkout platform targeting local retail shops in India. The application provides an AI-powered website platform that helps small businesses establish an online presence with features like AI talking websites, Google rankings optimization, and lead management dashboards. The platform includes a marketing landing page and a Razorpay-integrated checkout flow for annual subscription payments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom theme variables and shadcn/ui component library
- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for page transitions and UI animations
- **UI Components**: Radix UI primitives wrapped with shadcn/ui styling (new-york style)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Build Tool**: esbuild for server bundling, Vite for client
- **Development**: tsx for TypeScript execution in development

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` - contains user table definition
- **Migrations**: Drizzle Kit with push command (`db:push`)
- **Current Storage**: In-memory storage implementation (`MemStorage` class) as placeholder until database is provisioned

### Payment Integration
- **Provider**: Razorpay for Indian payment processing
- **Flow**: Server creates order, client handles checkout modal, server verifies payment signature
- **Configuration**: Requires `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` environment variables

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle database schema
└── script/           # Build scripts
```

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

### Build System
- Development runs Vite dev server proxied through Express
- Production builds client with Vite and bundles server with esbuild
- Output goes to `dist/` directory with `dist/public/` for static assets

## External Dependencies

### Payment Gateway
- **Razorpay**: Indian payment processor for handling subscription payments (₹7,999/year plan)
- Required environment variables: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

### Database
- **PostgreSQL**: Primary database (via Drizzle ORM)
- Required environment variable: `DATABASE_URL`
- Session storage: `connect-pg-simple` for Express sessions

### Third-Party UI Services
- **Calendly**: Embedded scheduling widget for booking demos
- **Google Fonts**: Inter and Plus Jakarta Sans font families

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator
- Custom `vite-plugin-meta-images`: Updates OpenGraph meta tags with Replit deployment URLs