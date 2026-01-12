export const RoutePaths = {
  HOME: "/",
  
  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
  
  // Dashboard routes
  DASHBOARD: "/dashboard",
  CONTRACTS: "/contracts",
  TEAM_MANAGEMENT: "/team-management",
  FINANCE: "/finance",
  PAYROLL: "/payroll",
  TRANSACTIONS: "/transactions",
  INVOICES: "/invoices",
  
  // Settings routes
  SETTINGS: "/settings",
  PERMISSIONS: "/settings/permissions",
  ADDRESS_BOOK: "/settings/address-book",
  HIRING_TEMPLATES: "/settings/hiring-templates",
  PREFERENCES: "/settings/preferences",
  PROFILE_SETTINGS: "/settings/profile",
  
  // Profile routes
  PROFILE: "/profile",
  EDIT_PROFILE: "/edit-profile",
} as const;

export type RoutePathType = typeof RoutePaths[keyof typeof RoutePaths];
