# AGENTS.md - Development Guidelines for Agentic Coding

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs `prisma generate && next build`)
- `npm run lint` - Run ESLint checks
- `npm start` - Start production server

## Database Commands
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database

## Code Style Guidelines

### Import Organization
- Use @/* path aliases defined in tsconfig.json
- Group imports: external libs → internal modules → component imports
- Import shadcn/ui components from @/components/ui

### TypeScript & Types
- Strict TypeScript enabled but `noImplicitAny` is off
- Use Zod for schema validation
- Leverage Prisma-generated types for database operations

### Component Conventions
- Use shadcn/ui components as building blocks
- Follow React 19 patterns with hooks
- Use Tailwind CSS classes, avoid inline styles
- Implement proper error boundaries and loading states

### State Management
- Use Zustand for global state management
- Use TanStack Query for server state and caching
- React Hook Form + Zod for form handling

### File Structure
- App Router structure: src/app/ for pages and API routes
- Components: src/components/ui/ for shadcn/ui, src/components/ for custom components
- Utilities: src/lib/ for helper functions and configurations
- Hooks: src/hooks/ for custom React hooks

### ESLint Rules Note
Many ESLint rules are intentionally disabled (see eslint.config.mjs) to allow flexible development while maintaining type safety through TypeScript.