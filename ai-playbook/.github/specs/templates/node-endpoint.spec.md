# Endpoint Specification: [Endpoint Name]

## Overview

Brief description of what this endpoint does.

## HTTP Details

**Method**: `[GET/POST/PUT/PATCH/DELETE]`  
**Path**: `/api/v1/resource`  
**Authentication**: [Required/Optional/None]  
**Authorization**: [Roles required]

## Request

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Resource identifier |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | `1` | Page number |
| `limit` | `number` | No | `20` | Items per page |

### Request Body

```json
{
  "field1": "value",
  "field2": 42
}
```

**Validation**:
- `field1`: Required, string, 1-100 characters
- `field2`: Required, positive integer

## Response

### Success (200/201)

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "field1": "value",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Errors

- **400**: Validation error
- **401**: Unauthorized
- **404**: Resource not found
- **500**: Internal server error

## Business Logic

1. Step-by-step flow
2. Validation rules
3. Data transformations
4. Side effects

## Security

- Input sanitization
- Authorization checks
- Rate limiting

## Performance

- Expected response time: [duration]
- Database queries: [count]
- Caching: [strategy]

## Testing

- Unit tests for business logic
- Integration tests for HTTP flow
- Error scenario coverage
