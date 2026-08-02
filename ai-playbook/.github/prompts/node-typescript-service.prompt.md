# Node.js/TypeScript Service

Create or modify Node.js/TypeScript backend services with proper request validation, error handling, structured logging, and testing. Not for React frontend components, UI elements, or accessibility audits.

## Inputs

- `serviceName`: service or module identifier.
- `endpointSpec`: HTTP method, path, request/response schema.
- `businessLogic`: description of what the endpoint does.
- `framework`: Express, Nest.js, or Fastify (detect from project).

## Procedure

1. **Detect the framework** from `package.json` dependencies: `express` → Express.js, `@nestjs/core` → Nest.js, `fastify` → Fastify. If unclear, ask for clarification.
2. **Apply backend conventions** from `.github/instructions/backend.instructions.md`.
3. **Define the request validation schema** using the project's validation library (Zod, Joi, or class-validator for Nest.js). Example (Zod):
   ```ts
   import { z } from 'zod'
   const CreateUserSchema = z.object({
     email: z.string().email(),
     name: z.string().min(1),
     age: z.number().int().positive().optional()
   })
   type CreateUserRequest = z.infer<typeof CreateUserSchema>
   ```
4. **Implement the route handler**:
   - **Express**:
     ```ts
     router.post('/users', async (req: Request, res: Response) => {
       try {
         const data = CreateUserSchema.parse(req.body)
         const user = await createUser(data)
         res.status(201).json({ success: true, data: user })
       } catch (error) { handleError(error, res) }
     })
     ```
   - **Nest.js**:
     ```ts
     @Controller('users')
     export class UsersController {
       constructor(private readonly usersService: UsersService) {}
       @Post()
       async create(@Body() dto: CreateUserDto) { return this.usersService.create(dto) }
     }
     ```
5. **Implement error handling** — map errors to status codes (400 validation/malformed, 401 auth required, 403 insufficient permissions, 404 not found, 409 conflict, 500 internal). Return a structured error body: `{ success: false, error: { code, message, details } }`.
6. **Add structured logging** (Winston/Pino/framework logger — never `console.log` in production): `logger.info('User created', { userId: user.id })`.
7. **Move business logic to a service layer**, not the route handler:
   ```ts
   class UsersService {
     async create(data: CreateUserRequest): Promise<User> {
       const existing = await this.findByEmail(data.email)
       if (existing) throw new ConflictError('Email already registered')
       return this.repository.save(data)
     }
   }
   ```
8. **Generate tests** adjacent to the handler — unit tests for the service layer, integration tests (`supertest`) for the full request/response cycle covering success, validation failure, and error conditions.
9. **Update routing** — register the new endpoint in the app's central routing config; verify no conflicts.
10. **Validate** — request validation applied, error handling comprehensive, response shape consistent, logging captures context, tests cover success + error paths. Suggest: `npm run lint`, `npm test`, `npm run build`.

## Validation Library Reference

**Zod:**
```ts
const UserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1).max(100),
  age: z.number().int().min(18).optional(),
  role: z.enum(['user', 'admin', 'moderator'])
})
const result = UserSchema.safeParse(data)
```

**Joi:**
```ts
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).max(100).required(),
  role: Joi.string().valid('user', 'admin', 'moderator').required()
})
const { error, value } = userSchema.validate(data)
```

**class-validator (Nest.js):**
```ts
class CreateUserDto {
  @IsEmail() email: string
  @IsString() name: string
  @IsOptional() @IsInt() @Min(18) age?: number
  @IsEnum(['user', 'admin', 'moderator']) role: string
}
```

Nested objects, arrays, and discriminated unions are all supported natively by Zod (`z.object({...})` nesting, `z.array(...).min(1)`, `z.discriminatedUnion('type', [...])`).

## Error Types and Middleware

```ts
class HttpError extends Error {
  constructor(public statusCode: number, public message: string, public code?: string, public details?: unknown) {
    super(message); this.name = 'HttpError'
  }
}
class BadRequestError extends HttpError { constructor(m: string, d?: unknown) { super(400, m, 'BAD_REQUEST', d) } }
class UnauthorizedError extends HttpError { constructor(m = 'Authentication required') { super(401, m, 'UNAUTHORIZED') } }
class ForbiddenError extends HttpError { constructor(m = 'Insufficient permissions') { super(403, m, 'FORBIDDEN') } }
class NotFoundError extends HttpError { constructor(resource: string) { super(404, `${resource} not found`, 'NOT_FOUND') } }
class ConflictError extends HttpError { constructor(m: string) { super(409, m, 'CONFLICT') } }
```

**Express error middleware:** catch `ZodError` → 400 with field-level details; catch `HttpError` → its own `statusCode`/`code`/`message`; anything else → log internally, return generic 500.

**Nest.js:** implement `@Catch()` on an `ExceptionFilter`, branch on `instanceof HttpException`, respond with `{ success: false, error: { code, message, timestamp } }`.

**Async handlers (Express):** wrap with `asyncHandler(fn)` that forwards rejections to `next()`. Nest.js catches async errors automatically.

## Response Shapes

Success: `{ success: true, data: {...}, meta?: { page, totalPages } }`
Error: `{ success: false, error: { code: "VALIDATION_ERROR", message: "...", details: [{ field, message }] } }`

## Logging

Use structured logging (Winston/Pino), log request start/end + duration, auth events, business-logic errors, DB errors, external API calls.
Never log: passwords/secrets, full credit-card numbers, PII (unless necessary and secured), session tokens.

## Error Handling

- **Missing validation library** — suggest installing Zod, Joi, or class-validator.
- **Framework mismatch** — clarify the detected framework and adjust implementation.
- **Route conflict** — notify and suggest an alternative path/method.
- **Type safety issue** — ensure types are explicit and validated, not `any`.

## Related

- `.github/instructions/backend.instructions.md` (auto-applied to `server/**`, `services/**`, `**/*.service.ts`)
- `.github/agents/node-microservice-builder.agent.md` — full agent workflow for scaffolding endpoints
