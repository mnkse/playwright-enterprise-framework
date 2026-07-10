# AGENTS.md

## Project Overview

This repository contains an enterprise-style test automation framework built with Playwright and TypeScript.

The framework supports:

- UI test automation
- API test automation
- Page Object Model
- Custom fixtures
- JSON test data
- Cross-browser testing
- Allure reporting
- Playwright HTML reporting
- Structured logging
- ESLint and Prettier
- TypeScript type checking
- GitHub Actions CI/CD
- Docker execution

The goal is to keep the framework scalable, readable, maintainable, and suitable for enterprise QA automation.

---

## Technology Stack

- Playwright
- TypeScript
- Node.js
- Playwright APIRequestContext
- Allure Report
- GitHub Actions
- Docker
- ESLint
- Prettier

---

## Project Structure

```text
api/
  BaseApiClient.ts
  UsersApiClient.ts

configs/

fixtures/
  baseFixture.ts

models/
  User.ts
  CreateUserRequest.ts

pages/
  BasePage.ts
  LoginPage.ts

test-data/
  loginData.json

tests/
  api/
    users.api.spec.ts
  ui/
    login.spec.ts

utils/
  JsonReader.ts
  Logger.ts

.github/
  workflows/
    playwright.yml

playwright.config.ts
package.json
tsconfig.json
Dockerfile
docker-compose.yml
```

---

## Architecture Rules

### UI Tests

UI tests must follow the Page Object Model.

Test files should not contain repeated locator definitions.

Locators and page-level actions must be placed inside page object classes.

Preferred flow:

```text
Test
  ↓
Fixture
  ↓
Page Object
  ↓
BasePage
  ↓
Playwright Page
```

Example:

```typescript
await loginPage.login(username, password);
```

Avoid:

```typescript
await page.locator("#username").fill(username);
await page.locator("#password").fill(password);
await page.locator("#login").click();
```

---

### API Tests

API tests must use API client classes.

Tests should not call `request.get`, `request.post`, `request.put`, or `request.delete` directly unless there is a specific architectural reason.

Preferred flow:

```text
API Test
  ↓
Domain API Client
  ↓
BaseApiClient
  ↓
Playwright APIRequestContext
```

Example:

```typescript
const response = await usersApiClient.getUserById(1);
```

Avoid:

```typescript
const response = await request.get("/users/1");
```

Common HTTP behavior belongs in:

```text
api/BaseApiClient.ts
```

Domain-specific API behavior belongs in classes such as:

```text
api/UsersApiClient.ts
```

---

## TypeScript Rules

Use strict TypeScript.

Do not use `any` unless there is a documented and unavoidable reason.

Prefer:

- interfaces
- type aliases
- generics
- typed request models
- typed response models
- `unknown` instead of `any`

Example:

```typescript
const user = await usersApiClient.getResponseBody<User>(response);
```

Use explicit return types for reusable framework methods.

---

## Page Object Rules

Each page object should:

- extend `BasePage` when shared page behavior is required
- contain page-specific locators
- contain reusable user actions
- expose business-readable methods
- avoid assertions unless the assertion is page-specific and reusable

Example:

```typescript
export class LoginPage extends BasePage {
  async login(username: string, password: string): Promise<void> {
    // login implementation
  }
}
```

Test assertions should normally remain in test files.

---

## Fixture Rules

Reusable setup must be implemented through Playwright fixtures.

Use fixtures for:

- page object creation
- reusable test setup
- shared test dependencies
- future authenticated contexts
- API client creation

Avoid repeatedly creating the same objects inside every test.

---

## Test Data Rules

Static test data must be kept outside test files when practical.

Preferred locations:

```text
test-data/
configs/
```

Use `JsonReader` for JSON-based test data where applicable.

Do not store:

- passwords
- tokens
- API keys
- private credentials

inside the repository.

Use environment variables or GitHub Secrets for sensitive values.

---

## Logging Rules

Use the shared logger:

```typescript
import { Logger } from "../utils/Logger";
```

Available levels:

```typescript
Logger.info();
Logger.warn();
Logger.error();
Logger.debug();
```

Do not use uncontrolled `console.log` statements in framework code.

Never log:

- passwords
- access tokens
- API keys
- session cookies
- personal sensitive data

---

## Assertions

Use Playwright assertions:

```typescript
import { expect } from "@playwright/test";
```

Assertions must be clear and meaningful.

Prefer:

```typescript
expect(response.status()).toBe(200);
expect(user.id).toBe(1);
```

Avoid vague or redundant assertions.

