# User Analytics Dashboard

A powerful React dashboard application showcasing user management and analytics capabilities.

## Quick Start

1. Clone and install:
   ```bash
   git clone <repository-url>
   cd user-analytics-dashboard 
   npm install
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. View at: [http://localhost:5173](http://localhost:5173)

## Features

### User Management
- Real-time search by name/email
- Role-based user table with pagination
- User profile modal view
- Delete with confirmation
- Tracks deleted user metrics

### Analytics Dashboard
- Registration trend line chart
- User status pie chart
- Regional distribution bar chart
- Date range filtering
- Region-based filtering
- Real-time metric updates

## Tech Stack
- **React 18** + **TypeScript**
- **Vite**
- **Redux Toolkit**
- **Tailwind CSS**
- **Recharts**
- **ESLint**

## Project Structure

```
/src
  /components      
    UserModal.tsx
    AnalyticsFilter.tsx
  /pages           
    Dashboard.tsx
    AnalyticsDashboard.tsx
  /redux
    store.ts
    /slices
      userSlice.ts
      authSlice.ts
      analyticsSlice.ts
  /mock           
    users.ts
    analytics.ts
```

## Commands

- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Preview Build**: `npm run preview`
- **Lint Code**: `npm run lint`

## Data Structures

### User
```typescript
{
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}
```

### Analytics
```typescript
{
  registrationTrend: Array;
  regionData: Array;
  userStatusData: Array;
}
```

## Styling

- **Tailwind CSS Utilities**
- Responsive breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## License

This project is licensed under the MIT License.
