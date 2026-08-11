# Wenzhuo Zhao — Academic Homepage

Static personal academic website for GitHub Pages.

## Deploy

Create a repository named `wz-zhao.github.io`, then push the files in this folder to the `main` branch:

```bash
git init
git add .
git commit -m "Deploy academic homepage"
git branch -M main
git remote add origin https://github.com/wz-zhao/wz-zhao.github.io.git
git push -u origin main
```

In **Settings → Pages**, use **Deploy from a branch**, select `main` and `/ (root)`.

## Structure

- `index.html` — homepage
- `cv.html` — privacy-safe public CV with print/PDF support
- `assets/style.css` — responsive light/dark design
- `assets/script.js` — theme, mobile nav, reveal effects, GitHub repository stats
- `assets/aam_figure.jpg` — public AAM figure
- `assets/samba_figure.jpg` — public Samba+ figure
- `assets/favicon.svg` — favicon
- `robots.txt`, `sitemap.xml`, `404.html` — GitHub Pages / SEO helpers

## Privacy note

The public site intentionally omits private resume fields such as phone number and date of birth. Ongoing anonymous-review projects are described only at a high level and do not expose manuscript titles or manuscript figures.
