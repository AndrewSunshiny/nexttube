# Project Context

This document contains detailed information about the project-specific technical decisions, architectural patterns, data flows, and the reasoning behind them.

## Architecture Decisions

### State Management

- **Redux Toolkit (RTK)**: Used for global UI state.
- **RTK Query**: Used for server-state management (API fetching, caching, and pagination).
- **Factory Pattern**: The store is created using a `makeStore` function to ensure SSR safety and prevent state leakage between requests.

### Data Fetching

- **BFF (Backend-for-Frontend)**: All YouTube API calls are proxied through Next.js Route Handlers (`/api/...`) to keep the API key secure on the server.
- **Infinite Scroll**: Implemented using `react-intersection-observer` and RTK Query's `merge` and `serializeQueryArgs` to append pages of data to the cache.

## Patterns & Conventions

### Import Aliases

- `~` is used as the root alias for the `src` directory.

### Component Structure

- **Layouts**: Global elements (Header, Sidebar) are defined in `src/app/layout.tsx`.
- **Providers**: Application-wide providers (StoreProvider) wrap the root layout.

### Naming Conventions

- **Folders**: `kebab-case` for routes and general directories.
- **Components**: `PascalCase` for React components.
- **Services**: `camelCase` for utility and service files.
