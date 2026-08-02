# Node Microservice Builder

Create or modify Node.js/TypeScript microservice endpoints following the conventions in the `node-typescript-service` and `backend-policy` rules — this is the guided end-to-end build workflow.

## Inputs

- `serviceName`: name of the service or module.
- `endpointSpec`: HTTP method, path, request/response schemas, business logic description.
- `targetFolder`: service directory within the project.

## Outputs

- Controller or route handler file.
- Validation schemas/DTOs (Zod, Joi, or class-validator).
- Test file with unit and integration tests.
- Updated routing configuration if applicable.

## Procedure

1. **Validate inputs** — `serviceName` follows project naming convention; `targetFolder` is a valid Node.js project (`package.json` present); check `tsconfig.json` for TypeScript.
2. **Detect the framework** from `package.json`: `express` → Express.js, `@nestjs/core` → Nest.js, `fastify` → Fastify. Adjust patterns accordingly.
3. **Generate the endpoint handler** — typed parameters, request validation via the project's validation library, error handling with correct HTTP status codes, consistent response structure.
   - Nest.js: controller class with decorators (`@Controller`, `@Post`, ...), constructor-injected dependencies, DTOs with validation decorators.
   - Express: route handler function, validation middleware, `res.status().json()` responses.
4. **Add the validation schema**:
   - Nest.js (class-validator DTO):
     ```typescript
     export class CreateUserDto {
       @IsString() @IsNotEmpty() @MaxLength(100) name!: string
       @IsEmail() email!: string
       @IsEnum(UserRole) role!: UserRole
     }
     ```
   - Express: Joi or Zod middleware.
   - No `any` in DTOs/schemas; use discriminated unions for variant request types; keep response DTOs separate from entities.
5. **Implement error handling**:
   - Prefer a `Result<T, E>` type in the service layer where the project already uses that pattern:
     ```typescript
     type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E }
     ```
   - Custom typed error classes (e.g. `ValidationError extends Error` with a `field`/`value`).
   - Map errors to status codes: 400 validation, 401 auth, 403 forbidden, 404 not found, 409 conflict, 500 unexpected.
   - Structured error response shape: `{ statusCode, message, error, timestamp, path }`.
   - Always handle promise rejections explicitly with try/catch.
6. **Generate tests** adjacent to the handler — unit tests for business logic, integration tests for the HTTP endpoint (e.g. `supertest`), covering success, validation failures, and error conditions.
7. **Update routing** — register the new endpoint in the project's centralized routing module if one exists; verify there's no route conflict.
8. **Report a summary**: paths to the handler, validation/DTO files, and test file; TypeScript patterns used (Result types, custom errors, DTOs); error-handling approach; verification commands (`npm run lint`, `npm test -- <serviceName>`, `npm run build`, `npm run type-check`).

## Error Handling

- **Framework mismatch**: clarify the detected framework before proceeding.
- **Missing validation library**: suggest installing an appropriate package.
- **Route conflict**: notify and suggest an alternative path or method.
