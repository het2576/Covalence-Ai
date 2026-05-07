# 🌐 Covalence-Ai

> Covalence AI integrates BI analytics, document search, and role-based AI assistance into a single interface, providing enterprise employees with instant, role-appropriate answers across disconnected data systems.

[![React 18](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase (PostgreSQL, Auth, Real-time)](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 📖 Table of Contents

- [🎯 About](#-about)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [⚙️ Installation](#%EF%B8%8F-installation)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 About

Enterprise employees frequently encounter a significant challenge: wasting valuable time searching for critical data scattered across disparate and disconnected systems. This fragmentation leads to inefficiencies, delayed decision-making, and a reduced capacity for strategic work, as individuals are forced to manually aggregate information from various sources.

Covalence AI directly addresses this pain point by providing a unified, intelligent platform. It integrates BI analytics, document search, and role-based AI assistance into one elegant interface, delivering instant, context-aware answers tailored to an employee's specific role. By centralizing data access and leveraging AI for natural language queries, Covalence AI transforms data retrieval from a time-consuming chore into a swift, intuitive interaction, empowering users to focus on analysis and action rather than search.

---

## ✨ Features

- 🤖 **AI-powered Chat Interface** — Engage with an intelligent chat interface to query diverse data sources using natural language.
- 👥 **Role-based Access Control** — Securely manage user permissions with distinct roles: Admin, Manager, Analyst, and Intern.
- 📊 **Multi-modal AI Responses** — Receive comprehensive AI answers presented as interactive tables, dynamic charts, and concise document summaries.
- 📈 **Real-time Analytics Dashboard** — Monitor query performance and user engagement through a dynamic, real-time analytics dashboard.
- ⚙️ **Admin Panel** — Centralized control for managing datasets, administering users, and reviewing detailed activity logs.
- 🎨 **Modern Glassmorphic UI** — Experience a visually stunning, responsive interface enhanced with Framer Motion animations and a glassmorphic aesthetic.

---

## 🛠️ Tech Stack

**🎨 Frontend**
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI library for building interactive user interfaces |
| TypeScript | Latest | Type-safe JavaScript for enhanced code quality |
| Tailwind CSS | Latest | Utility-first CSS framework for rapid styling |
| Framer Motion | Latest | Production-ready motion library for React |
| Recharts | Latest | Composable charting library built with React and D3 |
| Lucide React | Latest | Beautifully crafted open-source icons for React |
| React Router | Latest | Declarative routing for React applications |

**⚙️ Backend & Infrastructure**
| Technology | Version | Purpose |
|---|---|---|
| Supabase | Latest | Open-source Firebase alternative (PostgreSQL, Auth, Real-time) |

---

## 📋 Prerequisites

> ⚠️ Make sure you have all of these installed before starting.

1.  **Node.js 18+** — [Download](https://nodejs.org/en/download) · Check: `node --version`
2.  **npm** — Comes with Node.js · Check: `npm --version`
3.  **Supabase account** — [Sign up](https://supabase.com/dashboard/sign-up) · Required for database, authentication, and real-time features.

---

## ⚙️ Installation

### Step 1 — Clone the repository

```bash
git clone https://github.com/het2576/Covalence-Ai.git
cd Covalence-Ai
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Configure environment

```bash
cp .env.example .env.local
```

> 💡 Open `.env.local` and fill in your values. See [Environment Variables](#-environment-variables) below.

### Step 4 — Build the project

```bash
npm run build
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# ✅ Required: Supabase project URL for connecting to the database.
VITE_SUPABASE_URL=

# ✅ Required: Supabase public anonymous key for client-side access.
VITE_SUPABASE_ANON_KEY=

# ✅ Required: OpenAI API key for integrating AI-powered features.
VITE_OPENAI_API_KEY=
```

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ Yes | Supabase project URL for connecting to the database. |
| `VITE_SUPABASE_ANON_KEY` | ✅ Yes | Supabase public anonymous key for client-side access. |
| `VITE_OPENAI_API_KEY` | ✅ Yes | OpenAI API key for integrating AI-powered features. |

> 🔒 **Never commit your `.env.local` file.** It's already in `.gitignore`.

---

## 🚀 Usage

### Development Server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### Quick Start Example

Once the application is running and configured with your Supabase and OpenAI keys, navigate to the dashboard. Log in using your Supabase credentials. You can then interact with the AI chat interface by typing a natural language query.

For instance, try asking:

```
Show me sales data for Q3 last year, broken down by region.
```

The AI will process your request and present the information in a multi-modal format, potentially including an interactive chart or a summarized table, based on the available data sources.

---

## 📁 Project Structure

```
Covalence-Ai/
├── covalence/          # Main application source and public assets
│   ├── src/            # Core application logic, components, pages
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route-specific views and layouts
│   │   ├── hooks/      # Custom React hooks
│   │   ├── utils/      # Utility functions and helpers
│   │   └── main.tsx    # Application entry point
│   ├── public/         # Static assets (e.g., index.html, images)
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── vite.config.ts  # Vite build configuration
├── .env.example        # Environment variables template
├── package.json        # Project dependencies and scripts
└── README.md           # This documentation file
```

The project adopts a modular structure, organizing code within the `covalence/src` directory into logical domains such as components, pages, and utilities. This approach promotes maintainability and scalability by keeping related functionalities co-located, making it easier to navigate and extend the codebase.

---

## 🤝 Contributing

Contributions make this project better. Here's how to get involved:

### 🐛 Reporting Bugs

Before creating a bug report:
- ✅ Check the [existing issues](https://github.com/het2576/Covalence-Ai/issues)
- ✅ Collect your environment details (OS, Node version, browser)
- ✅ Reproduce the bug consistently

**[Create a bug report →](https://github.com/het2576/Covalence-Ai/issues/new?labels=bug&template=bug_report.md)**

### 💡 Suggesting Features

Feature suggestions are tracked as GitHub issues.

**[Suggest a feature →](https://github.com/het2576/Covalence-Ai/issues/new?labels=enhancement&template=feature_request.md)**

### 🔧 Pull Requests

1.  🍴 **Fork** the repository
2.  🌿 **Create** a feature branch: `git checkout -b feat/amazing-feature`
3.  💾 **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4.  📤 **Push** to the branch: `git push origin feat/amazing-feature`
5.  🔁 **Open** a Pull Request

**Commit convention:** We use [Conventional Commits](https://conventionalcommits.org)
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `refactor:` — code change, no feature or fix
- `test:` — add or update tests

---

## 📄 License

This project is licensed under the **MIT License**.

You're free to use, modify, and distribute this project for any purpose.
See the [LICENSE](LICENSE) file for full details.

---

<div align="center">

### Built with ❤️ by [het2576](https://github.com/het2576)

If this project helped you, consider giving it a ⭐

[⭐ Star this repo](https://github.com/het2576/Covalence-Ai) · [🐛 Report a Bug](https://github.com/het2576/Covalence-Ai/issues) · [💡 Request a Feature](https://github.com/het2576/Covalence-Ai/issues)

</div>