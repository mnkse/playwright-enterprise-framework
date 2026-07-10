# AI Prompt Library

This directory contains reusable prompts for developing and maintaining the Playwright + TypeScript test automation framework.

The prompts are designed to help AI tools generate code that follows the repository architecture, coding standards, and quality rules.

---

## 1. UI Test Generation Prompt

```text
Analyze the existing Playwright + TypeScript framework before generating code.

Create a new UI test for the following scenario:

[DESCRIBE THE SCENARIO]

Requirements:

- Follow the existing Page Object Model.
- Reuse BasePage and existing fixtures.
- Do not place repeated locators inside the test file.
- Use stable Playwright locators in this order:
  getByRole, getByLabel, getByPlaceholder, getByText, getByTestId, stable CSS.
- Do not use fixed waits.
- Use Playwright web-first assertions.
- Keep assertions in the test unless they are reusable page-level assertions.
- Use strict TypeScript.
- Add clear test names.
- Add @smoke or @regression tags when appropriate.
- Do not duplicate existing utilities or page objects.
- Return the files that must be created or updated.
- Include validation commands:
  npm run format
  npm run lint
  npm run typecheck
  npm run test:ui
```

---

## 2. Page Object Generation Prompt

```text
Inspect the existing pages, BasePage, fixtures, and tests.

Create or update a Page Object for:

[PAGE OR FEATURE NAME]

Requirements:

- Extend BasePage when shared behavior is required.
- Keep locators private or readonly where practical.
- Use semantic Playwright locators.
- Expose business-readable methods.
- Do not add fixed waits.
- Do not add unnecessary assertions.
- Avoid duplicate methods already available in BasePage.
- Use explicit return types.
- Keep the class focused on one page or component.
- Provide the complete final file.
```

---

## 3. API Test Generation Prompt

```text
Analyze the existing API architecture before generating code.

Create API automation for:

[DESCRIBE THE ENDPOINT OR SCENARIO]

Requirements:

- Reuse BaseApiClient.
- Create or update a domain-specific API client.
- Do not call request.get, request.post, request.put, or request.delete directly from the test.
- Add typed request and response models.
- Add status code assertions.
- Add response body assertions.
- Add positive and negative scenarios where meaningful.
- Add cleanup if the API persists created data.
- Use the shared Logger.
- Use strict TypeScript.
- Do not hard-code credentials or tokens.
- Return all files that must be created or updated.
- Include validation commands:
  npm run format
  npm run lint
  npm run typecheck
  npm run test:api
```

---

## 4. Failure Analysis Prompt

```text
Analyze the following Playwright test failure.

Failure output:

[PASTE FAILURE LOG]

Relevant files:

[PASTE OR ATTACH TEST, PAGE OBJECT, CLIENT, FIXTURE, OR CONFIG FILES]

Classify the most likely root cause as one of:

- application defect
- locator issue
- test data issue
- environment issue
- API issue
- timing or synchronization issue
- configuration issue
- flaky test
- automation code defect

Then provide:

1. Root cause hypothesis
2. Evidence from the log
3. Confidence level
4. Minimal fix
5. Long-term prevention
6. Files to change
7. Validation commands

Do not hide the failure with retries, fixed waits, or broad try/catch blocks.
```

---

## 5. Locator Repair Prompt

```text
Analyze the failing locator and the current DOM or Playwright error.

Current locator:

[PASTE LOCATOR]

Failure:

[PASTE ERROR]

DOM or page context:

[PASTE RELEVANT HTML OR ACCESSIBILITY SNAPSHOT]

Requirements:

- Prefer getByRole.
- Then prefer getByLabel, getByPlaceholder, getByText, getByTestId.
- Use stable CSS only when semantic locators are not suitable.
- Avoid XPath.
- Avoid nth() unless there is no stable alternative.
- Avoid generated class names.
- Explain why the replacement is more stable.
- Update the relevant Page Object instead of the test where appropriate.
```

---

## 6. Refactoring Prompt

