---
description: Generate a maintainable Playwright API test using the existing enterprise framework
agent: agent
---

Generate a permanent Playwright API test for the scenario provided by the user.

## Repository rules

1. Read and follow `.github/copilot-instructions.md`.
2. Inspect the existing API architecture before modifying files.
3. Reuse existing API clients, models, fixtures, configuration and utilities.
4. Do not create duplicate clients, models, fixtures or helpers.
5. Do not modify unrelated files.
6. Preserve all existing valid API tests unless the user explicitly asks to replace or remove them.
7. Keep changes small and focused.

## Existing test preservation

Before editing an API spec file:

1. Read the entire existing spec file.
2. List the current test names.
3. Preserve all existing tests.
4. Add the new scenario as a separate independent test.
5. Do not replace an existing test because the new scenario uses the same endpoint.
6. Run the complete affected spec file after editing.
7. Confirm the final test count.

## API architecture

Follow this structure:

```text
API Test
  ↓
Fixture
  ↓
Domain API Client
  ↓
BaseApiClient
  ↓
APIRequestContext
```
