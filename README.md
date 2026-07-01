# Ushaswi Potlapally — Art Portfolio

[![Made with AI](https://img.shields.io/badge/Made%20with-AI-blueviolet?style=for-the-badge&logo=openai)](https://github.com/Ushaswi12/Art-Portfolio)

A clean and interactive personal artist portfolio website containing galleries of traditional paintings, sketches, and handmade crafts. Includes a built-in administration dashboard to update sections, text copy, milestones, and metadata.

---

## Getting Started

### 1. Local Run
To run the project locally on your machine:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website, or go to [http://localhost:3000/admin](http://localhost:3000/admin) to log into the admin dashboard (Password: `Ushaswi0014`).

---

## Hosting on Vercel
To deploy and host your portfolio for free on Vercel:

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Add the following **Environment Variables** in your Vercel Project Settings:
   *   `ADMIN_PASSWORD` = `Ushaswi0014`
   *   `SESSION_PASSWORD` = *(A random 32+ character string)*
   *   `NEXT_PUBLIC_SITE_URL` = *(Your Vercel deployment URL, e.g., https://art-portfolio.vercel.app)*
   *   `GITHUB_TOKEN` = *(Your GitHub Personal Access Token to auto-save edits back to this repository)*
   *   `GITHUB_OWNER` = `Ushaswi12`
   *   `GITHUB_REPO` = `Art-Portfolio`
3. Click **Deploy**.
