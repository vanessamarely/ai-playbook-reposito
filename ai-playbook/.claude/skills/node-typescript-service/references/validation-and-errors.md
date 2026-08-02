# Validation and Error Handling

## Validation Libraries

### Zod

TypeScript-first schema validation:

```tsx
import { z } from 'zod'

const UserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required').max(100),
  age: z.number().int().min(18, 'Must be 18 or older').optional(),
  role: z.enum(['user', 'admin', 'moderator'])
})

type User = z.infer<typeof UserSchema>

const result = UserSchema.safeParse(data)
if (!result.success) {
  const errors = result.error.errors
}
```

### Joi

Schema description language:

```tsx
import Joi from 'joi'

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).max(100).required(),
  age: Joi.number().integer().min(18).optional(),
  role: Joi.string().valid('user', 'admin', 'moderator').required()
})

const { error, value } = userSchema.validate(data)
```

### class-validator (Nest.js)

Decorator-based validation:

```tsx
import { IsEmail, IsString, IsInt, Min, IsOptional, IsEnum } from 'class-validator'

class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  name: string

  @IsOptional()
  @IsInt()
  @Min(18)
  age?: number

  @IsEnum(['user', 'admin', 'moderator'])
  role: string
}
```

## Error Types

### Standard HTTP Errors

```tsx
class HttpError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

class BadRequestError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(400, message, 'BAD_REQUEST', details)
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = 'Authentication required') {
    super(401, message, 'UNAUTHORIZED')
  }
}

class ForbiddenError extends HttpError {
  constructor(message = 'Insufficient permissions') {
    super(403, message, 'FORBIDDEN')
  }
}

class NotFoundError extends HttpError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND')
  }
}

class ConflictError extends HttpError {
  constructor(message: string) {
    super(409, message, 'CONFLICT')
  }
}

class InternalServerError extends HttpError {
  constructor(message = 'Internal server error') {
    super(500, message, 'INTERNAL_ERROR')
  }
}
```

## Error Handling Middleware

### Express.js

```tsx
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      }
    })
  }

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    })
  }

  logger.error('Unhandled error', { error, path: req.path })

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  })
}

app.use(errorHandler)
```

### Nest.js

```tsx
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    let code = 'INTERNAL_ERROR'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const response = exception.getResponse()
      message = typeof response === 'string' ? response : (response as any).message
    }

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        timestamp: new Date().toISOString()
      }
    })
  }
}
```

## Validation Patterns

### Nested Objects

```tsx
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string().regex(/^\d{5}$/)
})

const UserSchema = z.object({
  name: z.string(),
  address: AddressSchema
})
```

### Arrays

```tsx
const TagsSchema = z.array(z.string()).min(1).max(10)

const PostSchema = z.object({
  title: z.string(),
  tags: TagsSchema
})
```

### Conditional Validation

```tsx
const UserSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('individual'),
    firstName: z.string(),
    lastName: z.string()
  }),
  z.object({
    type: z.literal('company'),
    companyName: z.string(),
    taxId: z.string()
  })
])
```

### Custom Validation

```tsx
const EmailSchema = z.string().refine(
  async (email) => {
    const exists = await checkEmailExists(email)
    return !exists
  },
  { message: 'Email already registered' }
)
```

## Response Structures

### Success Response

```tsx
{
  success: true,
  data: {
    id: 123,
    name: "Resource name"
  },
  meta?: {
    page: 1,
    totalPages: 10
  }
}
```

### Error Response

```tsx
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input data",
    details: [
      {
        field: "email",
        message: "Invalid email format"
      }
    ]
  }
}
```

## Logging Best Practices

### Structured Logging

```tsx
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

logger.info('User created', {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString()
})

logger.error('Database query failed', {
  error: error.message,
  stack: error.stack,
  query: sanitizedQuery
})
```

### What to Log

Log:
- Request start/end with duration
- Authentication events
- Business logic errors
- Database errors
- External API calls

Do NOT log:
- Passwords or secrets
- Full credit card numbers
- Personal identifiable information (PII) unless necessary and secured
- Session tokens

## Async Error Handling

### Express.js

Wrap async handlers:

```tsx
function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

router.post('/users', asyncHandler(async (req, res) => {
  const user = await createUser(req.body)
  res.json({ success: true, data: user })
}))
```

### Nest.js

Errors thrown in async methods are automatically caught by Nest's exception handling.
