<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Used Stack

- Package Manager: Bun
- Next.js (v16.2.3)
- React (v19.2.4)
- TypeScript
- Tailwind CSS
- Redux Toolkit / React-Redux
- Mitt (Event Bus)

# Conventions

- **Import Aliases**: Use `~` as the root alias for `src/`. For a complete list of available shorthand aliases, refer to the `paths` configuration in `tsconfig.json`.
- Prefix project commands with `bunx --bun` (e.g., `bunx --bun prettier --write .`).
- Do NOT read previous agent sessions inside `.agents/sessions` unless told to do so.
- Do NOT add or modify components inside `src/components/ui` as this folder is reserved for basic UI primitives from shadcn/ui.
- **Styling**: Use the `cn()` utility from `~/lib/utils` for all class merges. Use `cva` for component variants.
- **Folder Structure**: Use `kebab-case` for feature folders (e.g., `src/components/video-card`) and `PascalCase` for components.
- **Infrastructure**: Place global providers in `src/providers/` and shared utilities in `src/lib/`.


# Project Context

- For detailed information about project-specific technical decisions, patterns, and reasoning, refer to `CONTEXT.md` in this directory.
- Always update `CONTEXT.md` when major changes happen to the architecture or patterns to reflect the current state of the project.

# Post-Editing Requirements

Always run lint and prettier only against files that were modified during the task to ensure code quality and consistent formatting. Check for and resolve any eslint errors inside the modified files.
