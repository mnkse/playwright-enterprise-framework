# 🚀 Playwright Enterprise Test Automation Framework

A modern Enterprise Test Automation Framework built with **Playwright + TypeScript**.

This framework provides scalable UI and API automation using enterprise-level architecture, reporting, logging, CI/CD integration, and code quality tools.

---

# 📌 Features

- ✅ UI Test Automation
- ✅ API Test Automation
- ✅ Page Object Model (POM)
- ✅ Base Page
- ✅ Custom Fixtures
- ✅ TypeScript
- ✅ Multi Browser Testing
- ✅ Cross Browser Execution
- ✅ Allure Reporting
- ✅ HTML Reporting
- ✅ Logger
- ✅ JSON Test Data
- ✅ Retry Mechanism
- ✅ Screenshot on Failure
- ✅ Video on Failure
- ✅ Trace on Retry
- ✅ ESLint
- ✅ Prettier
- ✅ GitHub Actions CI/CD

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Playwright | UI Automation |
| TypeScript | Programming Language |
| Playwright API | API Testing |
| Allure Report | Reporting |
| GitHub Actions | CI/CD |
| ESLint | Code Quality |
| Prettier | Code Formatting |
| Node.js | Runtime |

---

# 🏗 Architecture

```
                     +--------------------+
                     |      Test Cases    |
                     |  UI & API Tests    |
                     +---------+----------+
                               |
               +---------------+---------------+
               |                               |
               ▼                               ▼
       +---------------+               +---------------+
       | Page Objects  |               | API Clients   |
       +-------+-------+               +-------+-------+
               |                               |
               +---------------+---------------+
                               |
                               ▼
                      +-----------------+
                      | Custom Fixtures |
                      +--------+--------+
                               |
                               ▼
                     +--------------------+
                     | Playwright Engine  |
                     +--------+-----------+
                              |
            +-----------------+------------------+
            |                                    |
            ▼                                    ▼
   +------------------+                +----------------+
   | HTML Report      |                | Allure Report  |
   +------------------+                +----------------+
                              |
                              ▼
                    +----------------------+
                    | GitHub Actions CI/CD |
                    +----------------------+
```

---

# 📂 Project Structure

```text
playwright-enterprise-framework
│
├── api
│   ├── BaseApiClient.ts
│   └── UsersApiClient.ts
│
├── configs
│
├── fixtures
│
├── models
│   ├── User.ts
│   └── CreateUserRequest.ts
│
├── pages
│   ├── BasePage.ts
│   └── LoginPage.ts
│
├── test-data
│
├── tests
│   ├── api
│   └── ui
│
├── utils
│   ├── JsonReader.ts
│   └── Logger.ts
│
├── .github
│   └── workflows
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

# 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# ▶ Running Tests

Run all tests

```bash
npm test
```

Run UI tests

```bash
npm run test:ui
```

Run API tests

```bash
npm run test:api
```

Run Smoke tests

```bash
npm run test:smoke
```

Run Regression tests

```bash
npm run test:regression
```

Run Chromium

```bash
npm run test:chromium
```

Run Firefox

```bash
npm run test:firefox
```

Run WebKit

```bash
npm run test:webkit
```

Run Headed Mode

```bash
npm run test:headed
```

Run Debug Mode

```bash
npm run test:debug
```

---

# 📊 Reports

Generate Allure Report

```bash
npm run allure:generate
```

Open Allure Report

```bash
npm run allure:open
```

Serve Allure Report

```bash
npm run allure:serve
```

Open Playwright HTML Report

```bash
npm run report
```

---

# ⚙ Code Quality

Format source code

```bash
npm run format
```

Check formatting

```bash
npm run format:check
```

Run ESLint

```bash
npm run lint
```

Auto Fix ESLint

```bash
npm run lint:fix
```

Run TypeScript Type Check

```bash
npm run typecheck
```

---

# 🔄 GitHub Actions CI/CD

Current pipeline

```text
Developer
      │
      ▼
Git Push
      │
      ▼
GitHub Actions
      │
      ▼
Quality Checks
      │
      ├─────────────► Prettier
      │
      ├─────────────► ESLint
      │
      └─────────────► TypeScript
                     │
                     ▼
          ┌────────────────────┐
          ▼                    ▼
     API Tests             UI Tests
          │                    │
          ▼                    ▼
     Allure Results      HTML Report
          │                    │
          └────────────┬───────┘
                       ▼
                 GitHub Artifacts
```

---

# 📋 Current Framework Capabilities

## UI Automation

- Page Object Model
- Base Page
- Login Tests
- Smoke Tests
- Regression Tests
- Fixtures
- JSON Test Data

## API Automation

- BaseApiClient
- UsersApiClient
- GET
- POST
- PUT
- DELETE
- Negative Tests
- Response Assertions
- Generic API Layer

## Reporting

- HTML Report
- Allure Report
- Logger

## Quality

- ESLint
- Prettier
- TypeScript Type Checking

## CI/CD

- GitHub Actions
- Parallel UI & API Jobs
- Artifacts
- Multi Browser Execution

---

# 📈 Roadmap

## ✅ Completed

- Playwright
- TypeScript
- UI Automation
- API Automation
- Allure Reporting
- Logger
- ESLint
- Prettier
- GitHub Actions
- Parallel API/UI Execution

## 🚀 Next Steps

- Docker Support
- Environment Management
- API Authentication
- Advanced Allure Integration
- GitHub Pages Report Publishing
- AGENTS.md
- Prompt Library
- GitHub Copilot Instructions
- Playwright MCP
- AI Failure Analyzer
- AI Test Generation
- AI Self-Healing
- AI Test Summary

---

# 👨‍💻 Author

Enterprise Playwright + TypeScript Test Automation Framework

Built for learning, portfolio development, and enterprise-level software quality engineering.

---

⭐ If you like this project, don't forget to give it a star.