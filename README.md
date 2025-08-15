────────────────────────────────
FRONTEND README 
────────────────────────────────

# PulseVote Web (React + Vite)

**Video demo:** (https://youtu.be/Tv-hmkZs-GU?si=9hV0Ca34QMUJhsVC)

## What this is
React SPA that lets users **register**, **log in**, view a **protected dashboard**, and **log out**.

## Features
- Pages: Home, Register, Login, Dashboard (protected), Logout
- Stores the JWT in `localStorage` (key: `pv_token`)
- Axios instance automatically adds `Authorization: Bearer <token>`

## Quick start
```bash
npm install
npm run dev
# Open the URL Vite prints (e.g. https://localhost:5173)
```
> If Vite moves to 5174, that’s normal. Make sure the backend CORS allows it.

## .env (frontend)
```
VITE_API_URL=https://localhost:5000
```
Restart `npm run dev` after editing `.env`.

## The token (simple explanation)
- When you register or log in, the frontend saves `{ token }` to `localStorage` as `pv_token`.
- Axios sends it on every request as `Authorization: Bearer <token>`.
- If the token is missing or expired, protected pages will redirect you to **/login**.

## Common fixes
- **Cert warning**: Visit `https://localhost:5000` once and “Proceed”.
- **CORS error**: Add your current Vite origin (e.g. `https://localhost:5174`) to the backend `CORS_ORIGIN`.
- **Blank page**: Check the browser Console for the first red error (usually a bad import path).
