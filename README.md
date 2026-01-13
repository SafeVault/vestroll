# VestRoll Payroll System - Web Application

VestRoll is a Payroll management platform designed for modern businesses. Built with **Next.js 15**, **TypeScript**, and **React 19**, it provides a seamless experience for managing contracts, invoices, expenses, team members and financial operations.

---

## 🚀 Technology Stack

### Core

- **Framework**: [Next.js 15.5](https://nextjs.org/) (App Router & Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with `tw-animate-css`

### State & Data

- **Global State**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Forms**: `react-hook-form` + `zod` validation

### UI & UX

- **Components**: [Radix UI](https://www.radix-ui.com/) primitives & [Lucide React](https://lucide.dev/) icons
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Themes**: `next-themes` (Dark/Light mode support)


---

## 📂 Project Structure

```text
vestroll/
├── src/
│   ├── api/                # Backend-related logic & Service Orchestration
│   │   ├── db/             # Database connection/configs
│   │   ├── services/       # Core business logic services
│   │   ├── transactions/   # Transaction processing logic
│   │   └── validations/    # API request/response schemas
│   ├── app/                # Next.js App Router (Routes & Layouts)
│   │   ├── (auth)/         # Authentication routes (Login, Register, etc.)
│   │   └── app/            # Main application shell
│   │       └── (dashboard)/# Protected dashboard routes
│   │           ├── contracts/    # Contract management (Fixed/Milestone/Pay-as-you-go)
│   │           ├── payroll/      # Payroll processing & history
│   │           ├── finance/      # Wallet & Asset management
│   │           └── team-management/ # Employee & Contractor directories
│   ├── components/         # React Components
│   │   ├── ui/             # Reusable atomic UI components (Button, Input, etc.)
│   │   ├── shared/         # Common components (Modals, Headers, Navigation)
│   │   └── features/       # Feature-specific complex components
│   ├── hooks/              # Custom React hooks (useSort, useModal, etc.)
│   ├── lib/                # Utility libraries & Redux slices
│   │   ├── slice/          # Redux Toolkit slices (e.g., modalSlice)
│   │   ├── data/           # Mock data & Constant definitions
│   │   └── store.ts        # Redux store configuration
│   ├── styles/             # Global CSS & Tailwind configuration
│   ├── types/              # TypeScript interfaces & types
│   └── utils/              # Helper functions (cn, formatters)
└── public/                 # Static assets (Images, Fonts, SVGs)
```

---

## ✨ Key Features

- **Automated Payroll**: Schedule and execute payments in fiat or stablecoin.
- **Contract Management**: Multi-step creation flow for Fixed Rate, Pay As You Go, and Milestone-based contracts.
- **Crypto-Ready**: Support for USDT and USDC payments.
- **Finance Analytics**: Real-time tracking of expenses, payouts, and balance metrics.
- **Team Management**: Large directory for managing employees and contractors with permission controls.
- **Compliance & Invoicing**: Automated invoice generation (PDF/Image) and compliance tracking.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- **pnpm** (preferred) or npm/yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SafeVault/vestroll.git
   cd vestroll
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure Environment:
   Create a `.env.local` file in the root directory and add necessary variables (see `.env.example`).

4. Start development server:
   ```bash
   pnpm dev
   ```

### Available Scripts

- `pnpm dev`: Runs the app in development mode with Turbopack.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint for code quality checks.

---

## 🛡️ Coding Standards

- **TypeScript**: Strict typing is required. Avoid `any`.
- **Components**: Follow the `features/` vs `shared/` modular structure.
- **State**: Use Redux for UI-heavy state (modals, global app state) and Zustand for lightweight store needs.
- **Styling**: Use the `cn()` utility for conditional Tailwind classes.

---

## 📄 License

Commercial - All rights reserved to SafeVault/VestRoll.
