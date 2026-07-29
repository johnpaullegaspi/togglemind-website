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
│   ├── index.html          # Decap CMS admin panel entry
│   └── config.yml          # Decap CMS collections config
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

### Netlify (Recommended)
1. Drag and drop the `togglemind-ai/` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site will be live instantly

### Decap CMS Setup
1. Connect your Git repository to Netlify
2. Enable Identity service in Netlify
3. Add the Git Gateway in Netlify Identity settings
4. Access `/admin` on your live site to manage content

### DecapBridge (Alternative)
1. Push code to GitHub
2. Connect repository at [DecapBridge](https://decapbridge.com)
3. Update `admin/config.yml` backend settings for DecapBridge

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks
- **Decap CMS** — Content management

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
