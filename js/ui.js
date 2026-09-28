/* ════════════ Console système ════════════ */
(() => {
  const el = document.getElementById('console');
  const lignes = [
    ['info','> scalera.systemes — profil chargé'],
    ['ok','✓ web.mobile ....... react · next · expo'],
    ['ok','✓ donnees.api ...... supabase · sql'],
    ['ok','✓ automatisation ... make · n8n · agents'],
    ['ok','✓ terrain .......... industrie · qualité'],
    ['curseur','> ouvert aux opportunités ']
  ];
  if (!el) return;
  lignes.forEach((l,i)=>{
    const d=document.createElement('div');
    d.className='ln '+l[0];
    d.style.animationDelay=(0.6+i*.45)+'s';
    d.textContent=l[1];
    el.appendChild(d);
  });
})();

/* ════════════ Contact : copie de l'adresse ════════════ */
(() => {
  const btn = document.querySelector('[data-copier]');
  const statut = document.querySelector('.contact-statut');
  if (!btn || !statut) return;
  const adresse = btn.dataset.copier;
  let minuteur;

  const annoncer = msg => {
    statut.textContent = msg;
    clearTimeout(minuteur);
    minuteur = setTimeout(() => { statut.textContent = ''; }, 4000);
  };

  // Secours sans Clipboard API (http non sécurisé, navigateur ancien) : on sélectionne le texte
  const selectionner = () => {
    const cible = document.querySelector('.contact-mail span');
    if (!cible) return false;
    const r = document.createRange();
    r.selectNodeContents(cible);
    const sel = getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
    return true;
  };

  btn.hidden = false; // bouton affiché seulement si le JS tourne
  btn.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !isSecureContext) throw new Error('Clipboard API indisponible');
      await navigator.clipboard.writeText(adresse);
      annoncer('Adresse copiée ✓');
    } catch (err) {
      annoncer(selectionner()
        ? 'Adresse sélectionnée : Ctrl+C (⌘+C) pour la copier'
        : 'Copie impossible : ' + adresse);
    }
  });
})();

/* ════════════ Révélation au défilement + halo sur cartes ════════════ */
(() => {
  const obs = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('vu'); obs.unobserve(e.target);} });
  },{threshold:.2});
  document.querySelectorAll('.pilier').forEach((p,i)=>{
    p.style.transitionDelay=(i*.12)+'s';
    obs.observe(p);
    p.addEventListener('pointermove', e=>{
      const r=p.getBoundingClientRect();
      p.style.setProperty('--mx',(e.clientX-r.left)+'px');
      p.style.setProperty('--my',(e.clientY-r.top)+'px');
    });
  });
})();
