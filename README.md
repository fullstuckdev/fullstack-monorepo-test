<div align="center">

# 🚀 Full-Stack Application Monorepo

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Latest-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A modern, scalable full-stack application built with Next.js, Firebase, and Express, using a monorepo structure.

[Getting Started](#-getting-started) •
[Technologies](#-technologies) •
[Documentation](#-documentation) •
[Contributing](#-contributing)

</div>

---

## 📦 Project Structure

```
.
├── apps/
│   ├── frontend/          # Next.js web application
│   └── backend/           # Firebase Functions & Express API
├── packages/
│   └── shared-types/      # Shared TypeScript types
└── README.md
```

## 🛠 Technologies

<details>
<summary><b>Frontend Stack</b></summary>

- **Next.js 15** - React framework
- **React 18** - UI library
- **Material-UI** - Component library
- **Redux Toolkit** - State management
- **Firebase Client SDK** - Backend integration
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
</details>

<details>
<summary><b>Backend Stack</b></summary>

- **Firebase Functions** - Serverless computing
- **Express** - API framework
- **Firebase Admin SDK** - Backend services
- **Swagger/OpenAPI** - API documentation
- **Inversify** - Dependency injection
- **Winston** - Logging
</details>

## ⚡ Prerequisites

- Node.js >= 18
- Firebase CLI
- npm

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create `.env` files in both apps:

**📱 Frontend (.env)**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_API_BASE_URL=
```

**⚙️ Backend (.env)**
```env
FB_PROJECT_ID=
FB_PRIVATE_KEY=
FB_CLIENT_EMAIL=
FB_API_KEY=
```

### 4. Start development servers

**Monorepo**

```bash
npm run dev
```
it will running backend & frontend 


## 🏗 Architecture

- Clean Architecture principles
- Domain-Driven Design concepts
- Repository pattern
- Dependency Injection (Inversify)
- Redux state management
- Material-UI components
- Tailwind CSS styling


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by Taufik Mulyawan

</div>
