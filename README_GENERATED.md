markdown
# TPharma - Patient-Centric Pharmacy Platform

## 🌟 Project Overview
TPharma is a modern web platform designed to streamline pharmacy management for patients. This solution combines pharmacy operations with patient-focused features, enabling secure medication management, real-time collaboration, and intelligent health assistance. Built with modern full-stack technologies, TPharma prioritizes performance, security, and intuitive UX.

---

## 🔑 Key Features
### 1. 🔐 Authentication System
- **Role-Based Access**: Clerk administration with Supabase RLS + NextAuth session management
- **Patient Portals**: Secure access via NextAuth's social/email auth flow
- **Identity Management**: Clarifide Supabase integration for SSO capabilities

### 2. 💊 Database Management
- **CRUD Operations**: Structured schema via Prisma ORM for medical inventory, prescriptions, and patient records
- **Real-Time Sync**: Automated updates through Supabase Realtime for inventory levels and order statuses
- **Data Governance**: HIPAA-compliant data handling patterns (superseded by design)

### 3. 🤖 AI Health Assistant
- **LLM Integration**: Context-aware health advice via OpenAI API (supplier key in `.env`)
- **Symptom Checker**: NLP-powered query routing to clinical databases
- **Medication Guide**: Smart drug interaction alerts

### 4. 📊 Analytics & Observability
- **Business Metrics**: Medication demand tracking with Recharts
- **Error Monitoring**: Production alerts via Sentry
- **Performance Data**: Prometheus metrics collection for Vercel hosting

### 5. 🔍 Smart Search
- **Full-Text Search**: Product catalog search using Algolia/Typesense
- **Context-Aware Results**: Filters by pharmacy location, medication category, and patient history

### 6. ⚙️ CI/CD & Deployment
- **Auto-Deploy**: Vercel workflows for GitHub commits
- **Environment Versioning**: Staging/production separation
- **Optimized Builds**: Next.js 15 incremental hydration

### 7. 🧪 Comprehensive Testing
- **E2E Testing**: Playwright-based regression tests for critical workflows
- **Unit Testing**: Vitest/Jest for components and utilities
- **Code Quality**: Linting with Next.js ESLint config

---

## ⚙️ Tech Stack
**Frontend**
- Next.js 15 (App Router, Server Components)
- TypeScript 5.x
- Tailwind CSS 3.0
- React Server Components
- Shadcn UI Components

**Backend**
- Supabase (Auth/DB/Realtime)
- Prisma ORM
- Sentry SDK
- Algolia Search
- OpenAI API

**Dev Tools**
- Vercel Deployment
- Playwright
- Jest/Vitest
- Prometheus Node Exporter

---

## 🛠️ Setup & Deployment
### 1. Environment Variables