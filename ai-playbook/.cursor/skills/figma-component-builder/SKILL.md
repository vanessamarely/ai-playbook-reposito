---
name: figma-component-builder
description: Convert Figma designs into React/TypeScript components (or screenshot-driven fallback), then verify them with Chrome MCP visual and accessibility checks. Use when a user wants a Figma design turned into working component code.
---

# Agent: figma-component-builder

Purpose
- Automate conversion of Figma designs into React/TypeScript components and supporting artifacts for the selected project scope.
- Use the Figma MCP server to fetch design context and the Chrome MCP server to verify and test produced components in a running dev server.

Primary capabilities
- Retrieve design context (code snippets, screenshots, tokens) from Figma via the MCP endpoints.
- Map Figma nodes to existing code components (prefer reuse from the component library provided in the prompt).
- Generate `apply_patch`-compatible diffs that add/modify component files (`.tsx`, `.styles.ts`, `.test.tsx`, `.stories.tsx`) inside the requested `scope:` project folder.
- Run Chrome MCP checks (visual snapshots, accessibility `axe` audits, console/network checks) against a dev server URL you provide.

Required initial prompt context
- The initial prompt MUST include all fields below so the agent can work in any client/project:
   - `scope` (required): target project folder under workspace root.
   - `destination_folder` (required): exact destination folder name for generated component files.
   - `component_library` (required): name of the preferred reusable UI/component library for this scope (use `none` if no shared library exists).
   - `client_context` (required): short project-specific coding conventions (naming, tokens, styling approach, export rules).

Inputs
- `scope` (required): target project folder under workspace root.
- `destination_folder` (required): exact folder where component files should be created or updated.
- `component_library` (required): preferred library/package/folder to reuse components from (or `none`).
- `client_context` (required): project conventions and constraints for this request.
- `figma_url` or `{fileKey,nodeId}` (required): Figma design URL or extracted fileKey + nodeId.
- `screenshot_image` (optional fallback): attached design screenshot to use when Figma access is unavailable.
- `dev_url` (optional): local dev server URL to test components (for example, `http://localhost:3000`).
- `create_mode` (optional): `preview` (generate patches only) | `apply` (generate patches and ask to apply).
- `preferences` (optional): additional coding preferences that override or refine `client_context`.

Outputs
- A clear plan of actions, followed by one or more `apply_patch` diffs that implement the component(s).
- A Chrome MCP test plan and JSON report for visual + a11y checks.
- A short checklist of manual/verifying steps for the user.

Operational rules (must follow)
1. Scope isolation
   - Treat each top-level folder as an independent project. Confirm `scope` before making edits.
   - Detect project type by reading the target folder's `package.json`, `tsconfig.json`, `index.html`, or `nest-cli.json`.
2. Safety & exclusions
   - NEVER edit these folders: `node_modules/`, `dist/`, `build/`, `.next/`, `target/`, `.venv/`, `venv/`, `__pycache__/`, `coverage/`, `.nyc_output/`, `.git/`, `.github/workflows/`.
   - Ask for explicit confirmation before making cross-project changes or modifying public APIs consumed in other projects.
3. Minimal diffs
   - Prefer minimal, focused patches (1–3 files). When multiple files must change, group them in a single `apply_patch` diff.
4. Reuse first
   - Search the target repo for existing components in `component_library` and prefer mapping/design adapters instead of generating brand-new UI primitives.
   - Do not hardcode any client or library names; use only values supplied in the prompt.
5. Tests & stories
   - Check target project's `package.json` for Jest and Storybook before creating test/story files.
   - Only create `.test.tsx` files if Jest is configured in devDependencies.
   - Only create `.stories.tsx` files if Storybook packages (`@storybook/*`) are present in devDependencies.
   - If neither is configured, skip test and story file creation.
6. Chrome MCP Accessibility Checks (MANDATORY)
   - **ALWAYS** run Chrome MCP accessibility checks after component creation or modification.
   - Launch Chrome with remote debugging: `--remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug`
   - Inject axe-core and create visual overlay showing violations with:
     - Impact level (critical/serious/moderate/minor) color-coded
     - Number of affected elements per violation
     - Expandable details with HTML snippets and CSS selectors
     - Direct links to WCAG documentation
     - Element highlighting on click
   - Generate automated accessibility report in JSON format
   - If violations found, provide specific fixes before marking component complete
7. Verification
   - Provide commands to run typecheck, lint, tests, and Storybook for the target scope. Use `package.json` scripts when available.
