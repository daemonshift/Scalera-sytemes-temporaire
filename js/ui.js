/* ════════════ Console système ════════════ */
(() => {
  const el = document.getElementById('console');
  const lignes = [
    ['info','> scalera.systemes — initialisation'],
    ['ok','✓ identite.visuelle ............ chargée'],
    ['ok','✓ reseau.neuronal .............. actif'],
    ['ok','✓ hologramme.3d ................ stable'],
    ['att','⧗ portfolio.modules ............ en formation'],
    ['curseur','> en attente des premiers projets ']
  ];
  lignes.forEach((l,i)=>{
    const d=document.createElement('div');
    d.className='ln '+l[0];
    d.style.animationDelay=(0.6+i*.45)+'s';
    d.textContent=l[1];
    el.appendChild(d);
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
