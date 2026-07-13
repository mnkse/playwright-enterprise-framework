---
description: Generate a maintainable Playwright UI test using the existing enterprise framework
agent: agent
---

Generate a permanent Playwright UI test for the scenario provided by the user.

## Repository rules

1. Read and follow `.github/copilot-instructions.md`.
2. Inspect the existing repository before modifying files.
3. Reuse the current architecture, naming conventions and abstractions.
4. Do not create duplicate Page Objects, fixtures, utilities, configuration files or test-data mechanisms.
5. Do not modify unrelated files.
6. Preserve all existing valid tests unless the user explicitly asks to replace or remove them.

## Existing test preservation

Before editing a spec file:

1. Read the entire existing spec file.
2. Identify and preserve all current test cases.
3. Add the new scenario as a separate independent test unless refactoring is necessary.
4. Do not replace an existing test merely because the new scenario uses the same page.
5. After editing, confirm that all previous tests are still present.
6. Run the complete affected spec file, not only the newly added test.

## UI architecture

Follow this structure:

```text
Test
  ↓
Custom Fixture
  ↓
Page Object
  ↓
BasePage
  ↓
Playwright Page
```
