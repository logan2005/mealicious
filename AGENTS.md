# AGENTS.md - Development Guidelines for Agentic Coding

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs `prisma generate && next build`)
- `npm run lint` - Run ESLint checks
- `npm start` - Start production server
- `npm test` - Run all tests (currently not set up - add Jest/Vitest if needed)

## Testing Commands
- Currently no test framework is configured. To add testing:
  - Install Jest/Vitest: `npm install -D vitest @vitest/ui @testing-library/react`
  - Add test script: `"test": "vitest"`
  - Create vitest.config.ts
- To run a single test: `npm test -- [test-file-path]` (after setup)
- For component testing: Use React Testing Library patterns

## Database Commands
- `npm run db:push` - Push schema changes to database (dev only)
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations (production safe)
- `npm run db:reset` - Reset database (destructive)
- `npx prisma studio` - Open Prisma Studio to browse database

## Code Style Guidelines

### Import Organization
- Use @/* path aliases defined in tsconfig.json
- Group imports in this order:
  1. External libraries (React, next-auth, etc.)
  2. Internal modules (@/lib, @/hooks, etc.)
  3. Component imports (@/components)
  4. Relative imports (./utils, ../types)
- Import shadcn/ui components from @/components/ui
- Import utilities from @/lib/utils
- Use named imports for most cases, default exports for main components

### TypeScript & Types
- Strict TypeScript enabled but `noImplicitAny` is off for flexibility
- Use Zod for schema validation and runtime type checking
- Leverage Prisma-generated types for database operations
- Use proper TypeScript interfaces and type definitions
- Type API responses with proper interfaces in @/types
- Use `type` for object types, `interface` for extendable contracts

### Component Conventions
- Use shadcn/ui components as building blocks (New York style)
- Follow React 19 patterns with hooks and functional components
- Use Tailwind CSS classes with CSS variables, avoid inline styles
- Implement proper error boundaries and loading states
- Use class-variance-authority (CVA) for component variants
- Follow the "new-york" design system from shadcn/ui
- Use "use client" for client components, "use server" for server actions
- Server components by default, client components only when needed

### State Management
- Use Zustand for global state management (see @/store/)
- Use TanStack Query for server state and caching (see @/hooks/use-query*)
- React Hook Form + Zod for form handling and validation
- Use React 19's native features like use() hook for promises
- Use React context for localized component state only
- Avoid prop drilling - use context or Zustand instead

### Styling Guidelines
- Use Tailwind CSS with CSS custom properties for theming
- Follow the color scheme defined in tailwind.config.ts
- Use Lucide icons from @/components/ui for consistency
- Dark mode support via `darkMode: "class"` in Tailwind config
- Use CSS variables for dynamic theming
- Follow spacing scale: 4px base unit
- Use responsive utilities: sm:, md:, lg:, xl:

### File Structure
- App Router structure: src/app/ for pages and API routes
- Components: src/components/ui/ for shadcn/ui, src/components/ for custom components
- Utilities: src/lib/ for helper functions and configurations
- Hooks: src/hooks/ for custom React hooks
- Types: src/types/ for TypeScript type definitions
- Contexts: src/contexts/ for React contexts
- Store: src/store/ for Zustand stores
- Database: prisma/ for database schema and migrations

### Naming Conventions
- Use PascalCase for components (e.g., ProductCard, UserForm)
- Use camelCase for functions and variables (e.g., fetchProducts, isLoading)
- Use kebab-case for file names (e.g., product-card.tsx, user-form.tsx)
- Use snake_case for database fields (follow Prisma conventions)
- Use UPPER_CASE for constants and environment variables
- Use PascalCase for TypeScript types and interfaces
- Use camelCase for API routes and function names

### Error Handling
- Use try-catch blocks for async operations
- Implement proper error boundaries for components
- Use Sonner for toast notifications and error messages
- Handle API errors gracefully with proper status codes
- Use Error boundaries in layout files to catch errors
- Log errors to console in development, use proper error reporting in production
- Return proper error responses from API routes with status codes

### API Development
- API routes in src/app/api/[route]/route.ts
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return JSON responses with consistent structure
- Use Zod for request/response validation
- Implement proper error handling and status codes
- Use authentication middleware where needed (next-auth)
- Follow RESTful conventions for API design

### ESLint Rules Note
Many ESLint rules are intentionally disabled (see eslint.config.mjs) to allow flexible development while maintaining type safety through TypeScript. Key disabled rules include:
- TypeScript strictness rules (`no-explicit-any`, `no-unused-vars`)
- React hook dependency warnings (`react-hooks/exhaustive-deps`)
- General JavaScript best practices rules for development flexibility
- Next.js specific rules (`@next/next/no-img-element`, `@next/next/no-html-link-for-pages`)

### Performance Guidelines
- Use React 19 optimizations (automatic where possible)
- Implement proper loading states and skeleton screens
- Use dynamic imports for large components: `const Component = dynamic(() => import('./Component'))`
- Optimize images with next/image and proper formats
- Use React.memo for expensive components when needed
- Implement proper caching strategies with TanStack Query
- Use Prisma query optimizations (select, include, where clauses)

### Security Guidelines
- Validate all user input with Zod schemas
- Use environment variables for secrets (.env.local)
- Implement proper authentication with next-auth
- Use CSRF protection for forms (handled by Next.js)
- Sanitize user-generated content
- Use proper CORS headers for API routes
- Never expose database credentials or API keys in client code