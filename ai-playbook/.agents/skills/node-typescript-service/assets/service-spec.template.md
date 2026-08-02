# Service: [Service Name]

## Overview

Brief description of the service's purpose and responsibilities.

## Endpoint Specification

### HTTP Method and Path

`[METHOD] /api/v1/resource`

### Authentication

- [ ] Public (no authentication required)
- [ ] Requires authentication
- [ ] Requires specific role(s): [list roles]

### Rate Limiting

- Requests per minute: [number]
- Burst limit: [number]

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Resource identifier |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | `1` | Page number for pagination |
| `limit` | `number` | No | `20` | Items per page |

### Request Body

```json
{
  "field1": "string",
  "field2": 42,
  "nested": {
    "field3": true
  }
}
```

### Validation Rules

- `field1`: Required, string, min length 1, max length 100
- `field2`: Required, integer, positive
- `nested.field3`: Optional, boolean

## Response

### Success Response (200/201)

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "field1": "value",
    "field2": 42,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "field1",
        "message": "Field is required"
      }
    ]
  }
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

#### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

#### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Resource already exists"
  }
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Business Logic

### Core Functionality

1. Step-by-step description of what the endpoint does
2. Data transformations applied
3. Business rules enforced
4. Side effects triggered

### Dependencies

- External services called
- Database tables accessed
- Message queues used
- Cache keys read/written

### Transaction Boundaries

Describe database transaction scope:
- What operations are atomic
- Rollback conditions
- Isolation level requirements

## Security

### Input Sanitization

- SQL injection prevention: Use parameterized queries
- XSS prevention: Sanitize HTML if rendering user content
- Path traversal prevention: Validate file paths

### Authorization

- Permission check before data access
- Resource ownership validation
- Role-based access control

## Performance Considerations

### Database Queries

- Expected query count: [number]
- Indexes required: [list]
- Pagination strategy: [offset/cursor]

### Caching

- Cache key pattern: `resource:{id}`
- TTL: [duration]
- Cache invalidation triggers

### Rate Limiting

Protect against abuse:
- Throttle by: [IP/user/API key]
- Limit: [requests per timeframe]

## Testing

### Unit Tests

Test business logic in isolation:
- Valid input handling
- Invalid input rejection
- Edge cases (empty, null, boundary values)
- Business rule enforcement

### Integration Tests

Test full request/response cycle:
- Successful request
- Authentication failure
- Authorization failure
- Validation errors
- Resource not found
- Conflict scenarios

### Load Tests

Expected performance:
- Response time (p50): [duration]
- Response time (p99): [duration]
- Throughput: [requests per second]

## Monitoring

### Metrics

Track:
- Request count
- Error rate
- Response time
- Database query duration

### Alerts

Trigger alerts on:
- Error rate > [threshold]
- Response time > [threshold]
- Dependency failure

### Logging

Log:
- Request start/end with duration
- Validation failures
- Business logic errors
- External API calls

Do NOT log:
- Passwords or secrets
- Full request bodies with sensitive data
- PII unless necessary

## Dependencies

### External Services

- Service name: Purpose and failure handling
- Service name: Purpose and failure handling

### Database Schema

Tables used:
- `table_name`: Columns accessed

### Message Queues

- Queue name: Message format and consumer

## Related Endpoints

- `[METHOD] /api/v1/related`: Description
