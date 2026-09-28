# Scalera Systèmes — portfolio

Portfolio statique (HTML/CSS/JS sans dépendance ni étape de build) : profil de développeur web & mobile, parcours, réalisations, compétences et contact. Aucun cookie, aucun traceur, polices auto-hébergées.

## Structure

```
index.html                  Page principale
mentions-legales.html       Mentions légales (éditeur non professionnel, LCEN art. 1-1, II)
css/style.css               Styles + déclaration des polices
js/neural-bg.js             Fond animé « Neural Tunnel 3D » (canvas 2D)
js/holo.js                  Logo en particules 3D (canvas 2D, lit assets/img/scalera-emblem.png)
js/ui.js                    Console animée, copie de l'adresse mail, révélation des cartes
assets/img/                 Captures (WebP), emblème, favicons, image de partage (og-image.jpg)
assets/fonts/               Polices woff2 (sous-ensemble latin)
assets/cv/                  CV anonymisé en PDF (fichier généré)
scripts/                    Sources des fichiers générés (non déployé, voir .vercelignore)
```

## Lancer en local

Le logo 3D lit les pixels de son image (`getImageData`) : la page doit être servie en HTTP, pas ouverte en `file://`.

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Régénérer le CV, l'image de partage et les favicons

Sources : `scripts/cv.html`, `scripts/og.html`, `assets/img/scalera-emblem.png`.

```bash
npm i -g playwright && npx playwright install chromium   # une seule fois
NODE_PATH=$(npm root -g) node scripts/build-assets.cjs
```

Le script échoue volontairement si le CV dépasse une page A4. Le PDF produit ne contient aucune métadonnée d'auteur.

## Performance et accessibilité

- Animations en pause quand l'onglet est masqué ; logo 3D en pause hors écran ; densité de particules réduite sous 520 px.
- `prefers-reduced-motion` : fond figé (une seule image), aucune animation d'apparition.
- Contrastes WCAG AA, lien d'évitement, hiérarchie de titres continue, double-tap tactile sur le logo.

## Déploiement

- Code sur GitHub, déployé par **Vercel** (site statique, aucune configuration de build).
- Domaine géré chez **OVH**, pointé vers Vercel.
- Chaque push sur une branche crée une preview Vercel ; `main` = production.
- Domaine de production : https://scalera-systemes.fr (utilisé par `og:url`, `og:image` et le lien du CV ; surcharge possible via `PORTFOLIO_URL`).

## Ajouter une réalisation

1. Exporter une capture en WebP (~800×500, qualité ~80) dans `assets/img/`.
2. Dupliquer un bloc `<article class="projet">` dans `index.html` et adapter texte, lien et `alt`.

## Polices

Michroma et Space Grotesk, sous licence [SIL Open Font License 1.1](https://openfontlicense.org/), servies localement (aucune requête vers les serveurs Google).
