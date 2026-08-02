# Figma Component Conversion

Conventions for converting Figma nodes into production-ready React/TypeScript components using project-provided conventions and reusable component libraries. Applies in any project scope. Must not assume any fixed client name, repository name, or component-library name — those come from the caller's context.

## Required Input Contract

The caller must supply:
- `scope`: target top-level project folder.
- `destination_folder`: exact folder for generated/updated files.
- `component_library`: preferred reusable component library, or `none`.
- `client_context`: concise project conventions (tokens, styling model, naming, export rules, test expectations).
- `figma_url` or `{fileKey, nodeId}`.

If Figma isn't accessible, the caller must instead supply `screenshot_image` (attached screenshot(s) of the target frame).

Optional: `dev_url` (browser-based validation), `create_mode` (`preview` or `apply`), `preferences` (request-level overrides).

If required input is missing, stop and request it before generating code. If Figma access fails and no screenshot is attached, ask for one before proceeding.

## Core Rules

1. **Reuse existing components first** — search `scope` for existing components/wrappers before creating new primitives; prefer composition/adapters around `component_library` when available; if `none`, follow local patterns in `scope`.
2. **Scope isolation** — edit only files under `scope`; never touch sibling projects or root-level shared exports without explicit confirmation.
3. **Minimal patch strategy** — prefer focused diffs (usually 1-3 files); only add `.test.tsx`/`.stories.tsx` when Jest/Vitest/Storybook is actually configured in `scope/package.json`.
4. **Default file layout** for a new component `Xyz` (adjust to `client_context`):
   - `<destination_folder>/Xyz.tsx`
   - `<destination_folder>/Xyz.styles.ts` (or the project's style equivalent)
   - `<destination_folder>/Xyz.test.tsx` (only if a test runner is configured)
   - `<destination_folder>/Xyz.stories.tsx` (only if Storybook is configured)
5. **TypeScript/React standards** — functional components, strict typing (avoid `any` unless unavoidable), naming consistent with `client_context`.
6. **Accessibility baseline** — meet WCAG 2.2 AA (see `.github/prompts/react-components.prompt.md` for the full checklist): semantic markup, keyboard support, correct ARIA usage.
7. **Figma fallback workflow** — attempt Figma MCP first; if unavailable/incomplete, switch to screenshot-driven implementation, inferring structure/spacing/typography/states/interactions from the image(s); ask for more screenshots if states or responsive behavior are missing. Always state in the output whether the source was Figma context or a screenshot fallback.

## Verification and Quality Gates

Before marking work complete, provide project-specific commands sourced from `scope/package.json`: type check, lint, unit tests, Storybook (if available).

If `dev_url` is supplied, run a browser validation pass (Chrome DevTools/MCP or equivalent): capture visual-state screenshots, run automated `axe-core` accessibility checks, gather console/network issues, and return a report in this shape:
```json
{ "violations": [], "passes": 0, "incomplete": 0 }
```
If violations are found, include concrete remediation guidance and do not mark the component complete until fixes are proposed.

## Output Requirement

Output minimal, reviewable diffs scoped to `destination_folder` — not a full-file rewrite unless the file is new.

## Example Invocations

- `scope:web-client destination_folder:src/components/account component_library:acme-ui client_context:"TypeScript strict, CSS modules, named exports" figma_url:https://figma.com/design/FILEKEY/NAME?node-id=1-2 dev_url:http://localhost:6006 create_mode:preview`
- `scope:portal-app destination_folder:src/ui component_library:design-system-react client_context:"Tailwind, barrel exports by feature" fileKey:ABC nodeId:1:2 dev_url:http://localhost:3000 create_mode:apply`
- `scope:admin-console destination_folder:src/components component_library:none client_context:"SCSS modules, PascalCase components" screenshot_image:<attached> create_mode:preview` (screenshot fallback, no Figma access)

## Deliverables

- Diffs implementing the component(s)
- Concise human-readable change summary
- Accessibility/visual JSON report when `dev_url` is supplied
- Verification checklist (type check, lint, tests, Storybook as applicable)

## Error Handling

- **Missing required input** — stop and ask before generating any code.
- **Figma access fails, no screenshot** — request a screenshot before proceeding.
- **No component library match** — fall back to local project patterns; do not invent a library.
- **Accessibility violations found** — provide specific fixes; do not mark complete until addressed.

## Related

- `.github/agents/figma-component-builder.agent.md` — full agent workflow (scope validation, Chrome-based a11y verification)
- `.github/prompts/react-components.prompt.md` — WCAG 2.2 checklist and TypeScript patterns
- `.github/instructions/frontend.instructions.md` — auto-applied frontend conventions
