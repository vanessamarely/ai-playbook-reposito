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
2. Use appropriate validation library based on framework:
   - **NestJS**: class-validator with DTOs:
     ```typescript
     export class CreateUserDto {
       @IsString()
       @IsNotEmpty()
       @MaxLength(100)
       name!: string
     
       @IsEmail()
       email!: string
     
       @IsEnum(UserRole)
       role!: UserRole
     }
     ```
   - **Express**: Joi or Zod middleware
3. Ensure DTOs/schemas have explicit types (no `any`).
4. Use discriminated unions for variant request types.
5. Attach validation middleware or decorator.
6. Provide typed response DTOs separate from entities:
   ```typescript
   export class UserResponseDto {
     id: string
     name: string
     email: string
     role: UserRole
   }
   ```

### Step 6: Implement Error Handling

1. Check for existing error handling patterns in the project.
2. Use Result type pattern for service layer methods:
   ```typescript
   type Result<T, E = Error> = 
     | { success: true; data: T }
     | { success: false; error: E }
   
   async function findUser(id: string): Promise<Result<User>> {
     try {
       const user = await userRepository.findOne(id)
       if (!user) {
         return { success: false, error: new NotFoundError('User not found') }
       }
       return { success: true, data: user }
     } catch (error) {
       return { 
         success: false, 
         error: error instanceof Error ? error : new Error('Unknown error') 
       }
     }
   }
   ```
3. Create or use custom error classes with proper typing:
   ```typescript
   class ValidationError extends Error {
     constructor(
       message: string,
       public readonly field: string,
       public readonly value: unknown
     ) {
       super(message)
       this.name = 'ValidationError'
     }
   }
   ```
4. Map business logic errors to HTTP status codes:
   - 400 for validation errors
   - 401 for authentication failures
   - 403 for authorization failures
   - 404 for not found
   - 409 for conflict errors
   - 500 for unexpected errors
5. Return structured error responses:
   ```typescript
   interface ErrorResponse {
     statusCode: number
     message: string
     error: string
     timestamp: string
     path: string
   }
   ```
6. Always handle promise rejections explicitly with try/catch.

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
- Path to created handler file with markdown link
- Path to validation schema/DTO files with links
- Path to test file with link
- List of TypeScript patterns used (Result types, custom errors, DTOs)
- Error handling approach documented
- Suggested verification commands (run from project folder):
  - `npm run lint`
  - `npm test -- <serviceName>`
  - `npm run build`
  - `npm run type-check`

**Mission Control Context**: When this agent completes, session logs should show:
- Framework detection and selection reasoning
- Validation strategy chosen and why
- Error handling patterns applied
- TypeScript type safety measures
- Test coverage decisions
- Any assumptions made about business logic

## Error Handling

- **Framework mismatch**: If the detected framework differs from expectation, clarify before proceeding.
- **Missing validation library**: Suggest installing an appropriate package.
- **Route conflict**: Notify and suggest alternative path or method.
