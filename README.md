# JH Stat — jhstat.co.uk

Static website for **JH Stat**, the independent statistical consultancy of Jamal Hossain, PhD.

Plain HTML, CSS and a small amount of vanilla JavaScript. **No build step, no framework, no npm.** Cloudflare Pages publishes the repository root exactly as it is.

---

## Folder structure

```
jhstat-website/            <- repository root (deploy this directly)
├── index.html             Homepage
├── about.html             About JH Stat and Jamal Hossain
├── services.html          Seven service areas
├── research.html          Research interests and selected projects
├── publications.html      Publication list and academic profiles
├── training.html          Workshops, courses and training topics
├── blog.html              Blog landing page (planned articles)
├── contact.html           Contact details and mailto enquiry form
├── privacy.html           UK privacy notice
├── 404.html               Custom not-found page (root-relative links)
├── favicon.svg            Site icon
├── robots.txt             Crawler directives
├── sitemap.xml            XML sitemap
├── README.md              This file
├── css/
│   └── style.css          Complete stylesheet (single file)
├── js/
│   └── script.js          Progressive enhancements only
├── images/
│   └── README.md          What to put here and at what size
└── files/
    └── README.md          Downloadable documents (CV, catalogues)
```

`index.html` sits in the repository root. Do **not** move the site into a subfolder — Cloudflare Pages is configured to publish the root.

---

## Cloudflare Pages settings

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | `/` (repository root) |
| Production branch | `main` |
| Node version | not required |

Every push to `main` triggers a production redeploy, usually within a minute. Pushes to
`development` produce a **preview deployment** at a separate URL, which is where changes
should be reviewed before they reach the live site.

### Custom domain

Add `jhstat.co.uk` as the custom domain in the Pages project. Add `www.jhstat.co.uk` as a second custom domain and set a **redirect rule** sending `www` to the apex, so the canonical version stays `https://jhstat.co.uk`. All canonical tags in the HTML already point at the apex domain.

---

## Editing workflow

All work happens on the `development` branch. `main` is the production branch and is only
ever updated through a reviewed pull request.

```
Claude Code edits the local development branch
  ↓
GitHub Desktop review (inspect the diff file by file)
  ↓
commit to development
  ↓
push development to GitHub
  ↓
Cloudflare creates a preview deployment
  ↓
review the preview in a browser
  ↓
open a pull request from development into main
  ↓
merge only after approval
```

**Rules that keep this safe:**

- Never edit, commit to, or push to `main` directly.
- Never merge into `main` without reviewing the Cloudflare preview first.
- Review every diff in GitHub Desktop before committing — a static site has no tests or
  type checker to catch a mistake for you.
- Keep `index.html` in the repository root. Cloudflare Pages publishes the root.

**Before merging into `main`, verify on the preview URL:**

- [ ] Styles are applied (if the page looks like unstyled text, `css/style.css` did not deploy)
- [ ] The photograph, hero avatar and favicon all appear
- [ ] `/robots.txt` and `/sitemap.xml` both load
- [ ] A made-up URL such as `/not-a-real-page` shows the custom 404 page, correctly styled
- [ ] Every DOI link on `publications.html` opens the correct paper
- [ ] The mobile menu opens and closes

**After merging, verify on the live site:**

- [ ] `https://jhstat.co.uk` shows the new version
- [ ] `www.jhstat.co.uk` redirects to `jhstat.co.uk`

---

## Testing checklist

### Desktop

- [ ] Every page loads: home, about, services, research, publications, training, blog, contact, privacy
- [ ] Header navigation works from every page; the current page is highlighted
- [ ] Footer links work, including the anchor links into `services.html#study-design` etc.
- [ ] Logo returns to the homepage
- [ ] "Discuss Your Project" and "Explore Services" buttons work
- [ ] Publication filter buttons on `publications.html` show and hide entries correctly
- [ ] Accordions on `services.html` and `contact.html` open and close
- [ ] `mailto:` links open a draft email
- [ ] The contact form's "Prepare email" button opens a pre-filled draft
- [ ] Test in Chrome, Firefox, Edge and Safari
- [ ] Zoom to 200% — text stays readable and nothing overlaps
- [ ] Print preview (Ctrl/Cmd + P) — navigation and buttons are hidden, content is legible

