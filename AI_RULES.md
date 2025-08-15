# AI Development Rules

This document outlines the technical stack and coding conventions for this project. Following these rules ensures consistency, maintainability, and scalability.

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript for building a type-safe, component-based UI.
- **Build Tool**: Vite for a fast and modern development experience with hot module replacement.
- **Styling**: Tailwind CSS for a utility-first styling workflow.
- **UI Components**: shadcn/ui for a set of reusable, accessible, and composable components.
- **Server State & Data Fetching**: TanStack Query (React Query) for managing asynchronous operations, caching, and server state.
- **HTTP Client**: Axios for making promise-based HTTP requests in the service layer.
- **Forms**: React Hook Form for performant and flexible form handling, paired with Zod for schema-based validation.
- **Icons**: Lucide React for a consistent and comprehensive set of SVG icons.
- **Routing**: React Router for declarative, client-side routing.
- **Date Utilities**: `date-fns` for reliable and straightforward date manipulation.

## LIBRARY_USAGE

### 1. UI and Styling

- **Component Library**: **ALWAYS** use the pre-built shadcn/ui components from `src/components/ui` (e.g., `Button`, `Card`, `Input`) as the foundation for the user interface.
- **Custom Components**: Create new, domain-specific components inside feature folders (e.g., `src/components/social/`) by composing shadcn/ui components.
- **Styling**: **ONLY** use Tailwind CSS utility classes for styling. Do not write custom CSS files or use inline styles.
- **Class Merging**: Use the `cn` utility function from `src/lib/utils.ts` to conditionally apply and merge Tailwind classes.

### 2. State Management

- **Server State**: **MUST** use TanStack Query for all data fetched from an API. Encapsulate queries and mutations within custom hooks (e.g., `useSocialPosts.ts`).
- **Client State**: Use React's built-in hooks (`useState`, `useReducer`, `useContext`) for local and component-level state. Avoid introducing a global state manager like Redux or Zustand unless the complexity demonstrably requires it.

### 3. Data Fetching & API Interaction

- **HTTP Client**: All API requests **MUST** be made using the configured Axios instance in the service layer (`src/services/`).
- **Separation of Concerns**: React components and hooks should **NOT** call `axios` directly. They should call functions from the service layer (e.g., `getAyrshareService()`).

### 4. Forms

- **Form Logic**: **ALWAYS** use React Hook Form (`useForm`) for handling form state, submission, and validation.
- **Validation**: **ALWAYS** use Zod to define validation schemas. Connect Zod schemas to React Hook Form using the `@hookform/resolvers/zod` resolver.

### 5. Icons

- **Icon Set**: **ONLY** use icons from the `lucide-react` library to ensure visual consistency throughout the application.

### 6. Routing

- **Navigation**: Use `react-router-dom` for all client-side routing and navigation. Page components should be located in a `src/pages` directory and routes defined in `src/App.tsx`.

### 7. Utilities

- **Dates**: Use `date-fns` for all date and time formatting or manipulation. Prefer using existing helpers in `src/lib/utils.ts`.
- **General Helpers**: Add any new, pure, and reusable functions to `src/lib/utils.ts`.