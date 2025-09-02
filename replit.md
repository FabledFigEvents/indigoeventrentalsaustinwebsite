# Indigo Event Rentals Austin

## Overview

Indigo Event Rentals Austin is a fashion-inspired boutique event rental platform serving the Austin, TX market. The application provides a luxury e-commerce experience for browsing and renting event furniture, décor, and accessories. The platform positions itself as more than just a rental service - it's a lifestyle brand that treats event curation like fashion styling, with an editorial, boutique aesthetic that makes browsing rentals feel like shopping a high-end fashion lookbook.

The system includes a shopping cart quote builder, product catalog with multiple organizational schemes (collections, categories, vibes), lookbook inspiration galleries, and quote request management. The business model focuses on comprehensive rental services including delivery, setup, teardown, and pickup for events ranging from intimate dinners to large celebrations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, catalog, collections, lookbook, process, about, and contact
- **UI Framework**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React Context for cart management, TanStack Query for server state and caching
- **Styling**: Tailwind CSS with custom design system featuring fashion-inspired typography (Playfair Display serif, Inter sans-serif) and a neutral color palette with indigo primary color

### Backend Architecture
- **Runtime**: Node.js with Express.js framework using TypeScript
- **API Design**: RESTful API with routes for products, collections, lookbook items, and quote requests
- **Data Layer**: In-memory storage implementation with interface for future database integration
- **Request Handling**: Express middleware for JSON parsing, logging, and error handling
- **Development**: Vite development server integration with hot module replacement

### Data Storage Solutions
- **Current Implementation**: In-memory storage with seeded sample data for development
- **Planned Database**: PostgreSQL with Drizzle ORM configuration ready for production
- **Schema Design**: Well-defined database schema for users, products, collections, lookbook items, and quote requests with proper relationships and data types

### Authentication and Authorization
- **Current State**: Basic user schema defined but authentication not yet implemented
- **Prepared Infrastructure**: User management system ready for implementation with secure password handling

### Cart and Quote System
- **Shopping Cart**: Context-based cart management allowing users to build event packages
- **Quote Builder**: Multi-step quote request system capturing event details, contact information, and selected items
- **Pricing Structure**: Transparent pricing with itemized costs including delivery, setup, and damage waiver fees

### Business Logic Architecture
- **Product Organization**: Multiple categorization systems including traditional categories (seating, tables, lighting, linens), aesthetic vibes (luxe, romantic, chic, professional), and curated collections
- **Event Types**: Support for various event categories (wedding, corporate, outdoor) with specialized product groupings
- **Inventory Management**: Product-based system with detailed descriptions, pricing, and styling notes

## External Dependencies

### UI and Styling
- **Radix UI**: Complete set of accessible UI primitives for building the component system
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library providing consistent iconography throughout the application
- **Class Variance Authority**: Utility for creating type-safe component variants

### Development and Build Tools
- **Vite**: Fast development server and build tool with React plugin
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration

### Database and ORM
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Drizzle Kit**: Database migrations and schema management
- **Neon Database**: Serverless PostgreSQL (configured but not yet implemented)

### Form Handling and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation for form data and API requests
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### State Management and Data Fetching
- **TanStack Query**: Server state management with caching, background updates, and error handling
- **React Context**: Client-side state management for cart functionality

### Routing and Navigation
- **Wouter**: Lightweight client-side routing library
- **React Router Alternative**: Chosen for smaller bundle size and simpler API

### Deployment and Hosting
- **Replit**: Development environment with integrated deployment
- **Express Server**: Production-ready server setup with proper error handling and logging