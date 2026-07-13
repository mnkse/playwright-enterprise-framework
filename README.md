# 🚀 Playwright AI Enterprise Test Automation Framework

An enterprise-grade **Playwright + TypeScript** test automation framework designed for scalable UI and API testing with modern AI-assisted development workflows.

---

# ✨ Features

- ✅ Playwright + TypeScript
- ✅ UI Automation
- ✅ API Automation
- ✅ Page Object Model (POM)
- ✅ Base Page Architecture
- ✅ Custom Fixtures
- ✅ Reusable API Client Architecture
- ✅ JSON Test Data Management
- ✅ Structured Logger
- ✅ Cross Browser Testing
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit
- ✅ Allure Report
- ✅ Playwright HTML Report
- ✅ ESLint
- ✅ Prettier
- ✅ TypeScript Type Checking
- ✅ GitHub Actions CI/CD
- ✅ Docker Support
- ✅ AI-Ready Architecture
- ✅ GitHub Copilot Instructions
- ✅ AGENTS.md
- ✅ Prompt Library
- ✅ Playwright MCP Integration

---

# 🏗 Framework Architecture

```text
                +-----------------------+
                |      Test Cases       |
                +-----------------------+
                           |
             +-------------+-------------+
             |                           |
       UI Automation              API Automation
             |                           |
       Page Objects              API Clients
             |                           |
         BasePage                 BaseApiClient
             |                           |
        Playwright UI         Playwright APIRequest
                     |
              Reporting Layer
      Allure + HTML Report
                     |
              Quality Layer
 ESLint + Prettier + TypeScript
                     |
             Execution Layer
 Local | Docker | GitHub Actions
                     |
                 AI Layer
 AGENTS.md
 Copilot Instructions
 Prompt Library
 Playwright MCP
```

---

# 📂 Project Structure

```text
api/
configs/
fixtures/
models/
pages/
prompts/
test-data/
tests/
    api/
    ui/
utils/

.github/
.vscode/

Dockerfile
docker-compose.yml
playwright.config.ts
package.json
tsconfig.json
AGENTS.md
README.md
```

---

# 🚀 Installation

```bash
npm install
```

---

# ▶️ Running Tests

### Run all tests

```bash
npm test
```

### Run UI tests

```bash
npm run test:ui
```

### Run API tests

```bash
npm run test:api
```

### Run Smoke tests

```bash
npm run test:smoke
```

### Run Regression tests

```bash
npm run test:regression
```

---

# 📊 Reports

### Playwright HTML Report

```bash
npm run report
```

### Allure Report

```bash
npm run allure:generate
npm run allure:open
```

---

# 🐳 Docker

### Build

```bash
docker compose build
```

### Run

```bash
docker compose run --rm playwright-tests
```

---

# 🤖 AI Development

This framework is optimized for AI-assisted software development.

### Included

- AGENTS.md
- GitHub Copilot Instructions
- Prompt Library
- Playwright MCP

### AI Capabilities

- Generate UI Tests
- Generate API Tests
- Generate Page Objects
- Generate API Clients
- Review Pull Requests
- Suggest Stable Locators
- Analyze Test Failures
- Assist Code Refactoring

---

# 🔄 CI/CD

GitHub Actions Pipeline

```text
Quality Checks
      │
      ▼
API Tests + UI Tests
      │
      ▼
Reports & Artifacts
```

Quality checks include:

- Prettier
- ESLint
- TypeScript Type Check

---

# 🗺 Roadmap

## ✅ Completed

- Playwright
- TypeScript
- UI Automation
- API Automation
- Page Object Model
- Base Page
- Custom Fixtures
- API Client Architecture
- JSON Test Data
- Logger
- Allure Report
- Playwright HTML Report
- ESLint
- Prettier
- GitHub Actions
- Docker
- AGENTS.md
- GitHub Copilot Instructions
- Prompt Library
- Playwright MCP

---

## 🚀 Next

- AI Failure Analyzer
- AI Test Generator
- AI Self-Healing Locator Assistant
- AI Pull Request Reviewer
- AI Test Data Generator
- Visual Testing
- Accessibility Automation
- Performance Testing Integration

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👤 Author

## Menekşe Erhan

**Senior QA Automation Engineer**

Creator of the **Playwright AI Enterprise Test Automation Framework**

Specialized in:

- Playwright
- TypeScript
- Java
- Selenium
- API Testing
- Enterprise Test Automation Framework Design
- CI/CD
- Docker
- AI-Assisted Test Automation

### Connect

- GitHub: https://github.com/mnkse
- LinkedIn: https://www.linkedin.com/in/menekse-erhan/

---

⭐ If you find this project useful, please consider giving it a **Star**.
