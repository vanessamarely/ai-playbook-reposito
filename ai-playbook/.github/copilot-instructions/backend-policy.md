# Backend Policy

## Multi-Language Support

Backend services may use different ecosystems. Follow the conventions of each project's chosen language and framework.

## Language-Specific Guidelines

### Node.js / TypeScript

#### Project Detection
- `package.json` present
- TypeScript: `tsconfig.json` present
- Common frameworks: Express, Nest, Fastify

#### Conventions
- Use ES modules (`import`/`export`) when `"type": "module"` in `package.json`.
- Otherwise, use CommonJS (`require`/`module.exports`).
- Follow existing import ordering conventions.
- Use async/await for asynchronous operations.
- Validate incoming data with libraries like Zod, Joi, or class-validator.
- Use structured logging (avoid `console.log` in production code).
- Handle errors with centralized middleware or interceptors.

#### Nest.js Specifics
- Use decorators for controllers, services, and modules.
- Dependency injection via constructor parameters.
- DTO classes with validation decorators.
- Exception filters for HTTP error responses.
- Guards for authentication/authorization.

### Java

#### Project Detection
- `pom.xml` (Maven) or `build.gradle` / `build.gradle.kts` (Gradle)
- Common frameworks: Spring Boot, Quarkus, Micronaut

#### Conventions
- Package structure: `com.organization.service.module`.
- Use annotations for configuration (Spring: `@Service`, `@RestController`, etc.).
- Constructor-based dependency injection preferred.
- Use builder patterns for complex object construction.
- Validate inputs with Bean Validation (`@Valid`, `@NotNull`, etc.).
- Handle exceptions with `@ControllerAdvice` or similar.
- Follow Java naming conventions (PascalCase for classes, camelCase for methods).
- Respect project's Maven/Gradle module structure.

### Python

#### Project Detection
- `pyproject.toml`, `setup.py`, or `requirements.txt`
- Common frameworks: FastAPI, Django, Flask

#### Conventions
- Follow PEP 8 for code style.
- Use type hints (PEP 484) for function signatures.
- Virtual environment: respect `.venv/` or `venv/`.
- Async support: use `async`/`await` with FastAPI or aiohttp.
- Validate with Pydantic models (FastAPI) or framework-specific validators.
- Use structured logging (not `print` statements).
- Exception handling: specific exception types, not bare `except`.
- Test with pytest; respect existing test structure.

## Universal Backend Principles

### API Design
- RESTful conventions for HTTP APIs.
- Use appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE).
- Return appropriate status codes (200, 201, 400, 401, 404, 500, etc.).
- Include error response bodies with actionable messages.

### Security
- Validate and sanitize all inputs.
- Use parameterized queries or ORMs to prevent SQL injection.
- Authenticate and authorize requests appropriately.
- Do not log sensitive data (passwords, tokens, PII).

### Data Layer
- Use the project's existing ORM or database library.
- Respect transaction boundaries.
- Use migrations for schema changes.

### Configuration
- Externalize configuration (environment variables, config files).
- Do not hardcode secrets.
- Support multiple environments (dev, staging, production).

### Error Handling
- Return user-friendly error messages externally.
- Log detailed error context internally.
- Use structured error responses.

## Exclusions

Do NOT apply frontend-specific rules (React patterns, accessibility guidelines) to backend code.

Do NOT enforce semicolon rules or comment restrictions unless specified in a project-local policy file.