Use multiple focused assertions instead of one large unclear assertion.

---

## Test Naming

Test names must describe expected behavior.

Preferred:

```typescript
test("should return 404 for non-existing user", async () => {});
```

Avoid:

```typescript
test("test 1", async () => {});
```

Use tags when relevant:

```text
@smoke
@regression
```

---

## API Test Rules

API tests should cover:

- status codes
- response body
- required fields
- business rules
- negative scenarios
- invalid identifiers
- invalid request payloads
- cleanup when a real API persists created data

Current JSONPlaceholder POST, PUT, and DELETE operations are simulated and do not persist real changes.

---

## Browser Project Rules

The Playwright projects are separated by purpose.

```text
api
chromium
firefox
webkit
```

API tests run only in the `api` project.

UI tests run in:

- Chromium
- Firefox
- WebKit

Do not configure API tests to run once per browser.

---

## Reporting Rules

The framework uses:

- Playwright HTML Report
- Allure Report

Failure artifacts may include:

- screenshot
- video
- trace
- error context
- logs

Do not remove reporting configuration without a specific reason.

Generated report folders must not be committed:

```text
playwright-report/
allure-results/
allure-report/
test-results/
```

---

## Code Quality Commands

Before committing changes, run:

```bash
npm run format
npm run format:check
npm run lint
npm run typecheck
```

Run affected tests:

```bash
npm run test:api
npm run test:ui
```

For a complete validation:

```bash
npm test
```

---

## CI/CD Rules

GitHub Actions executes:

```text
Quality Checks
      ↓
API Tests + UI Tests
      ↓
Reports and Artifacts
```

Quality checks include:

- Prettier
- ESLint
- TypeScript typecheck

API and UI jobs run in parallel after quality checks pass.

Do not bypass quality checks to make the pipeline green.

Fix the root cause instead.

---

## Docker Rules

The framework can run inside Docker.

Build:

```bash
docker compose build
```

Run tests:

```bash
docker compose run --rm playwright-tests
```

Docker configuration should keep Playwright and browser versions aligned with the project dependencies.

---

## AI Code Generation Rules

When generating new code:

1. Inspect the existing architecture first.
2. Reuse existing fixtures, clients, models, utilities, and page objects.
3. Do not create duplicate abstractions.
4. Preserve current folder structure.
5. Use strict TypeScript.
6. Add meaningful assertions.
7. Avoid hard-coded waits.
8. Avoid duplicated locators.
9. Avoid hard-coded credentials.
10. Keep tests independent.
11. Add cleanup when persistent data is created.
12. Run format, lint, typecheck, and related tests.

---

## Locator Strategy

Preferred locator order:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId`
6. stable CSS locator

Avoid:

- long XPath expressions
- index-based selectors
- fragile DOM traversal
- generated CSS class names
- unnecessary `nth()` usage

Example:

```typescript
page.getByRole("button", { name: "Login" });
```

---

## Waiting Strategy

Do not use fixed waits such as:

```typescript
await page.waitForTimeout(5000);
```

Prefer Playwright auto-waiting and web-first assertions:

```typescript
await expect(locator).toBeVisible();
```

Use explicit waiting only when technically required and document the reason.

---

## Error Handling

Do not hide failures with empty catch blocks.

Avoid:

```typescript
try {
  // code
} catch {
  // ignored
}
```

When catching errors:

- log useful context
- rethrow when the test should fail
- avoid exposing secrets
- provide actionable messages

---

## Pull Request and Commit Guidance

Use clear commit messages.

Examples:

```text
feat(api): add reusable users API client
feat(ui): add login page tests
fix(ci): correct Playwright report artifact path
refactor: separate API and UI Playwright projects
chore: add ESLint and Prettier configuration
docs: update framework README
```

Keep commits focused on one meaningful change where practical.

---

## Definition of Done

A framework change is complete when:

- code follows the existing architecture
- formatting passes
- ESLint passes
- TypeScript typecheck passes
- relevant tests pass locally
- GitHub Actions passes
- documentation is updated when required
- no sensitive data is committed
- generated reports are excluded from Git

---

## Current Roadmap

Completed:

- Playwright and TypeScript setup
- UI automation
- API automation
- Page Object Model
- Custom fixtures
- JSON test data
- Logger
- Allure reporting
- ESLint
- Prettier
- GitHub Actions
- Docker
- README documentation

Next:

- GitHub Copilot instructions
- Prompt library
- Playwright MCP
- AI failure analyzer
- AI test generation
- flaky test analysis
- self-healing locator experiments
