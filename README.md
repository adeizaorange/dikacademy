# Darul Ikhlas International Academy (dikacademy.com)

Static website. Plain HTML, CSS and a little JavaScript. No build step, no packages.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `contact.html` | Contact Us (with message form) |
| `requirements.html` | Students' Requirements |
| `404.html` | Page not found |

The menu links `About`, `Courses`, `Articles`, `Tutors` and `Privacy` point to `#` until those pages exist.

## Folders

```
index.html, contact.html, requirements.html, 404.html
styles/main.css      all styling. Colors, fonts and spacing are variables at the top (:root)
scripts/main.js      mobile menu, scroll animations, number count-up, contact form
assets/              logos, tassles, icons, favicons, hero photo
robots.txt, sitemap.xml, site.webmanifest
Dockerfile, nginx.conf   optional, for the Docker deploy option below
```

## Run it on your computer

Use the **Live Server** extension in VS Code: right-click `index.html`, then "Open with Live Server".
Or, in a terminal inside this folder: `python -m http.server 8000` and open http://localhost:8000.

## Deploy with GitHub and Coolify

1. Push this folder to a GitHub repository (the files must sit at the top level of the repo).
2. In Coolify, add a new resource, choose your GitHub repository and branch.
3. Pick a build option:
   - **Static** build pack: set the publish directory to `/`. This is the simplest option.
   - **Dockerfile** build pack: uses the `Dockerfile` and `nginx.conf` here. Set the port to `80`. This adds caching and security headers.
4. Set your domain (dikacademy.com), enable HTTPS, and deploy. Turn on auto deploy to redeploy on every push.

Button names can differ a little between Coolify versions.

## Things to finish before going live

- [ ] **Contact form key.** In `contact.html`, replace `YOUR_ACCESS_KEY_HERE` with a free access key from https://web3forms.com. The key is meant to be public, so it is safe in the code.
- [ ] **Search Console and analytics.** The old site's tags were not copied yet. Paste them into the head of each page (look for the `TODO` comment).
- [ ] **Facebook link.** In the footer of every page, replace the `#` on the Facebook icon.
- [ ] **"Free 30-min call" button.** It opens WhatsApp now. Change it to a booking link if you use one.
- [ ] **Domain.** The canonical links, sitemap and social tags use `https://dikacademy.com`. Change them if your final domain is different.
- [ ] **Photos.** Search every page for `picsum.photos`. Each match is a placeholder. Put your real photo in `assets/` and change the `src`.
- [ ] **Social image.** `assets/og-image.png` is a simple navy card with the logo. Replace it with a better 1200 x 630 image if you like.
- [ ] **Prices.** Course cards say "Ask for price". Add real prices when you are ready.

## Header and footer

The header and footer are written into each page (so Google can read the menu and links). If you change a menu link or footer text, change it in all four HTML files.
