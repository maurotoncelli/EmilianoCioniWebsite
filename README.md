# EMILIO CIONI - Digital Atelier

Sito web ufficiale di Emilio Cioni, maestro artigiano del ferro e scultore di Lajatico.

## 🎨 Descrizione

Un'applicazione web moderna e data-driven che celebra l'arte e il design di Emilio Cioni. Il sito è costruito come un "dispositivo di legittimazione culturale" per un artigiano di lusso, con un approccio component-based che separa rigorosamente logica, stile e dati.

### Stack Tecnologico

- **Core Framework**: Astro v5 (Zero JS by default, ottimizzazione SEO nativa)
- **UI Framework**: React (Islands per componenti interattivi)
- **Styling**: Tailwind CSS v4
- **Animazioni**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **State Management**: Nano Stores
- **Data Source**: File JSON (preparati per integrazione WordPress + ACF)

### Design System

**Colori:**
- Background Deep: `#050505`
- Background Panel: `#0b0b0b`
- Text Main: `#E0E0E0`
- Text Muted: `#888888`
- Accent Gold: `#C5A059`

**Tipografia:**
- Display/Serif: Playfair Display
- Body/Sans: Manrope
- Tech/Mono: Space Mono

**Atmosfera:**
- Grain overlay (texture rumore)
- Vignettatura radiale
- Custom cursor con follower fluido
- Effetti grayscale su immagini

## 📁 Struttura Progetto

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation con smart scroll
│   │   ├── Footer.astro            # Footer a 3 colonne
│   │   ├── Preloader.jsx           # Logo animato + testo
│   │   ├── ProjectCard.astro       # Card singola opera
│   │   ├── MasonryGrid.astro       # Griglia responsive
│   │   └── DetailOverlay.jsx       # Overlay full-screen dettaglio
│   ├── data/
│   │   └── works.json              # Database opere (10 items)
│   ├── layouts/
│   │   └── MainLayout.astro        # Layout globale con head e scripts
│   ├── pages/
│   │   ├── index.astro             # Home (Hero + 4 opere)
│   │   ├── collection.astro        # Collezione completa arte
│   │   ├── artist.astro            # Bio artista
│   │   ├── design.astro            # Collaborazioni design
│   │   └── contacts.astro          # Form contatti
│   ├── stores/
│   │   └── overlayStore.ts         # Nano store per overlay state
│   └── styles/
│       └── global.css              # CSS globale + Tailwind
└── package.json
```

## 🧞 Comandi

| Comando | Azione |
|---------|--------|
| `npm install` | Installa dipendenze |
| `npm run dev` | Server locale su `localhost:4321` |
| `npm run build` | Build produzione in `./dist/` |
| `npm run preview` | Preview build locale |

## 🚀 Deployment

Il sito è configurato per il deployment su **Netlify** tramite GitHub.

### Setup Netlify

1. Connetti repository GitHub a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatico su push a `main`

## ✨ Features

- ✅ Preloader animato con logo SVG
- ✅ Hero video B&N con testi animati
- ✅ Smart navbar (hide on scroll down)
- ✅ Custom cursor con hover states
- ✅ Grain texture + vignette overlay
- ✅ Smooth scroll Lenis
- ✅ Overlay dettaglio opere (full-screen)
- ✅ Masonry gallery verticale
- ✅ Form contatti con privacy checkbox
- ✅ Responsive mobile-first
- ✅ Data-driven (JSON pronto per CMS)

## 📝 Note

- Tutti i contenuti testuali sono stati mantenuti integralmente dalla demo HTML
- Le immagini utilizzano placeholder Unsplash
- Il progetto è pronto per integrazione futura con WordPress + ACF
- View Transitions di Astro per navigazione fluida

## 🌐 Pagine

1. **Home** (`/`) - Hero video + 4 opere in evidenza + anteprima artista
2. **Collezione** (`/collection`) - Griglia completa opere d'arte
3. **L'Artista** (`/artist`) - Bio completa con citazioni e video manifesto
4. **Collaborazioni** (`/design`) - Progetti design con Segnobianco
5. **Contatti** (`/contacts`) - Form richieste con privacy policy

## 👨‍💻 Credits

**Design & Development:** AT STUDIO  
Mauro Toncelli + Anna Gallucci

**Cliente:** Emilio Cioni - Lajatico, Toscana

---

**Built with Astro** 🚀
