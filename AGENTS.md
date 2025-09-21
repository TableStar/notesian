## AGENTS.md

This document outlines the development conventions for this repository.

### Build, Lint, and Test Commands

**Frontend:**

- **Directory:** All frontend commands should be run from the `front/` directory.
- **Build:** `pnpm build`
- **Run:** `pnpm dev`
- **Type Check:** `pnpm typecheck`
- **Lint:** No explicit linter is configured. Follow TypeScript strict mode rules.
- **Test:** No testing framework is configured. To run a single test, you would typically use a command like `vitest run <path/to/test.spec.ts>` if `vitest` were installed.

**Backend:**

- **Run:** `./pocketbase serve`
- **Note:** The PocketBase backend may be extended with Go in the future.

### Code Style Guidelines

- **Imports:** Use absolute paths (`~/...`) for imports within the `app` directory.
- **Formatting:** Follow standard TypeScript and React formatting.
- **Types:** Use TypeScript with strict mode enabled.
- **Naming Conventions:** Use kebab-case for files and camelCase for variables and functions.
- **Error Handling:** No explicit error handling conventions were found.
- **Components:** Use Shadcn/ui components.
- **Styling:** Use Tailwind CSS for styling.