### Mobile and tablet

- [ ] Open the site on a real phone, not only the browser emulator
- [ ] The hamburger menu opens, closes on tapping a link, and closes on tapping outside
- [ ] No horizontal scrolling on any page at 320 px width
- [ ] Buttons are large enough to tap comfortably
- [ ] Form fields are usable and the correct keyboard appears for the email field
- [ ] Text is readable without pinch-zooming
- [ ] Check both portrait and landscape
- [ ] Test on iOS Safari and Android Chrome if possible

### Accessibility

- [ ] Tab through each page — focus is always visible and the order is logical
- [ ] The "Skip to main content" link appears on first Tab press
- [ ] The mobile menu can be operated by keyboard and closes with Escape
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse) and aim for 95+ on Accessibility
- [ ] Check with a screen reader if you can — headings should read in a sensible order
- [ ] Confirm colour contrast if you change any brand colours

### SEO and technical

- [ ] Each page has a unique `<title>` and meta description
- [ ] Canonical URLs all point to `https://jhstat.co.uk/...`
- [ ] Validate structured data at [validator.schema.org](https://validator.schema.org/) and Google's Rich Results Test
- [ ] Validate the HTML at [validator.w3.org](https://validator.w3.org/)
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools
- [ ] Check the social preview by pasting a URL into LinkedIn's Post Inspector (needs `images/og-image.png` first)
- [ ] Run Lighthouse Performance — should be near 100 for a site this light

---

## What still needs to be added

### Done

- **Photograph** — `images/jamal-hossain.jpg` (about page) and `images/jamal-hossain-avatar.jpg` (homepage hero avatar)
- **Social sharing image** — `images/og-image.png`, typographic navy card
- **Profile URLs** — ORCID, LinkedIn, Google Scholar and ResearchGate are live in the footers of all ten pages, on `about.html`, `contact.html` and `publications.html`, and in the `sameAs` structured data on `index.html` and `about.html`
- **Publications** — nine genuine publications on `publications.html`, filterable by type, with three of them featured on `index.html`. No placeholder publications remain.
- **Research interests** — `research.html` lists five genuine research interests. The fake project cards have been removed; a commented template remains for adding real projects later.

### Still outstanding

**Assets**

- `files/jamal-hossain-cv.pdf` — your CV (then uncomment the download button in `about.html`)
- `images/apple-touch-icon.png` — optional iOS icon

**Content**

- Selected projects — `research.html` carries a commented template. Only add projects you can describe publicly, with no confidential detail.
- Blog articles — `blog.html` explains how to add real posts in a `blog/` folder. The three cards there are clearly labelled as in preparation and link to nothing.

**Decisions**

- Whether to name your university and the year of your PhD (currently described without naming the institution)
- Whether to publish indicative rates (`services.html`, `training.html`)
- Whether ICO registration applies (`privacy.html` §11 — the page currently states the position is being confirmed and makes no claim of registration)

### Confirmed

- **Email** — `jamal@jhstat.co.uk` is live and monitored, routed through Cloudflare Email Routing. It appears as a `mailto:` link on all ten pages, in the structured data, and as the contact form's action.
- **Software** — R, Stata, SPSS and AMOS are the core consultancy packages. Git, Quarto and R Markdown are described as reproducibility tools only, not as statistical analysis software.

---

## Editing guidance

**Adding a page.** Copy an existing page, change the `<title>`, meta description, canonical URL and Open Graph tags, move `aria-current="page"` to the right navigation item, then add the URL to `sitemap.xml`.

**Changing colours.** All colours are CSS custom properties at the top of `css/style.css` under "Custom properties". Change them there and the whole site follows. If you change the accent colour, check contrast against white at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) — aim for at least 4.5:1 for body text.

**Navigation and footer** are repeated in each HTML file (that is the cost of having no build step). If you change a navigation item, change it in all ten files. Search-and-replace across the folder is the quickest way.

**JavaScript** is optional throughout. Every page works with JavaScript disabled — the mobile menu is the only feature that requires it, and the desktop navigation remains fully usable.

---

## Licence and credits

Content © Jamal Hossain / JH Stat. The site code is bespoke and uses no third-party libraries, fonts, trackers or CDNs — everything the browser loads is served from `jhstat.co.uk`.
