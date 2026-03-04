---
description: Scaffold or extend Node.js/TypeScript microservices with validation, error handling, and testing
tools:
  - file-system-read
  - file-system-write
  - command-execution
---

# Node Microservice Builder Agent

## Purpose

Create or modify Node.js/TypeScript microservice endpoints following backend conventions and best practices.

## Inputs

- `serviceName`: Name of the service or module.
- `endpointSpec`: HTTP method, path, request/response schemas, and business logic description.
- `targetFolder`: Service directory within the project.

## Outputs

- Controller or route handler file.
- Validation schemas (Zod, Joi, or class-validator).
- Test file with unit and integration tests.
- Updated routing configuration if needed.

## Procedure

### Step 1: Validate Inputs

1. Ensure `serviceName` follows the project's naming convention.
2. Verify `targetFolder` is a valid Node.js project (contains `package.json`).
3. Check for `tsconfig.json` to confirm TypeScript usage.

### Step 2: Load Skill

Read: `.github/skills/node-typescript-service/SKILL.md`

Follow the procedures defined in that skill.

### Step 3: Detect Framework

Check `package.json` dependencies:
- `express` → Express.js
- `@nestjs/core` → Nest.js
- `fastify` → Fastify

Adjust code patterns accordingly.

### Step 4: Generate Endpoint Handler

1. Create handler function with typed parameters.
2. Implement request validation using the project's validation library.
3. Add error handling with appropriate HTTP status codes.
4. Structure response with consistent format.

For Nest.js:
- Use controller class with decorators (`@Controller`, `@Post`, etc.).
- Inject dependencies via constructor.
- Use DTOs with validation decorators.

For Express:
- Create route handler function.
- Use middleware for validation.
- Return responses via `res.status().json()`.

### Step 5: Add Validation Schema

Refer to: `.github/skills/node-typescript-service/references/validation-and-errors.md`

1. Define input schema (request body, query params, path params).
2. Use appropriate validation library (Zod, Joi, class-validator).
3. Attach validation middleware or decorator.

### Step 6: Implement Error Handling

1. Use custom error classes if available.
2. Map business logic errors to HTTP status codes:
   - 400 for validation errors.
   - 401 for authentication failures.
   - 403 for authorization failures.
   - 404 for not found.
   - 500 for unexpected errors.
3. Return structured error responses with message and optional error code.

### Step 7: Generate Tests

Create test file adjacent to the handler:
1. Unit tests for business logic.
2. Integration tests for HTTP endpoints (use supertest or similar).
3. Include test cases for:
   - Successful request.
   - Validation failures.
   - Error conditions.

### Step 8: Update Routing

If the project has centralized routing:
1. Register the new endpoint in the routing module.
2. Ensure route conflicts are avoided.

### Step 9: Output Summary

Provide:
- Path to created handler file.
- Path to validation schema.
- Path to test file.
- Suggested verification commands:
  - `npm run lint`
  - `npm test -- <serviceName>`
  - `npm run build`

## Error Handling

- **Framework mismatch**: If the detected framework differs from expectation, clarify before proceeding.
- **Missing validation library**: Suggest installing an appropriate package.
- **Route conflict**: Notify and suggest alternative path or method.
