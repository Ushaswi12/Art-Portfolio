# Ushaswi Potlapally — Fine Art & Handcrafted Portfolio

A premium, highly interactive portfolio website and Content Management System built with **Next.js 15**, **React 19**, **TypeScript**, and **Framer Motion**. Features a customized, side-by-side Live Content Editor that provides real-time previews of copy adjustments and synchronizes database updates automatically.

---

## Key Features

### 💻 Live Content Editor (Admin Panel)
*   **Split-Pane Layout**: A side-by-side dashboard featuring edit fields on the left and a sticky, browser-like device frame running a live portfolio preview on the right.
*   **Real-Time Synchronization**: Edits to the Hero banners, About statistics, Career history timeline milestones, and Behind the Scenes reels are broadcasted via `postMessage` event streams for instant, keystroke-by-keystroke visual feedback.
*   **SEO Customizer**: Edit meta descriptions, OG images, titles, and canonical URL settings directly.
*   **Integrated Media & Artwork Controls**: Upload custom paintings/crafts, assign collection tags, reorder lists, and publish to the gallery.

### 🔄 Git Database Auto-Sync (Serverless Persistence)
To solve the read-only file system constraints of serverless hosting platforms like Vercel, this project has a built-in GitHub sync channel. When you save content in the admin dashboard:
1.  Changes are written locally to the site data registry (`page-content.json` & `artist-info.json`).
2.  The server automatically commits the updated files to your GitHub repository.
3.  GitHub triggers a new Vercel deployment automatically, making your edits persistent forever.

---

## Built With
*   **Core Framework**: Next.js 15 (App Router, Turbopack, ISR)
*   **Frontend**: React 19, Tailwind CSS, Framer Motion (micro-animations), Lucide Icons
*   **Schema Validation**: Zod, React Hook Form
*   **Database**: File-based local JSON database with bidirectional GitHub sync APIs
*   **Security**: Iron Session authentication middleware

---

## Getting Started

### 1. Prerequisites
Make sure you have Node.js (v18.x or higher) installed.

### 2. Installation
Clone the repository, navigate into the folder, and install dependencies:
```bash
npm install
```

### 3. Local Environment Configuration
Create a `.env.local` file in the root directory:
```env
# Admin Portal Credentials
ADMIN_PASSWORD=Ushaswi0014
SESSION_PASSWORD=complex_password_at_least_32_characters_long_for_session_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# GitHub Sync Setup (Optional for local development, required for Vercel/production)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=Ushaswi12
GITHUB_REPO=Art-Portfolio
```

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio, or go to [http://localhost:3000/admin](http://localhost:3000/admin) to access the administration dashboard.

---

## Deployment on Vercel
1.  Import your GitHub repository into [Vercel](https://vercel.com).
2.  Add your production environment variables (from your `.env.local` file) in Vercel settings.
3.  Click **Deploy**. Vercel will build and serve your portfolio on a free custom SSL subdomain.
