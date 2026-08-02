---
applyTo: "server/**,services/**,**/*.service.ts"
---

# Backend Instructions

Backend services may use different ecosystems — follow the conventions of each project's chosen language and framework. Do not apply frontend-specific rules (React patterns, accessibility guidelines) to backend code.

## Node.js / TypeScript

**Detect:** `package.json` present; TypeScript if `tsconfig.json` present. Common frameworks: Express, Nest.js, Fastify.

**Conventions:**
- Use ES modules (`import`/`export`) when `"type": "module"` in `package.json`, otherwise CommonJS.
- Follow existing import ordering. Use async/await for async operations.
- Validate incoming data with Zod, Joi, or class-validator.
- Use structured logging (Winston/Pino) — avoid `console.log` in production code.
- Handle errors with centralized middleware (Express) or exception filters (Nest.js).

**Nest.js specifics:** decorators for controllers/services/modules; constructor-based dependency injection; DTO classes with validation decorators; exception filters for HTTP errors; guards for auth.

See `.github/prompts/node-typescript-service.prompt.md` for handler patterns, validation schemas, and error-response shapes.

## Java

**Detect:** `pom.xml` (Maven) or `build.gradle`/`build.gradle.kts` (Gradle). Common frameworks: Spring Boot, Quarkus, Micronaut.

**Conventions:** package structure `com.organization.service.module`; annotation-based configuration (`@Service`, `@RestController`, etc.); constructor-based DI preferred; builder patterns for complex objects; Bean Validation (`@Valid`, `@NotNull`); `@ControllerAdvice` for exceptions; PascalCase classes / camelCase methods; respect the project's Maven/Gradle module structure.

## Python

**Detect:** `pyproject.toml`, `setup.py`, or `requirements.txt`. Common frameworks: FastAPI, Django, Flask.

**Conventions:** PEP 8 style; PEP 484 type hints on function signatures; respect `.venv/`/`venv/`; `async`/`await` with FastAPI/aiohttp; validate with Pydantic (FastAPI) or framework validators; structured logging (not `print`); specific exception types, never bare `except`; test with pytest.

## Universal Backend Principles

**API design:** RESTful conventions, correct HTTP methods, appropriate status codes (200/201/400/401/404/500), error bodies with actionable messages.

**Security:** validate/sanitize all inputs; parameterized queries or ORM (never string-concatenated SQL); authenticate and authorize requests; never log passwords, tokens, or PII.

**Data layer:** use the project's existing ORM/DB library, respect transaction boundaries, use migrations for schema changes.

**Configuration:** externalize config via env vars/config files; never hardcode secrets; support dev/staging/production.

**Error handling:** user-friendly external messages, detailed internal logging, structured error responses.

Do not enforce semicolon rules or comment restrictions unless specified in a project-local policy file.
