# Contributing to OpenMonetize

Thank you for your interest in contributing to OpenMonetize! We welcome contributions from the community and are grateful for your support.

## 🎯 Ways to Contribute

- **Bug Reports**: Submit detailed bug reports via [GitHub Issues](https://github.com/openmonetize/openmonetize/issues)
- **Feature Requests**: Propose new features via [GitHub Discussions](https://github.com/openmonetize/openmonetize/discussions)
- **Code Contributions**: Submit pull requests with bug fixes or new features
- **Documentation**: Improve documentation, tutorials, and examples
- **Testing**: Add test coverage and report issues
- **Community**: Help answer questions and support other users

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (recommend using [nvm](https://github.com/nvm-sh/nvm))
- **pnpm** 8+ (install via `npm install -g pnpm`)
- **Docker** and Docker Compose (for PostgreSQL and Redis)
- **Git** 2.0+

### Development Setup

1. **Fork and clone the repository**

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/openmonetize.git
cd openmonetize
```

2. **Add upstream remote**

```bash
git remote add upstream https://github.com/openmonetize/openmonetize.git
```

3. **Install dependencies**

```bash
cd platform
pnpm install
```

4. **Start infrastructure**

```bash
# Start PostgreSQL and Redis
docker compose up -d

# Wait for services to be healthy
docker compose ps
```

5. **Setup database**

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed initial data
pnpm db:seed
```

6. **Start development servers**

```bash
# Start all services in dev mode
pnpm dev
```

Services will be available at:
- API Gateway: http://localhost:3000
- Ingestion Service: http://localhost:8081
- Rating Engine: http://localhost:3001

## 📋 Development Workflow

### 1. Create a feature branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `test/` - Test additions/fixes
- `refactor/` - Code refactoring

### 2. Make your changes

- Write clean, maintainable code
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation as needed
- Commit frequently with clear messages

### 3. Test your changes

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @openmonetize/api-gateway test

# Run tests in watch mode
pnpm test --watch

# Run linter
pnpm lint

# Build all packages
pnpm build
```

### 4. Commit your changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <subject>
git commit -m "feat(api-gateway): add rate limiting middleware"
git commit -m "fix(ingestion): handle duplicate event keys"
git commit -m "docs(readme): update quick start guide"
```

**Commit types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements

### 5. Push and create a pull request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
```

## ✅ Pull Request Guidelines

### Before submitting

- [ ] Code follows project style and conventions
- [ ] All tests pass (`pnpm test`)
- [ ] New code has test coverage
- [ ] Documentation is updated
- [ ] Commit messages follow Conventional Commits
- [ ] Branch is up to date with `main`
- [ ] No merge conflicts

### Pull request template

```markdown
## Description
Brief description of changes

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review performed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

### Review process

1. **Automated checks** - CI will run tests and linting
2. **Code review** - Maintainers will review your code
3. **Feedback** - Address any requested changes
4. **Approval** - Once approved, your PR will be merged

## 🎨 Code Style Guidelines

### TypeScript

- **Formatting**: 2 spaces for indentation
- **Semicolons**: Always use semicolons
- **Quotes**: Single quotes for strings
- **Line length**: Max 100 characters
- **Naming conventions**:
  - `camelCase` for variables and functions
  - `PascalCase` for classes and types
  - `UPPER_CASE` for constants
  - Prefix interfaces with `I` only when necessary

### File organization

```typescript
// 1. External imports
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

// 2. Internal imports
import { getPrismaClient } from '@openmonetize/common';
import { logger } from './logger';

// 3. Types and interfaces
interface RequestBody {
  // ...
}

// 4. Constants
const MAX_RETRY_ATTEMPTS = 3;

// 5. Implementation
export async function myFunction() {
  // ...
}
```

### Error handling

```typescript
// Always use try-catch for async operations
try {
  const result = await someAsyncOperation();
  return reply.code(200).send(result);
} catch (error) {
  logger.error({ err: error, context }, 'Operation failed');
  return reply.code(500).send({ error: 'Internal server error' });
}
```

### Testing

- Write tests for all new features and bug fixes
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('myFunction', () => {
  beforeEach(() => {
    // Setup
  });

  it('should return expected result when valid input provided', async () => {
    // Arrange
    const input = { /* ... */ };

    // Act
    const result = await myFunction(input);

    // Assert
    expect(result).toEqual(expectedOutput);
  });
});
```

## 📦 Project Structure

```
platform/packages/
├── common/              # Shared: Prisma, types, validation
│   ├── prisma/         # Database schema
│   └── src/            # Shared utilities
├── api-gateway/        # API Gateway service
│   ├── src/
│   │   ├── routes/     # Route handlers
│   │   ├── middleware/ # Fastify middleware
│   │   └── services/   # Business logic
│   └── __tests__/      # Tests
├── ingestion-service/  # Event ingestion
├── rating-engine/      # Cost calculation
└── sdk/                # TypeScript SDK
```

## 🧪 Testing Strategy

### Unit tests

- Test individual functions and modules
- Mock external dependencies
- Fast execution (<100ms per test)
- Located in `src/__tests__/` or `*.test.ts`

### Integration tests

- Test service interactions
- Use test database
- Real database connections
- Located in `src/__tests__/integration/`

### Running tests

```bash
# All tests
pnpm test

# Specific package
pnpm --filter @openmonetize/api-gateway test

# Watch mode
pnpm test --watch

# Coverage
pnpm test --coverage
```

## 📝 Documentation

### Code documentation

- Add JSDoc comments for public APIs
- Explain complex logic with inline comments
- Keep comments up to date with code changes

```typescript
/**
 * Calculate credit cost based on token usage
 * @param tokens - Number of tokens consumed
 * @param burnRate - Credits per 1K tokens
 * @returns Total credits to deduct
 */
function calculateCost(tokens: number, burnRate: number): number {
  return (tokens / 1000) * burnRate;
}
```

### Documentation updates

When adding features, update:
- API documentation in `docs/api/`
- Architecture docs if structure changes
- README if setup changes
- CHANGELOG with your changes

## 🐛 Bug Reports

### Good bug reports include:

1. **Title**: Clear, descriptive summary
2. **Environment**: OS, Node.js version, package versions
3. **Steps to reproduce**: Minimal reproducible example
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happens
6. **Logs**: Relevant error messages and stack traces

### Template

```markdown
## Bug Description
Brief description of the bug

## Environment
- OS: macOS 14.0
- Node.js: v20.10.0
- pnpm: 8.15.0
- Package: @openmonetize/api-gateway@1.0.0

## Steps to Reproduce
1. Start services with `pnpm dev`
2. Send POST request to `/events`
3. Observe error in logs

## Expected Behavior
Event should be processed successfully

## Actual Behavior
500 Internal Server Error returned

## Logs
```
[error] Failed to process event: ...
```

## Additional Context
Any other relevant information
```

## 💡 Feature Requests

### Good feature requests include:

1. **Problem statement**: What problem does this solve?
2. **Proposed solution**: How should it work?
3. **Alternatives**: Other solutions considered
4. **Use cases**: Real-world examples
5. **Impact**: Who benefits from this feature?

## 🔒 Security Issues

**Do NOT open public issues for security vulnerabilities!**

Please report security issues privately via:
- Email: security@openmonetize.io
- See [SECURITY.md](SECURITY.md) for details

## 📞 Getting Help

- **Questions**: [GitHub Discussions](https://github.com/openmonetize/openmonetize/discussions)
- **Chat**: [Discord](https://discord.gg/openmonetize) (coming soon)
- **Documentation**: [docs/](docs/)
- **Email**: support@openmonetize.io

## 🙏 Recognition

Contributors will be:
- Listed in [CHANGELOG.md](CHANGELOG.md)
- Recognized in release notes
- Added to contributors list

Thank you for contributing to OpenMonetize! 🎉
