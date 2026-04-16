# Project Context

This document contains detailed information about the project-specific technical decisions, architectural patterns, data flows, and the reasoning behind them.

## Architecture Decisions

### State Management

- **Redux Toolkit (RTK)**: Used for global UI state.
- **RTK Query**: Used for server-state management (API fetching, caching, and pagination).
- **Factory Pattern**: The store is created using a `makeStore` function to ensure SSR safety and prevent state leakage between requests.

### Data Fetching

- **BFF (Backend-for-Frontend)**: All YouTube API calls are proxied through Next.js Route Handlers (`src/app/api/videos/route.ts`) to keep the API key secure on the server.
- **YouTube Integration**: The `googleapis` library is used within `src/services/youtube.ts` to interact with the YouTube Data API and map responses to internal types.
- **Infinite Scroll**:
  - Implemented using `react-intersection-observer` in `src/components/feed/Feed.tsx`.
  - A sentinel element at the bottom of the feed triggers the next page fetch by updating the `pageToken` state in the `Feed` component.
  - RTK Query's `merge` and `serializeQueryArgs` are used in the API slice to append new pages of data to the cache instead of replacing them.
  - **Manual Recovery**: The `refetch` function from RTK Query is used to provide "Retry" buttons for both initial load failures and pagination errors.

### Image Handling

- **Optimization Bypass**: YouTube thumbnails use the `unoptimized` prop in the Next.js `Image` component. This prevents "upstream response is invalid" errors from the Next.js Image Optimization API and reduces latency by fetching directly from Google's CDN.
- **Loading States**:
  - **Shimmer Effect**: A custom CSS shimmer animation (defined in `src/app/globals.css` as `.shimmer-wrapper`) is used to provide a professional loading experience.
  - **Transition Logic**: `VideoCard.tsx` implements a loading state using `useState` and the `onLoad` event. It renders a shimmer placeholder and fades in the actual image once loaded to prevent "empty space" flickers.
  - **Fallback Strategy**: If a thumbnail fails to load (`onError`), a static fallback image from `picsum.photos` is used to maintain UI consistency.

## Patterns & Conventions

### Import Aliases

- `~` is used as the root alias for the `src` directory.

### Component Structure

- **Layouts**: Global elements (Header, Sidebar) are defined in `src/app/layout.tsx` and implemented in `src/components/layout/`.
- **Layout Wrappers**: Components like `VideoCardLayout` are used to share the same structure between the actual component (`VideoCard`) and its loading state (`VideoCardSkeleton`).
- **Flexbox Constraints**: Text containers in layouts (e.g., `VideoCardLayout`) must use `flex-1` to ensure that percentage-based widths in skeleton components are calculated relative to the available space and do not collapse to 0px.
- **Feature Components**: Feature-specific components (e.g., Feed, VideoCard) are located in `src/components/feed/`.
- **Providers**: Application-wide providers (StoreProvider) wrap the root layout.

### Naming Conventions

- **Folders**: `kebab-case` for routes and general directories.
- **Components**: `PascalCase` for React components.
- **Services**: `camelCase` for utility and service files.

## Directory Structure

- `src/app`: Next.js App Router configuration, layouts, and API route handlers (e.g., `api/videos/route.ts`).
- `src/components`: Reusable UI components, split into `layout/` and `feed/` (e.g., `Feed.tsx`, `VideoCard.tsx`, `VideoCardSkeleton.tsx`).
- `src/hooks`: Custom React hooks.
- `src/mocks`: Static mock data for development (e.g., `videos.json`).
- `src/services`: API interaction logic and data transformation (e.g., `youtube.ts`).
- `src/store`: Redux store configuration and RTK Query slices.
- `src/types`: Centralized TypeScript definitions.
