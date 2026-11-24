// Contenu éditable du site. Les valeurs entre crochets sont à compléter avant la mise en production.
import escaleDeLarcher from '../assets/escale-de-larcher.webp';
import type { ImageMetadata } from 'astro';

export const site = {
  name: 'Scalera Systems',
  owner: 'Hugo Failly',
  role: 'Product Builder IA',
  location: 'Lot-et-Garonne, France',
  email: 'hugo.failly@icloud.com',
  availability: 'Disponible pour de nouveaux projets dès janvier 2027',
  siret: '[À COMPLÉTER]',
  linkedin: 'https://www.linkedin.com/in/hugo-f-5842b1191',
  github: 'https://github.com/daemonshift',
  description:
    'Hugo Failly, Product Builder IA : applications web et mobiles, automatisations et IA pour faire gagner du temps à vos équipes.',
};

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Offres', href: '#offres' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Méthode', href: '#methode' },
];

export const marquee = ['Automatisation', 'Applications web & mobile', 'Agents IA', 'Outils métier'];

export const problems = [
  {
    pain: 'Vos équipes ressaisissent les mêmes données dans plusieurs outils.',
    fix: 'Je connecte vos outils entre eux et j’automatise les transferts.',
  },
  {
    pain: 'Vos devis et chiffrages prennent des heures.',
    fix: 'Je construis l’outil qui prépare le travail à votre place, avec vos règles.',
  },
  {
    pain: 'Votre suivi qualité vit dans des fichiers Excel.',
    fix: 'Je le transforme en application simple, partagée et traçable.',
  },
  {
    pain: 'Vous avez une idée d’application, mais pas d’équipe technique.',
    fix: 'Je la conçois et la mets en ligne, du prototype à la version finale.',
  },
];

export const offers = [
  {
    tag: 'Diagnostic',
    title: 'Audit de vos process',
    text: 'On passe en revue vos process et vos outils. Vous repartez avec la liste de ce qui vous coûte du temps et un plan d’action chiffré.',
    points: ['Cartographie de vos process', 'Gains identifiés et priorisés', 'Plan d’action chiffré'],
    price: '[PRIX] € HT',
    dark: false,
  },
  {
    tag: 'Automatisation',
    title: 'Automatisation clé en main',
    text: 'Je connecte vos outils et j’automatise les tâches répétitives : saisie, relances, reporting, alertes.',
    points: ['Make, n8n, Airtable, IA', 'Documentation livrée', 'Prise en main par vos équipes'],
    price: 'Dès [PRIX] € HT',
    dark: true,
  },
  {
    tag: 'Sur mesure',
    title: 'Application web ou mobile',
    text: 'Un outil métier conçu autour de votre usage — du prototype cliquable à la mise en ligne.',
    points: ['Next.js, React Native, Supabase', 'Livraisons courtes, testées par vous', 'Code et données à votre nom'],
    price: 'Sur devis',
    dark: false,
  },
];

export type Project = { name: string; kind: string; href?: string; image?: ImageMetadata };

export const projects: Project[] = [
  { name: 'Scalera Systems', kind: 'Site vitrine · Astro, Vercel', href: 'https://scalera-systemes.fr' },
  {
    name: 'lescaledelarcher.fr',
    kind: 'Site multilingue',
    href: 'https://www.lescaledelarcher.fr',
    image: escaleDeLarcher,
  },
  { name: 'Pipeline prospection', kind: 'Formulaire → Airtable → Slack · Make' },
];

export const lab = [
  {
    name: 'PlayOff Amateurs',
    desc: 'Réserver un terrain entre amis, gérer les créneaux et partager les frais.',
    status: 'Prototype',
  },
  {
    name: 'MaisonZen',
    desc: 'Tâches, calendrier et listes partagées pour toute la famille, sur mobile.',
    status: 'En développement',
  },
  {
    name: 'ConformAI',
    desc: 'Gestion des non-conformités : analyse IA, validation humaine, suivi des actions.',
    status: 'En conception',
  },
];

export const steps = [
  { title: 'Échange', text: 'Vous m’expliquez votre activité et ce qui coince. J’écoute avant de proposer.' },
  { title: 'Proposition', text: 'Périmètre, délai et prix fixés par écrit, avant la première ligne de code.' },
  { title: 'Construction', text: 'Livraisons courtes. Vous testez à chaque étape, on ajuste ensemble.' },
  { title: 'Mise en service', text: 'Documentation, prise en main par vos équipes et suivi après livraison.' },
];

export const strengths = [
  {
    title: 'Précision',
    text: 'Quatre ans comme tireur de précision : préparer, mesurer, ne rien laisser au hasard. Chaque détail de votre outil est pensé et vérifié.',
  },
  {
    title: 'Culture qualité',
    text: 'Plusieurs années en qualité et en bureau d’études industriel : traçabilité, gestion des écarts, documentation. Vos outils sont livrés testés et documentés.',
  },
  {
    title: 'Compréhension métier',
    text: 'J’ai analysé des besoins, chiffré, coordonné production, qualité et fournisseurs. Je comprends votre process avant d’écrire la première ligne de code.',
  },
  {
    title: 'Autonomie',
    text: 'Autodidacte en développement web depuis 2018. J’apprends vite et je m’adapte à votre activité, quelle qu’elle soit.',
  },
];

export const tools = [
  'Next.js', 'React', 'React Native', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL',
  'Make', 'n8n', 'Airtable', 'Claude', 'OpenAI', 'Vercel',
];

export const faq = [
  {
    q: 'Je n’ai pas de cahier des charges. Est-ce un problème ?',
    a: 'Non. On part de votre façon de travailler et je rédige le périmètre avec vous. C’est tout l’intérêt du premier échange.',
  },
  {
    q: 'Le code et les données m’appartiennent-ils ?',
    a: 'Oui. Le code est livré sur un dépôt à votre nom, et les comptes d’hébergement et de base de données sont créés pour vous.',
  },
  {
    q: 'Combien de temps prend un projet ?',
    a: 'Cela dépend du périmètre. Le délai est fixé par écrit avec le prix, avant de commencer — et tenu.',
  },
  {
    q: 'Avec quel type d’entreprise travaillez-vous ?',
    a: 'Industriels, PME, indépendants, associations : tout projet où un outil numérique bien pensé fait gagner du temps.',
  },
];
