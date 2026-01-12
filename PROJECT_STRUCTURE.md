# VestRoll Project Structure

This document outlines the folder structure and architecture of the VestRoll payroll management system.

## Project Structure

```
vestroll/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group (no layout)
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   └── verify-email/
│   │   ├── (dashboard)/              # Protected dashboard routes
│   │   │   ├── dashboard/
│   │   │   ├── contracts/
│   │   │   ├── finance/
│   │   │   ├── payroll/
│   │   │   ├── transactions/
│   │   │   ├── invoices/
│   │   │   ├── settings/
│   │   │   ├── team-management/
│   │   │   └── layout.tsx            # Dashboard layout with AppShell
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── payroll/
│   │   │   ├── contracts/
│   │   │   └── transactions/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Root page (redirects to login)
│   │   └── globals.css
│   ├── components/
│   │   ├── features/                 # Feature-specific components
│   │   │   ├── auth/                 # Authentication components
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   ├── contracts/            # Contract management
│   │   │   ├── finance/              # Finance components
│   │   │   ├── invoices/             # Invoice components
│   │   │   ├── expenses/             # Expense tracking
│   │   │   ├── permissions/          # Permission management
│   │   │   ├── preferences/          # User preferences
│   │   │   ├── profile-settings/     # Profile settings
│   │   │   └── hiring-template/      # Hiring templates
│   │   ├── layout/                   # Layout components
│   │   │   ├── app-shell.tsx         # Main app shell
│   │   │   ├── sidebar.tsx           # Navigation sidebar
│   │   │   ├── desktop-header.tsx
│   │   │   └── mobile-header.tsx
│   │   ├── shared/                   # Shared/reusable components
│   │   │   ├── modal/                # Modal components
│   │   │   ├── table/                # Table components
│   │   │   ├── common/               # Common utilities
│   │   │   ├── icons.tsx             # SVG icons
│   │   │   ├── theme-provider.tsx
│   │   │   └── Avatar.tsx
│   │   └── ui/                       # UI primitives (shadcn/ui)
│   ├── lib/                          # Utility functions
│   │   ├── utils.ts                  # General utilities
│   │   ├── routes.ts                 # Route constants
│   │   └── mock-data.ts              # Mock data for development
│   ├── libs/                         # Third-party integrations
│   │   ├── provider.tsx              # Redux provider
│   │   ├── store.ts                  # Redux store
│   │   └── slice/                    # Redux slices
│   ├── hooks/                        # Custom React hooks
│   ├── types/                        # TypeScript type definitions
│   └── utils/                        # Additional utilities
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
└── package.json
```

## Architecture Principles

### 1. **Route Groups**

- `(auth)`: Authentication pages without dashboard layout
- `(dashboard)`: Protected pages with sidebar and header

### 2. **Component Organization**

- **features/**: Domain-specific components (auth, contracts, finance, etc.)
- **layout/**: App structure components (shell, sidebar, headers)
- **shared/**: Reusable components across features
- **ui/**: Base UI primitives (buttons, inputs, etc.)

### 3. **API Structure**

- RESTful API routes organized by resource
- Each route has GET, POST, PUT, DELETE handlers as needed
- Centralized in `/api` directory

### 4. **State Management**

- Redux Toolkit for global state
- React Query for server state
- Local state with useState/useReducer

### 5. **Type Safety**

- Centralized type definitions in `/types`
- Route constants in `/lib/routes.ts`
- Strict TypeScript configuration

## Navigation Flow

1. **Root (/)** → Redirects to `/login`
2. **Login** → Authenticates → `/dashboard`
3. **Dashboard** → Protected routes with AppShell layout
4. **Sidebar** → Navigation to all dashboard pages

## Best Practices

- Keep components focused and single-responsibility
- Use feature folders for domain logic
- Shared components should be truly reusable
- API routes follow REST conventions
- Type everything with TypeScript
- Use route constants instead of hardcoded paths
