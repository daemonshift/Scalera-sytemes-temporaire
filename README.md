# Scalera Systems — site

Site vitrine de Scalera Systems (Hugo Failly, Product Builder IA), construit avec [Astro](https://astro.build) en sortie 100 % statique. Aucun cookie, aucun traceur, polices auto-hébergées via Fontsource.

## Lancer en local

Node ≥ 22.23.4 requis (contrainte d'Astro 7).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + build dans dist/
npm run preview   # sert dist/
```

## Structure

```
src/data/site.ts           Tout le contenu éditable (textes, offres, prix, projets, FAQ, liens)
src/components/            Une section par composant (Hero, Statement, Problems, Offers, Projects, Method, Why, Faq, Contact)
src/layouts/Base.astro     <head> commun : SEO, Open Graph, favicons
src/styles/global.css      Jetons de couleur, typographie, boutons
src/pages/                 index + mentions-legales
src/assets/                Images optimisées au build (WebP, tailles responsives)
public/                    Favicons, image de partage
```

## Modifier le contenu

- Textes, prix, projets, FAQ : `src/data/site.ts`.
- Ajouter une réalisation avec capture au survol : placer l'image dans `src/assets/`, l'importer dans `site.ts` et la passer dans le champ `image` du projet.
- Couleur d'accent : `--accent` dans `src/styles/global.css`.

## Formulaire de contact

Sans serveur : à l'envoi, il ouvre la messagerie du visiteur avec un e-mail prérempli. Pour un envoi direct, brancher un service (Formspree, Resend via une fonction Vercel…) et mettre à jour la section « Données personnelles » des mentions légales.

## Déploiement

GitHub → Vercel (préréglage Astro détecté automatiquement). Domaine OVH pointé vers Vercel : https://scalera-systemes.fr.
