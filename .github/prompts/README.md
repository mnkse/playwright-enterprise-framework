@'
# AI Prompt Library

This folder contains reusable GitHub Copilot prompt files for the Playwright + TypeScript enterprise test automation framework.

All prompts must follow:

- `.github/copilot-instructions.md`
- the existing repository architecture
- Page Object Model conventions
- custom fixture conventions
- typed API client patterns
- quality checks and test validation rules

## Usage

Open GitHub Copilot Chat in Agent mode and run a prompt as a slash command.

Example:

```text
/generate-ui-test

Scenario:
1. Open the Products page.
2. Search for "Blue Top".
3. Verify that the matching product is visible.