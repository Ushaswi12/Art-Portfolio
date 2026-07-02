# Security Issues Report

This document summarizes the security findings from the recent audit of the **artist-portfolio-next** project.

---

## 1️⃣ Dependency Vulnerabilities (Blue‑Team)

| Package | Current Version | Fixed Version | Severity | Issue |
|---------|----------------|---------------|----------|-------|
| `next` | 15.1.11 → **15.5.19** | 15.5.19 | Critical (multiple CVEs) | Information exposure, SSRF, cache‑poisoning, image‑optimizer attacks, etc. |
| `postcss` (transitive) | 8.4.47 → **8.5.10** (via `overrides`) | 8.5.10 | Moderate | XSS via unescaped `</style>` in CSS stringification |

All high/critical vulnerabilities have been resolved. Run `npm audit` to verify that no issues remain.

### Additional Dependency Notes
* Several direct dependencies have newer non‑breaking releases (`@hookform/resolvers`, `@tailwindcss/postcss`, `@tailwindcss/typography`, `typescript`, etc.). Keeping them up‑to‑date reduces future risk.
* Linting is still using the deprecated `next lint`. Plan to migrate to the ESLint CLI.

---

## 2️⃣ Configuration Weaknesses (Blue‑Team)

* **Missing Content‑Security‑Policy** – No CSP header is defined, leaving the app vulnerable to injected script execution when content is user‑controlled.
* **Permissive Image Remote Patterns** – `remotePatterns` allows any hostname (`"**"`). This enables SSRF and cache‑poisoning attacks via the Next.js Image Optimizer.
* **Session Secret Fallback** – If `SESSION_PASSWORD` is undefined, the code falls back to a static, hard‑coded secret.
* **No CSRF Protection** – Mutable API endpoints rely only on the HttpOnly session cookie (SameSite `lax`). An attacker can craft a same‑origin form that triggers state‑changing requests.

---

## 3️⃣ Logic / Runtime Vulnerabilities (Red‑Team)

| Vector | Observation | Potential Impact | Example Exploit |
|--------|-------------|------------------|----------------|
| **Unauthenticated CRUD APIs** | Endpoints under `/api/artworks/*`, `/api/content/*`, `/api/artist-info/*`, `/api/artworks/reorder` have no authentication checks. | Anyone can create, modify, delete, or reorder artworks, and edit site content. | `curl -X POST http://localhost:3000/api/artworks -d '{"title":"evil","category":"misc"}' -H 'Content-Type: application/json'` creates a malicious entry. |
| **Unauthenticated File Upload** | `/api/upload` accepts multipart uploads without any authentication, size, or MIME validation. | Attackers can upload arbitrary files (e.g., malicious SVG/JS) that are served from `/uploads/`, leading to XSS or server‑side attacks. | `curl -F "file=@evil.svg" http://localhost:3000/api/upload` stores the file publicly. |
| **Static Session Secret** | If `SESSION_PASSWORD` is missing, the code uses a predictable secret (`complex_password_at_least_32_characters_long_1234567890`). | An attacker can forge a valid Iron‑Session cookie and impersonate the admin. |
| **Remote‑Image Wildcard** | `remotePatterns` with `hostname: "**"`. | Allows an attacker to force the Image Optimizer to fetch internal resources (SSRF) or trigger cache‑poisoning. |
| **Missing CSP** | No CSP header, combined with unauthenticated content APIs. | If an attacker injects HTML via the content API, scripts could execute in visitors’ browsers. |
| **CSRF** | No anti‑CSRF token on state‑changing endpoints. | An authenticated admin could be tricked into performing unwanted actions by a malicious site. |

---

## 4️⃣ Recommended Remediations (Prioritised)

1. **Protect all mutating API routes** – Add middleware that checks the Iron Session (`session?.role === 'admin'`) and returns `401/403` for unauthenticated requests.
2. **Enforce a strong session secret** – Require `SESSION_PASSWORD` at startup and throw an error if it is missing.
3. **Restrict `remotePatterns`** – Replace the wildcard with an explicit whitelist of trusted image hosts or disable remote image optimisation.
4. **Add a Content‑Security‑Policy header** – Example header:
   ```
   Content-Security-Policy: default-src 'self'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; font-src 'self' https: data:;
   ```
5. **Validate & limit file uploads** – Accept only safe image MIME types, enforce a size limit (e.g., 5 MiB), and optionally re‑encode images to strip malicious payloads.
6. **Implement CSRF protection** – Use a double‑submit token or SameSite `strict` cookies for all state‑changing requests.
7. **Migrate linting** – Run `npx @next/codemod@canary next-lint-to-eslint-cli` and keep ESLint configuration current.
8. **Periodic dependency updates** – Regularly run `npm outdated` and apply non‑breaking updates.
9. **Secure CI/CD** – Ensure `GITHUB_TOKEN`, `GITHUB_OWNER`, and `GITHUB_REPO` environment variables are never exposed to the runtime environment.

---

## 5️⃣ Verification Checklist

- [ ] `npm audit` reports **0** high/critical vulnerabilities.
- [ ] Unauthenticated `POST /api/artworks` → returns **401**.
- [ ] Unauthenticated `POST /api/upload` → returns **401**.
- [ ] CSP header appears on every response.
- [ ] Remote image requests to non‑whitelisted host are rejected.
- [ ] CSRF token is required for any POST/PUT/DELETE request.
- [ ] Lint run succeeds without the deprecation prompt.

---

*Prepared by the Blue‑Team & Red‑Team audit.*