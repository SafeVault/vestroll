# API Structure

This directory contains all backend API routes for the VestRoll application.

## Directory Structure

```
api/
├── auth/           # Authentication endpoints
├── users/          # User management endpoints
├── payroll/        # Payroll processing endpoints
├── contracts/      # Contract management endpoints
└── transactions/   # Transaction endpoints
```

## API Conventions

### Authentication (`/api/auth`)

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email address

### Users (`/api/users`)

- `GET /api/users` - List all users
- `GET /api/users/[id]` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user
- `GET /api/users/[id]/profile` - Get user profile
- `PUT /api/users/[id]/profile` - Update user profile

### Payroll (`/api/payroll`)

- `GET /api/payroll` - List all payroll records
- `GET /api/payroll/[id]` - Get payroll by ID
- `POST /api/payroll` - Create payroll
- `PUT /api/payroll/[id]` - Update payroll
- `DELETE /api/payroll/[id]` - Delete payroll
- `POST /api/payroll/[id]/process` - Process payroll

### Contracts (`/api/contracts`)

- `GET /api/contracts` - List all contracts
- `GET /api/contracts/[id]` - Get contract by ID
- `POST /api/contracts` - Create contract
- `PUT /api/contracts/[id]` - Update contract
- `DELETE /api/contracts/[id]` - Delete contract
- `POST /api/contracts/[id]/sign` - Sign contract

### Transactions (`/api/transactions`)

- `GET /api/transactions` - List all transactions
- `GET /api/transactions/[id]` - Get transaction by ID
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/stats` - Get transaction statistics

## Response Format

All API responses follow this structure:

```typescript
{
  success: boolean;
  data?: any;
  error?: {
    message: string;
    code: string;
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
```

## Error Handling

Standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Implementation Notes

- Each route file should export GET, POST, PUT, DELETE handlers as needed
- Use Next.js middleware for authentication
- Validate request bodies with Zod schemas
- Use proper error handling and logging
- Implement rate limiting for security