8. Figma fallback handling
   - If Figma MCP endpoints are unavailable, unauthorized, or return incomplete design context, use `screenshot_image` when provided.
   - If no screenshot is attached, ask the user to provide a screenshot (full component/frame and key states if applicable) before proceeding.
   - Clearly mark in output whether implementation was generated from Figma context or screenshot fallback.

Figma MCP & Chrome MCP usage
- Use the workspace MCP helper endpoints (mcp_com_figma_mcp_get_design_context, mcp_com_figma_mcp_generate_figma_design) to fetch:
  - component code suggestions, tokens, metadata, and high-resolution screenshots
- If Figma context cannot be fetched, switch to screenshot-driven implementation using `screenshot_image` (or request one from the user).
- After generating code patches, **MANDATORY**: run Chrome MCP against `dev_url` to:
  - mount the component in a test page (or Storybook)
  - inject axe-core library and create visual accessibility overlay
  - run automated `axe-core` accessibility checks (WCAG 2.2 Level AA minimum)
  - display interactive popup in browser showing:
    - All violations grouped by impact level (critical/serious/moderate/minor)
    - Affected element count and location (CSS selectors + HTML snippets)
    - Expandable details for each violation
    - Direct links to learn more (dequeuniversity.com)
    - Click-to-highlight affected elements with red outline
  - capture screenshots showing overlay and component state
  - collect console errors and network traces
  - generate JSON report with: `{violations: [], passes: number, incomplete: number}`
  - **If violations exist**: provide specific code fixes before completing task

Examples
- Create a component from a node
   - Input: `scope:web-client`, `destination_folder:src/components/profile`, `component_library:acme-ui`, `client_context:TypeScript strict + CSS modules`, `figma_url:https://figma.com/design/FILEKEY/NAME?node-id=1-2`, `dev_url:http://localhost:6006`
   - Steps: fetch design context -> map to reusable component from `component_library` when possible -> generate `apply_patch` for destination folder -> run Chrome MCP against Storybook -> return patch + report.

- Create a component from screenshot fallback
   - Input: `scope:web-client`, `destination_folder:src/components/profile`, `component_library:acme-ui`, `client_context:TypeScript strict + CSS modules`, `screenshot_image:<attached image>`, `create_mode:preview`
   - Steps: detect Figma unavailable -> use screenshot to infer structure/styles/interactions -> generate `apply_patch` -> run Chrome MCP checks when `dev_url` is available -> return patch + report.

- Quick audit
   - Input: `scope:project-alpha`, `destination_folder:src/components`, `component_library:none`, `client_context:Tailwind + named exports`, `dev_url:http://localhost:3000`, `run_checks:true`
  - Steps: open dev_url in Chrome MCP, run `axe` and visual snapshots for the component route, return JSON report.

Invocation examples (user prompts)
- "/figma-component-builder scope:web-client destination_folder:src/components/account component_library:acme-ui client_context:TypeScript strict, named exports figma_url:<figma url> dev_url:http://localhost:6006 create_mode:preview"
- "/figma-component-builder scope:project-alpha destination_folder:src/ui component_library:none client_context:Tailwind, local barrel exports fileKey:ABC nodeId:1:2 dev_url:http://localhost:3000 create_mode:apply"
- "/figma-component-builder scope:project-alpha destination_folder:src/ui component_library:none client_context:Tailwind, local barrel exports screenshot_image:<attached image> create_mode:preview"

Outputs & deliverables
- The agent should always output:
  1. Human-readable plan of changes
  2. `apply_patch` diffs implementing the component(s)
  3. Chrome MCP accessibility report with:
     - Screenshot of visual overlay showing violations
     - JSON report: `{violations, passes, incomplete}`
     - Specific remediation steps for each violation
  4. Short verification checklist for manual testing
  5. **Do not mark component complete until accessibility violations are fixed**

Security & credentials
- The agent should never attempt to exfiltrate credentials or private tokens. If a Figma or Chrome MCP token is required, prompt the user to provide it securely via the environment or an interactive prompt rather than embedding secrets in outputs.

When to escalate to the user
- When refactors affect exported types used by other projects.
- When the dev server is unreachable or Chrome MCP cannot connect.
- When a design contains ambiguous interaction rules or missing assets.

Related skills
- Use the `figma-component` skill for mapping design→code conventions (see `.cursor/skills/figma-component/SKILL.md`).

Contact & maintenance
- Keep this file in `.cursor/skills/figma-component-builder/SKILL.md`. Update the examples if the MCP endpoints or invocation script changes.
