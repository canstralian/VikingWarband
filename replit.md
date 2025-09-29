# Viking Mercenaries

## Overview

Viking Mercenaries is a blockchain-powered 3D strategy game built with React Three Fiber where players command a warband of Norse warriors on epic raids and conquests. The game combines classic RPG mechanics with modern blockchain technology, allowing players to recruit mercenaries from 6 unique Viking warrior types, engage in strategic real-time 3D combat, and earn both traditional game currency (gold) and TON cryptocurrency through successful raids.

The game features a comprehensive mercenary management system with RPG progression elements, a contract-based raiding system with varying difficulty levels and rewards, and optional TON wallet integration for blockchain payments and rewards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client uses React with TypeScript and Vite for fast development and building. The UI is built with a custom Viking theme using CSS variables and Tailwind CSS for utility classes. 3D rendering is handled by React Three Fiber with support for GLSL shaders. The application uses Zustand for state management with separate stores for game state, audio management, and TON wallet integration.

### Component Structure
The game follows a screen-based architecture with a main Game component that renders different screens (MainMenu, MercenaryRecruitment, WarbandManagement, RaidContracts, Combat) based on the current game state. UI components are built using Radix UI primitives for accessibility and consistency.

### Backend Architecture
The server is built with Express.js and follows a RESTful API pattern. Routes are organized in a separate routes file with endpoints for player management, mercenary operations, raid contracts, and equipment handling. The architecture supports both development and production modes with Vite integration for hot module replacement during development.

### Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The database schema includes tables for players, mercenaries, raid contracts, completed raids, equipment, and player equipment relationships. Neon Database is used as the serverless PostgreSQL provider.

### Game State Management
State management is handled through Zustand stores:
- **useVikingGame**: Main game state including player stats, warband management, raid system
- **useAudio**: Sound effects and background music control
- **useTON**: TON blockchain wallet integration and payment processing

### Authentication and Authorization
The game uses wallet-based authentication through TON Connect. Players can play in demo mode without connecting a wallet, but blockchain features require wallet connection. Player identification is handled through wallet addresses.

## External Dependencies

### Blockchain Integration
- **TON Blockchain**: Integration for cryptocurrency payments and rewards
- **TON Connect**: Wallet connection and authentication system
- Supports both testnet and mainnet environments

### Database and ORM
- **PostgreSQL**: Primary database for game state persistence
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database operations and migrations (drizzle-orm, drizzle-kit)

### 3D Graphics and Audio
- **React Three Fiber**: React renderer for Three.js 3D graphics (@react-three/fiber)
- **React Three Drei**: Useful helpers and abstractions (@react-three/drei)
- **React Three Post-processing**: Post-processing effects (@react-three/postprocessing)
- **GLSL Support**: Shader support through vite-plugin-glsl

### UI Framework
- **Radix UI**: Accessible UI components (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

### Query and State Management
- **TanStack React Query**: Server state management (@tanstack/react-query)
- **Zustand**: Client state management

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions