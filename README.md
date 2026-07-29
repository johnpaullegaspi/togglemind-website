# Toggle Mind AI — Website

A modern, responsive single-page business website for Toggle Mind AI.

## Folder Structure

```
togglemind-ai/
├── index.html              # Main HTML page
├── css/
│   └── main.css            # All styles (variables, components, responsive)
├── js/
│   └── main.js             # All JavaScript (nav, animations, FAQ, scroll)
├── assets/
│   └── images/             # Images and media files
├── admin/
│   ├── index.html          # Sveltia CMS admin panel entry
│   └── config.yml          # Sveltia CMS collections config
├── _content/               # Editable content (for Decap CMS)
│   ├── hero/
│   ├── about/
│   ├── profile/
│   ├── services/
│   ├── industries/
│   ├── process/
│   ├── why_us/
│   ├── results/
│   ├── technologies/
│   ├── faq/
│   └── contact/
├── _data/
│   └── settings.json       # Site-wide settings
└── .gitignore
```

## Deployment

### Netlify
1. Push this project to a GitHub repository.
2. In Netlify, "Add new site" -> "Import an existing project" -> pick the repo. Build command is already set via `netlify.toml` (`node scripts/build.js`), publish directory `.` — no manual config needed.
3. Once the first deploy finishes, your site is live at the Netlify URL (or a custom domain you attach).

### Content editing: Sveltia CMS (via Netlify's free OAuth relay)

This project uses [Sveltia CMS](https://github.com/sveltia/sveltia-cms) — a free, actively-maintained, drop-in replacement for Decap CMS — authenticated directly against GitHub through Netlify's built-in OAuth relay. No DecapBridge subscription, no Netlify Identity, no per-publish credits or usage limits — just a one-time, five-minute setup:

1. **Create a GitHub OAuth App.** On GitHub: Settings -> Developer settings -> OAuth Apps -> New OAuth App ([direct link](https://github.com/settings/developers)). Application name and homepage URL can be anything. For **Authorization callback URL**, enter exactly:
   ```
   https://api.netlify.com/auth/done
   ```
   Register the app, copy the **Client ID**, then generate and copy a **Client Secret** (GitHub only shows it once).

2. **Register that OAuth app with Netlify.** On your site in Netlify: Project configuration -> Access & security -> OAuth -> Authentication Providers -> Install provider -> GitHub. Paste in the Client ID and Client Secret from step 1, then save. This step is per-Netlify-account, not per-site — you only do it once even if you add more sites later.

3. **Point `admin/config.yml` at your repo.** Edit the `backend.repo` value to your actual `owner/repo` (e.g. `paullegaspi/togglemind-ai-website`), commit, and push. No other config change is needed — Sveltia CMS reads the same `admin/config.yml` shape as Decap CMS, and defaults to Netlify's OAuth relay automatically when no other auth method is configured.

4. **Sign in.** Visit `https://<your-site>/admin`, click "Sign in with GitHub", authorize the app in the popup, and you'll land in the editor with every field already populated from the JSON files in `_content/`. Anyone you want to be able to edit content just needs to be a collaborator on the GitHub repo — no extra invite system to manage.

Every save commits straight to the `main` branch on GitHub, which triggers a normal Netlify build (`node scripts/build.js` regenerates `index.html` from the updated JSON) — same publish flow as before, just without a paid proxy in the middle.

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks
- **Sveltia CMS** — Content management

## Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#081B4B` | Headings, dark backgrounds |
| Accent | `#FF6A13` | CTAs, highlights, icons |
| White | `#FFFFFF` | Backgrounds, text on dark |
| Gray 50 | `#F8FAFC` | Section backgrounds |

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px — 1023px
- Desktop: 1024px — 1279px
- Large Desktop: 1280px+

## Credits

- Fonts: [Inter](https://fonts.google.com/specimen/Inter) & [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts
- Icons: Inline SVG (no icon library dependency)
