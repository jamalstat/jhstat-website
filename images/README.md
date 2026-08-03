# images/

Image assets for the site.

## Files present

| Filename | Size | Used on | Notes |
|---|---|---|---|
| `jamal-hossain.jpg` | 900 × 1200 (3:4) | `about.html` | Portrait photograph. To change it, overwrite this file with another 3:4 image at the same dimensions and keep the filename. |
| `jamal-hossain-avatar.jpg` | 320 × 320 | `index.html` | Square crop of the same photograph, shown as a circular avatar in the homepage hero. Regenerate this whenever you change the portrait. |
| `og-image.png` | 1200 × 630 | Every page | Social sharing preview card (LinkedIn, X, Slack, WhatsApp). Typographic, no photograph. Replace if the tagline or branding changes. |

## Files you may still want to add

| Filename | Size | Notes |
|---|---|---|
| `apple-touch-icon.png` | 180 × 180 | iOS home-screen icon. If you add it, uncomment the matching `<link>` in each page's `<head>`. |

## Guidance

- Keep files under ~300 KB. JPEG for photographs, PNG or SVG for graphics.
- Always supply meaningful `alt` text in the HTML.
- Avoid stock photography — the design is deliberately typographic.
- After replacing `og-image.png`, re-scrape the URL in LinkedIn's Post Inspector so the old preview is not cached.
