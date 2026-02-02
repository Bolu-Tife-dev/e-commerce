# 🛍️ E-Commerce Store - Next.js

A modern, professional e-commerce application built with **Next.js 14**, **Tailwind CSS**, **JavaScript**, and the **DummyJSON API**.

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** - Browse 100+ products with beautiful cards
- **Product Details** - Comprehensive product pages with images, descriptions, and specifications
- **Shopping Cart** - Full-featured cart with quantity management
- **Categories** - Browse products organized by categories
- **Responsive Design** - Perfect on mobile, tablet, and desktop

### 💅 UI/UX
- **Modern Design** - Clean, professional interface with Tailwind CSS
- **Smooth Animations** - Hover effects and transitions
- **Loading States** - Beautiful loading indicators
- **Empty States** - Helpful messages when no data is available

### ⚡ Performance
- **Next.js 14 App Router** - Latest features and optimizations
- **Image Optimization** - Automatic image optimization
- **Server Components** - Improved performance
- **No-Store Caching** - Always fresh data from API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**
```bash
cd e-commerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

That's it! Your e-commerce store is now running! 🎉

---

## 🧱 How this project was built

This site was developed as a modern Next.js app using the App Router and client/server component patterns. Key implementation notes:

- **Framework & Rendering**: Next.js 14 (App Router) with a mix of server and client components to balance SEO and interactivity.
- **UI & Styling**: CSS Modules + Tailwind concepts (utility-first styling inspiration). Styles live under `styles/` and are imported into components.
- **State**: React Context is used for local state:
  - `context/CartContext.js` — cart reducer, localStorage persistence, actions: add, remove, update, clear.
  - `context/AuthContext.js` — lightweight demo auth for gating checkout and add-to-cart flows (localStorage-based).
- **Payments**: Stripe Checkout integration using `@stripe/stripe-js` on the client and the official `stripe` package on the server in `/api/checkout` for session creation.
- **Data**: Product data is fetched from the DummyJSON API for demo purposes (no local DB required). Optional Supabase helpers are present for extending with a DB.
- **Accessibility & UX**: Hydration-safe components (mounted guards where needed), aria attributes for interactive controls, and responsive CSS for mobile-first layout.

## 🔐 Environment & secrets (IMPORTANT)

This repository expects local environment variables for API keys and third-party credentials. Do NOT commit your `.env.local` file. Example variables used by this project:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe to expose to the client (it is a publishable key).
- `STRIPE_SECRET_KEY` is a secret and must never be committed. If you see a secret key in your repo (for example in `.env.local`), rotate it immediately in your Stripe dashboard and remove it from the git history.

If you accidentally committed secrets, take these steps right away:

1. Rotate the compromised key(s) in the provider dashboard (Stripe, Supabase, etc.).
2. Remove the secret file from the repository and add it to `.gitignore`:

```bash
git rm --cached .env.local
echo ".env.local" >> .gitignore
git commit -m "Remove local env file"
git push
```

3. Purge the secret from git history using `git filter-repo` or the BFG Repo Cleaner, then force-push (only if you understand the implications):

```bash
# Example using BFG (install BFG first)
bfg --delete-files .env.local
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

I can help with history purging if you want — tell me and I will provide specific commands.

## ✅ Before you push to GitHub

Follow this checklist to ensure a clean, safe repository:

- Confirm `.gitignore` contains `.next`, `node_modules`, and `.env*`.
- Run the lint and build locally:

```bash
npm ci
npm run lint
npm run build
```

- If `.next` or `node_modules` were accidentally committed, untrack them:

```bash
git rm -r --cached .next node_modules
git commit -m "Remove build artifacts"
```

- Add a safe `.env.example` with variable names (no values) to document required env keys.
- Create the GitHub repo, enable secret scanning, and add production secrets in the repository settings (do not commit any secrets).

## 🚨 CI / CD and Security Recommendations

- Add a GitHub Actions workflow that runs `npm ci`, `npm run lint` and `npm run build` on PRs and push (I can scaffold a minimal workflow if you want).
- Enable GitHub secret scanning and Dependabot alerts for dependency issues.
- Protect the `main` branch with branch protection rules and require passing CI checks before merging.

## 🧾 .env.example (suggested)

Create a `.env.example` file with:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 📦 Deployment notes

- When configuring Vercel (recommended), add server keys in the Vercel dashboard as environment variables (do not upload `.env.local`).
- For other hosts (Railway, Render, Netlify), use the platform's secure environment variable settings.

## 🫶 Want help with push or CI?

I can:

- Remove accidentally committed build artifacts and help purge secrets from history.
- Create a minimal GitHub Actions workflow for lint/build.
- Add a `.env.example` and a friendly `CONTRIBUTING.md`.

Tell me which of these you'd like me to do next and I will apply the changes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Support

If you have any questions or need help:
- Check this README
- Review the code comments
- Check official documentation for each technology

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Product data from [DummyJSON](https://dummyjson.com)
- Icons from [Heroicons](https://heroicons.com)

---

Made with ❤️ using Next.js, Tailwind CSS, JavaScript, and DummyJSON API

**Happy Shopping! 🛍️**
