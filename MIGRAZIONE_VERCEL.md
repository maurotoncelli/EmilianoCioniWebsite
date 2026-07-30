# Migrazione Netlify → Vercel (Emiliano Cioni)

**Data:** 30 luglio 2026  
**Ex Netlify:** `zesty-blini-f79557` (public)  
**Team Vercel:** `atstudio`  
**Progetto:** `emiliano-cioni`  
**Repo:** `maurotoncelli/EmilianoCioniWebsite`

## URL

- Produzione: (dopo deploy) `https://emiliano-cioni*.vercel.app`
- Dashboard: https://vercel.com/atstudio/emiliano-cioni

## Note

- Sito Astro statico; form contatti solo UI (alert, nessun Netlify Forms).
- Dominio `emilianocioni.com` in `astro.config.mjs` non risulta registrato (NXDOMAIN) — si usa `*.vercel.app` finché non si compra/collega.
- Deploy automatici: push su `main`.
