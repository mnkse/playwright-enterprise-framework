# GitHub Copilot Instructions

## Project Context

This repository contains a Playwright + TypeScript enterprise test automation framework.

The framework includes:

- UI automation
- API automation
- Page Object Model
- Base page abstraction
- Custom fixtures
- Typed API clients and models
- JSON test data
- Structured logging
- Allure and Playwright HTML reporting
- ESLint
- Prettier
- TypeScript type checking
- GitHub Actions CI/CD
- Docker execution

Copilot-generated code must follow the existing architecture and conventions in this repository.

---

## General Rules

Before generating or modifying code:

1. Inspect existing files and patterns.
2. Reuse existing abstractions.
3. Avoid duplicate utilities, clients, fixtures, and page objects.
4. Preserve the current folder structure.
5. Use strict TypeScript.
6. Do not use `any` unless unavoidable and documented.
7. Do not introduce hard-coded credentials, tokens, or secrets.
8. Do not use fixed waits unless technically necessary.
9. Keep tests independent and deterministic.
10. Prefer small, focused changes.

---

## UI Automation Rules

UI tests must use the Page Object Model.

Do not place repeated locators directly in test files.

Preferred structure:

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

Preferred example:

```typescript
await loginPage.login(username, password);
```

Avoid:

```typescript
await page.locator("#username").fill(username);
await page.locator("#password").fill(password);
await page.locator("#login").click();
```

Use page objects for:

- locators
- reusable page actions
- page-specific workflows

Keep most assertions inside test files.

---

## Locator Rules

Preferred locator order:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId`
6. stable CSS selector

Avoid:

- brittle XPath
- generated CSS classes
- long DOM traversal
- unnecessary `nth()`
- index-based selectors

Preferred example:

```typescript
page.getByRole("button", { name: "Login" });
```

---

## Waiting Rules

Do not generate fixed waits such as:

```typescript
await page.waitForTimeout(5000);
```

Prefer Playwright auto-waiting and web-first assertions:

```typescript
await expect(locator).toBeVisible();
```

Use explicit waits only when required and explain why.

---

## API Automation Rules

API tests must use domain API client classes.

Do not call Playwright request methods directly from tests unless there is a strong reason.

Preferred structure:

```text
API Test
  ↓
Domain API Client
  ↓
BaseApiClient
  ↓
APIRequestContext
```

Preferred example:

```typescript
const response = await usersApiClient.getUserById(1);
```

Avoid:

```typescript
const response = await request.get("/users/1");
```

Place common HTTP behavior in:

```text
api/BaseApiClient.ts
```

Place domain-specific behavior in classes such as:

```text
api/UsersApiClient.ts
```

---

## TypeScript Rules

Use:

- interfaces
- type aliases
- generics
- explicit return types for reusable methods
- typed request and response models
- `unknown` instead of `any`

Preferred example:

```typescript
const user = await usersApiClient.getResponseBody<User>(response);
```

Avoid unsafe casts and loosely typed objects.

---

## Fixture Rules

Use Playwright fixtures for reusable dependencies.

Good fixture candidates include:

- page objects
- API clients
- authenticated contexts
- shared setup
- reusable test dependencies

Do not repeatedly instantiate the same framework objects inside every test when a fixture is appropriate.

---

## Test Data Rules

Static test data should be stored in:

```text
test-data/
configs/
```

Use `JsonReader` for JSON-based test data where applicable.

Do not commit:

- passwords
- tokens
- API keys
- session cookies
- private credentials

Use environment variables or GitHub Secrets.

---

## Logging Rules

Use the shared logger:

```typescript
Logger.info();
Logger.warn();
Logger.error();
Logger.debug();
```

Do not add uncontrolled `console.log` statements to framework code.

Never log:

- passwords
- tokens
- API keys
- cookies
- sensitive personal data

---

## Assertion Rules

Use Playwright assertions:

```typescript
import { expect } from "@playwright/test";
```

Assertions should be specific and meaningful.

Preferred:

```typescript
expect(response.status()).toBe(200);
expect(user.id).toBe(1);
```

Avoid vague assertions and oversized assertion blocks.

---

## Test Naming Rules

Test names should describe expected behavior.

Preferred:

```typescript
test("should return 404 for non-existing user", async () => {});
```

Avoid:

```typescript
test("test 1", async () => {});
```

Use tags when appropriate:

```text
@smoke
@regression
```

---

## Playwright Project Rules

The configured projects are:

```text
api
chromium
firefox
webkit
```

API tests must run only in the `api` project.

UI tests must run in browser projects.

Do not make API tests execute once per browser.

---

## Reporting Rules

The framework uses:

- Playwright HTML Report
- Allure Report

Do not remove reporting configuration without a clear reason.

Generated folders must remain excluded from source control and formatting checks:

```text
playwright-report/
allure-results/
allure-report/
test-results/
```

---

## Code Quality Rules

Generated code must pass:

```bash
npm run format:check
npm run lint
npm run typecheck
```

Run relevant tests:

```bash
npm run test:api
npm run test:ui
```

Use:

```bash
npm test
```

for full validation.

---

## CI/CD Rules

GitHub Actions runs:

```text
Quality Checks
      ↓
API Tests + UI Tests
      ↓
Reports and Artifacts
```

Do not bypass failed quality checks.

Fix the root cause.

---

## Docker Rules

The framework supports Docker execution.

Build:

```bash
docker compose build
```

Run:

```bash
docker compose run --rm playwright-tests
```

Keep the Docker Playwright version aligned with the installed Playwright package version.

---

## Code Generation Expectations

When asked to generate a new UI test:

1. Reuse or create a page object.
2. Use stable locators.
3. Use fixtures.
4. Keep assertions in the test.
5. Add meaningful test names.
6. Avoid duplicated logic.

When asked to generate a new API test:

1. Reuse or create a domain API client.
2. Reuse `BaseApiClient`.
3. Add typed models.
4. Assert status and response body.
5. Add negative cases when useful.
6. Add cleanup when the API persists data.

When asked to refactor:

1. Preserve behavior.
2. Remove duplication.
3. Keep public APIs clear.
4. Avoid unnecessary abstraction.
5. Update tests and documentation when needed.

---

## Definition of Done

A generated change is complete only when:

- architecture is respected
- code is formatted
- ESLint passes
- typecheck passes
- relevant tests pass
- CI remains green
- no secrets are committed
- documentation is updated when required