```text
Review the following Playwright + TypeScript code:

[PASTE CODE]

Refactor it while preserving behavior.

Requirements:

- Follow the existing repository architecture.
- Remove duplication.
- Reuse existing utilities, fixtures, page objects, clients, and models.
- Keep strict TypeScript.
- Avoid overengineering.
- Improve naming and readability.
- Do not introduce unnecessary abstractions.
- Do not use any unless unavoidable.
- Keep public methods small and focused.
- Return the complete final version of each changed file.
- Include format, lint, typecheck, and relevant test commands.
```

---

## 7. API Client Generation Prompt

```text
Create a domain API client for:

[SERVICE OR RESOURCE]

Existing base class:

api/BaseApiClient.ts

Requirements:

- Extend BaseApiClient.
- Add business-readable methods.
- Use typed request models.
- Use typed response models.
- Keep endpoint-specific logic in the domain client.
- Keep common HTTP behavior in BaseApiClient.
- Do not duplicate logging or status logic.
- Use explicit return types.
- Include example tests.
```

---

## 8. Test Data Generation Prompt

```text
Generate safe test data for:

[TEST SCENARIO]

Requirements:

- Do not use real personal data.
- Do not include secrets.
- Keep data deterministic unless uniqueness is required.
- Use timestamps or random suffixes only when needed.
- Match existing TypeScript models.
- Place static data in test-data/.
- Use a builder or factory only when it adds clear value.
- Include valid, invalid, boundary, and negative samples.
```

---

## 9. Flaky Test Analysis Prompt

```text
Analyze this potentially flaky Playwright test.

Test:

[PASTE TEST]

Failure history:

[PASTE MULTIPLE RUN RESULTS]

Logs or trace observations:

[PASTE DETAILS]

Investigate:

- unstable locator
- shared test data
- race condition
- missing await
- environment dependency
- network instability
- animation
- browser-specific behavior
- test order dependency
- retry masking

Return:

1. Most likely cause
2. Supporting evidence
3. Reproduction strategy
4. Minimal fix
5. Permanent prevention
6. Whether the test should remain parallel
```

---

## 10. Pull Request Review Prompt

```text
Review this Playwright framework change as a senior QA automation engineer.

Changed files:

[PASTE DIFF OR FILES]

Check:

- architecture consistency
- Page Object Model usage
- API client usage
- fixture reuse
- TypeScript safety
- locator stability
- assertion quality
- test independence
- cleanup
- logging
- reporting
- secrets
- CI impact
- Docker impact
- maintainability

Return findings grouped as:

- Critical
- Major
- Minor
- Suggestions

Do not invent issues. Only report evidence-based findings.
```

---

## 11. Copilot Implementation Prompt

```text
Implement the requested change in this repository.

Task:

[DESCRIBE TASK]

Before editing:

- Read AGENTS.md.
- Read .github/copilot-instructions.md.
- Inspect similar existing files.
- Follow current architecture.

After editing:

- Run npm run format.
- Run npm run lint.
- Run npm run typecheck.
- Run the relevant tests.
- Summarize changed files and validation results.
```

---

## 12. New Feature Planning Prompt

```text
Plan the implementation of this feature before writing code:

[DESCRIBE FEATURE]

Provide:

1. Architecture impact
2. Files to create
3. Files to update
4. Models needed
5. Fixtures needed
6. Test scenarios
7. Positive cases
8. Negative cases
9. Cleanup strategy
10. Reporting impact
11. CI impact
12. Risks
13. Implementation order

Keep the proposal consistent with AGENTS.md and the current framework.
```

---

## Prompt Usage Guidelines

Before using a prompt:

1. Replace all bracketed placeholders.
2. Include relevant files or logs.
3. Keep the request focused.
4. Ask for complete file outputs when editing code.
5. Validate generated code locally.
6. Never accept generated code without review.
7. Never paste secrets into AI tools.
8. Run quality checks and relevant tests after every change.

---

## Standard Validation

```bash
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run test:api
npm run test:ui
```
