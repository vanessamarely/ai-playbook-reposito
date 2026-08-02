# Figma Component Builder

Automate conversion of Figma designs into React/TypeScript components and supporting artifacts for a selected project scope. Uses a Figma MCP server (or connector) to fetch design context and a browser automation tool to verify produced components against a running dev server. Follows the conventions described in the `figma-component` rule.

## Required Input

The request must include:
- `scope` (required): target project folder under the workspace root.
- `destination_folder` (required): exact destination folder for generated component files.
- `component_library` (required): preferred reusable UI/component library for this scope (`none` if there isn't one).
- `client_context` (required): project-specific coding conventions (naming, tokens, styling approach, export rules).
- `figma_url` or `{fileKey, nodeId}` (required), OR `screenshot_image` (fallback) if Figma access is unavailable.
- Optional: `dev_url` (local dev server for testing), `create_mode` (`preview` | `apply`), `preferences`.

## Operational Rules

1. **Scope isolation** — treat each top-level folder as an independent project; confirm `scope` before editing. Detect project type from `package.json`, `tsconfig.json`, `index.html`, or `nest-cli.json`.
2. **Safety & exclusions** — never edit `node_modules/`, `dist/`, `build/`, `.next/`, `target/`, `.venv/`, `venv/`, `__pycache__/`, `coverage/`, `.nyc_output/`, `.git/`, `.github/workflows/`. Ask for explicit confirmation before cross-project changes or edits to public APIs consumed elsewhere.
3. **Minimal diffs** — prefer 1-3 focused files per change; group related file changes together.
4. **Reuse first** — search the target repo for existing components in `component_library` and prefer adapters/composition over new UI primitives. Never hardcode client or library names — use only values supplied in the request.
5. **Tests & stories** — only create `.test.tsx` if a test runner (Jest/Vitest) is in `package.json` devDependencies; only create `.stories.tsx` if `@storybook/*` packages are present. Skip both if neither is configured.
6. **Accessibility checks (mandatory)** — after creating/modifying a component, run browser-based accessibility checks (axe-core) against a dev server or Storybook instance. Report violations by impact level (critical/serious/moderate/minor), affected element count, CSS selectors/HTML snippets, and links to WCAG guidance. Produce a JSON report `{ violations: [], passes: number, incomplete: number }`. **Do not mark the component complete until violations are fixed or explicitly deferred with the user's agreement.**
7. **Verification** — provide typecheck, lint, test, and Storybook commands for the target scope using its `package.json` scripts.
8. **Figma fallback handling** — if Figma access is unavailable, unauthorized, or incomplete, use the provided `screenshot_image`; if none is attached, ask for one (full component/frame plus key states) before proceeding. State clearly in the output whether the implementation came from Figma context or a screenshot fallback.

## Deliverables

1. A human-readable plan of changes.
2. Minimal, reviewable diffs implementing the component(s).
3. An accessibility report (screenshot of violations if visual tooling is available, plus the JSON report and remediation steps).
4. A short manual verification checklist.

## Escalate to the User When

- A refactor affects exported types used by other projects.
- The dev server is unreachable or the browser automation tool cannot connect.
- The design has ambiguous interaction rules or missing assets.

## Related

- `.cursor/rules/figma-component.mdc` — conversion conventions and required-input contract.
- `.cursor/rules/react-components.mdc` / `.cursor/rules/a11y-automation.mdc` — component and accessibility standards applied to the generated code.
