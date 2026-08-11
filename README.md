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


## Google Scholar citation counter

The homepage displays the Google Scholar profile citation count beside the Scholar link.

- Scholar ID: `dNzUUAoAAAAJ`
- Data file: `assets/scholar_stats.json`
- Updater: `scripts/update_scholar.py`
- Workflow: `.github/workflows/update-scholar-citations.yml`
- Refresh schedule: every 6 hours (GitHub Actions; UTC)

After uploading the website to `wz-zhao/wz-zhao.github.io`, open **Actions → Update Google Scholar Citations → Run workflow** once. After the first successful run, the homepage will show the citation count automatically and scheduled runs will keep it refreshed.

No API key or repository secret is required. Google Scholar does not provide an official public citation API, so the workflow uses the open-source `scholarly` crawler. If Google temporarily rate-limits automated access, the webpage keeps showing the last successfully fetched value.


> Before the first successful Scholar refresh, the citation field intentionally shows `—` rather than `0`.
> This avoids JavaScript's `Number(null) === 0` coercion from displaying a false zero.
