# Zavoryn — Portfolio V3

A static GitHub Pages portfolio with a self-updating visual catalogue.

## Folder system

Upload new visual work to these folders in the GitHub repository:

```text
assets/img/
├── website-development/
├── brand-designing/
│   ├── logos/
│   ├── letterheads/
│   ├── business-cards/
│   ├── stationery/
│   └── brand-guidelines/
├── social-media-management/
│   └── Brand-Name/
├── post-designing/
└── ai-automation/
    └── Workflow-Name/
```

## How automatic catalogues work

Brand design, post design, social management and AI/automation galleries read the public GitHub repository through the GitHub Contents API. After you commit/upload an image, refresh the portfolio page and it will appear in the matching catalogue. No code edit is required for visual uploads.

### Website projects
Website cards need a title, description, cover image and destination URL, so they are kept in `assets/portfolio-data.js`. Example:

```js
{
  title: "My New Website",
  category: "Restaurant",
  description: "A conversion-focused restaurant website.",
  cover: "assets/img/website-development/my-new-website.svg",
  url: "https://example.com",
  label: "Client project"
}
```

Add another object to the `websites` array, commit, and the card appears automatically.

### Social media brands
Create a folder such as `assets/img/social-media-management/Acme-Coffee/` and upload the cover/screenshot images. The folder becomes a card automatically. Optional `meta.json` can customise the case page:

```json
{
  "name": "Acme Coffee",
  "description": "How Zavoryn managed the brand's social presence and content system.",
  "services": ["Content planning", "Social media management", "Creative direction"],
  "links": [
    {"label": "Instagram", "url": "https://instagram.com/example"},
    {"label": "Website", "url": "https://example.com"}
  ]
}
```

## Image formats
Use JPG, PNG, WEBP, GIF or SVG. Keep filenames simple (`campaign-01.jpg`, `logo-main.png`).

## Important
Concept work is labelled as concept work. Only publish real client names, links, screenshots, testimonials or results when you genuinely have permission to show them.
