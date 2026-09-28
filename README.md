# Scalera Systèmes — portfolio

Site vitrine statique (HTML/CSS/JS sans dépendance ni étape de build) présentant les réalisations de Scalera Systèmes.

## Structure

```
index.html                  Page unique (contenu)
css/style.css               Styles + déclaration des polices
js/neural-bg.js             Fond animé « Neural Tunnel 3D » (canvas 2D)
js/holo.js                  Logo en particules 3D (canvas 2D, lit assets/img/scalera-emblem.png)
js/ui.js                    Console animée + révélation des cartes au défilement
assets/img/                 Images (WebP pour les captures, PNG pour l'emblème)
assets/fonts/               Polices auto-hébergées (woff2, sous-ensemble latin)
```

## Lancer en local

Le logo 3D lit les pixels de son image (`getImageData`) : la page doit être servie en HTTP, pas ouverte en `file://`.

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déploiement

- Code sur GitHub, déployé par **Vercel** (site statique, aucune configuration de build).
- Domaine géré chez **OVH**, pointé vers Vercel.
- Chaque push sur une branche crée une preview Vercel ; `main` = production.

## Ajouter une réalisation

1. Exporter une capture en WebP (~800×500, qualité ~80) dans `assets/img/`.
2. Dupliquer un bloc `<article class="projet">` dans `index.html` et adapter texte, lien et `alt`.

## Polices

Michroma et Space Grotesk, sous licence [SIL Open Font License 1.1](https://openfontlicense.org/), récupérées depuis Google Fonts et servies localement (aucune requête vers les serveurs Google).
