# TanStack Query Integration Plan

This plan outlines the steps to understand TanStack Query and integrate it into the codebase for handling custom PocketBase routes once the backend is extended with Go.

## Phase 1: Learning TanStack Query

1. **Install TanStack Query**
   - Add `@tanstack/react-query` to package.json dependencies
   - Run `pnpm install` to install the package

2. **Study Core Concepts**
   - Read the official TanStack Query documentation: https://tanstack.com/query/latest
   - Focus on key concepts: QueryClient, useQuery, useMutation, caching, invalidation
   - Watch introductory tutorials (e.g., from TanStack YouTube channel or React Query course on egghead.io)

3. **Understand Best Practices**
   - Learn about query keys, optimistic updates, background refetching
   - Study error handling and loading states
   - Review integration with React Router and TypeScript

## Phase 2: Setup in Codebase

1. **Configure QueryClient**
   - Create a QueryClient instance in `lib/queryClient.ts`
   - Set up default options for queries and mutations
   - Integrate with React Router's root component

2. **Wrap App with QueryClientProvider**
   - Update `root.tsx` to provide the QueryClient to the app
   - Ensure it's available throughout the component tree

3. **Create Custom Hooks for PocketBase**
   - Build hooks in `hooks/` directory for common data fetching patterns
   - Start with simple queries for existing PocketBase collections

## Phase 3: Apply to Custom Routes

1. **Identify Custom Endpoints**
   - Once PocketBase is extended with Go, list all custom routes and their expected data structures
   - Define TypeScript types for API responses in `types/`

2. **Create Query Hooks for Custom Routes**
   - For each custom route, create a `useQuery` hook
   - Handle authentication headers if needed
   - Implement error handling specific to your API

3. **Implement Mutations for Data Changes**
   - Use `useMutation` for POST, PUT, DELETE operations on custom routes
   - Set up invalidation strategies to refresh related queries

4. **Update Components**
   - Replace existing fetch logic in components with the new hooks
   - Add loading and error states using TanStack Query's built-in features
   - Test integration with existing UI components

## Phase 4: Testing and Optimization

1. **Test Data Flow**
   - Verify caching works correctly
   - Test background refetching and invalidation
   - Ensure error boundaries handle query errors

2. **Performance Optimization**
   - Configure stale time and cache time appropriately
   - Implement query prefetching where beneficial
   - Monitor bundle size impact

3. **Documentation**
   - Update README.md with TanStack Query usage guidelines
   - Add comments to custom hooks explaining their purpose

## Timeline
- Phase 1: 1-2 days (learning)
- Phase 2: 1 day (setup)
- Phase 3: 2-3 days (implementation, depending on number of custom routes)
- Phase 4: 1 day (testing and docs)

This plan will be updated as the PocketBase extension progresses.