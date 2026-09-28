// Génère les fichiers dérivés du site : CV en PDF, image de partage Open Graph, favicons.
// Usage : node scripts/build-assets.cjs   (Playwright global : NODE_PATH=$(npm root -g) node scripts/build-assets.cjs)
// Prérequis : Playwright (npm i -g playwright) et un Chromium installé.
// Variable optionnelle : PORTFOLIO_URL (URL publique affichée dans le CV).
const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');
const { mkdir, stat } = require('node:fs/promises');

const racine = resolve(__dirname, '..');
const src = f => pathToFileURL(resolve(racine, 'scripts', f)).href;
const out = f => resolve(racine, f);

const PORTFOLIO_URL = process.env.PORTFOLIO_URL || 'https://scalera-sytemes-temporaire.vercel.app';

async function main() {
  await mkdir(out('assets/cv'), { recursive: true });
  const navigateur = await chromium.launch();
  try {
    // 1. CV A4 -> PDF (aucune métadonnée d'auteur : Chromium ne renseigne que le titre)
    const cv = await navigateur.newPage();
    await cv.goto(src('cv.html'), { waitUntil: 'networkidle' });
    await cv.evaluate(url => {
      const a = [...document.querySelectorAll('a')].find(x => x.getAttribute('href') === '@@PORTFOLIO_URL@@');
      if (!a) throw new Error('Emplacement @@PORTFOLIO_URL@@ introuvable dans cv.html');
      a.href = url;
      a.textContent = url.replace(/^https?:\/\//, '');
    }, PORTFOLIO_URL);
    await cv.evaluate(() => document.fonts.ready);
    // Débordement : le bas du dernier bloc de chaque colonne doit rester dans la page A4
    const debordement = await cv.evaluate(() => {
      const page = document.body.getBoundingClientRect().height;
      return ['main', 'aside'].some(sel => {
        const dernier = document.querySelector(sel).lastElementChild;
        const pad = parseFloat(getComputedStyle(document.querySelector(sel)).paddingBottom);
        return dernier.getBoundingClientRect().bottom > page - pad + 1;
      });
    });
    if (debordement) throw new Error('Le CV dépasse une page A4 : raccourcir le contenu de scripts/cv.html');
    await cv.pdf({ path: out('assets/cv/cv-developpeur-web-mobile.pdf'), format: 'A4', printBackground: true, pageRanges: '1' });

    // 2. Image Open Graph 1200×630
    const og = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
    await og.goto(src('og.html'), { waitUntil: 'networkidle' });
    await og.evaluate(() => document.fonts.ready);
    await og.screenshot({ path: out('assets/img/og-image.jpg'), type: 'jpeg', quality: 85 });

    // 3. Favicons à partir de l'emblème
    const ico = await navigateur.newPage();
    const embleme = pathToFileURL(out('assets/img/scalera-emblem.png')).href;
    for (const [taille, fichier, fond] of [[32, 'favicon-32.png', 'transparent'], [180, 'apple-touch-icon.png', '#04070f']]) {
      await ico.setViewportSize({ width: taille, height: taille });
      await ico.setContent(`<body style="margin:0;background:${fond};display:grid;place-items:center;width:${taille}px;height:${taille}px">
        <img src="${embleme}" style="width:${Math.round(taille * (fond === 'transparent' ? 1 : .78))}px"></body>`);
      await ico.waitForLoadState('networkidle');
      await ico.screenshot({ path: out(`assets/img/${fichier}`), omitBackground: fond === 'transparent' });
    }
  } finally {
    await navigateur.close();
  }
  for (const f of ['assets/cv/cv-developpeur-web-mobile.pdf', 'assets/img/og-image.jpg', 'assets/img/favicon-32.png', 'assets/img/apple-touch-icon.png']) {
    console.log(`✓ ${f} (${Math.round((await stat(out(f))).size / 1024)} Ko)`);
  }
}

main().catch(err => { console.error('✗ Échec de la génération :', err.message); process.exit(1); });
