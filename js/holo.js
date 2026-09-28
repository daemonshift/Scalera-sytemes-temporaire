/* ════════════ Hologramme : logo en particules 3D ════════════ */
(() => {
  const REDUIT = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMBLEME = 'assets/img/scalera-emblem.png';
  const c = document.getElementById('holo');
  if (!c) return;
  const ctx = c.getContext('2d');
  if (!ctx) return;
  let W,H,dpr;
  function tailleCanvas(){
    const r = c.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio||1, 2);
    W = r.width; H = r.height;
    c.width = W*dpr; c.height = H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  tailleCanvas();
  addEventListener('resize', tailleCanvas);

  const img = new Image();
  // getImageData exige une image de même origine : ouvrir la page via un serveur HTTP, pas en file://
  img.onerror = () => console.warn('[holo] emblème introuvable :', EMBLEME);
  let parts = [];
  const FOC = 760;

  img.onload = () => {
    // Échantillonnage des pixels du logo
    const ech = document.createElement('canvas');
    const LARG = 190;
    const HAUT = Math.round(LARG * img.height / img.width);
    ech.width = LARG; ech.height = HAUT;
    const ectx = ech.getContext('2d');
    ectx.drawImage(img, 0, 0, LARG, HAUT);
    let data;
    try { data = ectx.getImageData(0,0,LARG,HAUT).data; }
    catch (err) { console.warn('[holo] lecture des pixels impossible (page ouverte en file:// ?)', err); return; }

    const PAS = W < 520 ? 3 : 2; // moins de particules sur petit écran : ~2× plus fluide sur mobile
    for(let y=0; y<HAUT; y+=PAS){
      for(let x=0; x<LARG; x+=PAS){
        const i = (y*LARG+x)*4;
        if(data[i+3] < 130) continue;
        let r=data[i], g=data[i+1], b=data[i+2];
        const lum = (r+g+b)/3;
        const estBleu = b > 110 && b > r*1.6;
        // Les pixels sombres (navy) sont éclaircis pour rester lisibles sur fond noir
        if(!estBleu && lum < 90){ r=96; g=120; b=176; }
        // Profondeur : la moitié bleue du S devant, la moitié navy derrière
        const z0 = (estBleu ? -26 : 26) + (Math.random()-.5)*16;
        parts.push({
          hx:(x-LARG/2)*2.55, hy:(y-HAUT/2)*2.55, hz:z0,
          x:(Math.random()-.5)*1400, y:(Math.random()-.5)*1400, z:(Math.random()-.5)*1400,
          vx:0, vy:0, vz:0,
          col:`rgba(${r},${g},${b},`,
          lueur: estBleu,
          ph: Math.random()*Math.PI*2
        });
      }
    }
    pret = true;
    planifier();
  };
  img.src = EMBLEME;

  // Rendu uniquement quand le logo est à l'écran et l'onglet visible
  let rafH = 0, pret = false, visible = true;
  function planifier(){
    if (!rafH && pret && visible && !document.hidden) rafH = requestAnimationFrame(boucle);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; planifier(); }).observe(c);
  }
  document.addEventListener('visibilitychange', planifier);

  // Interaction : rotation par glisser + répulsion souris + explosion
  let rx=-.12, ry=.35, vrx=0, vry=REDUIT?0:.0035;
  let drag=false, px=0, py=0, repos=0, eclate=0;
  const curseur = {x:-1e4, y:-1e4};

  // Double-tap tactile (dblclick est peu fiable sur mobile)
  let tapT=0, tapX=0, tapY=0, downX=0, downY=0;
  c.addEventListener('pointerdown', e=>{
    drag=true; px=e.clientX; py=e.clientY; vrx=vry=0;
    downX=e.clientX; downY=e.clientY;
    c.setPointerCapture(e.pointerId);
  });
  c.addEventListener('pointermove', e=>{
    const r=c.getBoundingClientRect();
    curseur.x=e.clientX-r.left; curseur.y=e.clientY-r.top;
    if(!drag) return;
    const dx=e.clientX-px, dy=e.clientY-py;
    ry += dx*.008; rx += dy*.008;
    rx = Math.max(-1.45, Math.min(1.45, rx));
    vry = dx*.0022; vrx = dy*.0022;
    px=e.clientX; py=e.clientY;
  });
  const lache=()=>{drag=false; repos=0;};
  c.addEventListener('pointerup', e=>{
    lache();
    if (e.pointerType !== 'touch') return;
    if (Math.hypot(e.clientX-downX, e.clientY-downY) > 12) { tapT = 0; return; } // c'était un glissé
    const now = performance.now();
    if (now - tapT < 320 && Math.hypot(e.clientX-tapX, e.clientY-tapY) < 40) { eclater(); tapT = 0; }
    else { tapT = now; tapX = e.clientX; tapY = e.clientY; }
  });
  c.addEventListener('pointercancel', lache);
  c.addEventListener('pointerleave', ()=>{curseur.x=curseur.y=-1e4;});
  c.addEventListener('dblclick', eclater);
  function eclater(){
    if (eclate) return; // évite un double déclenchement tap + dblclick
    eclate = 1;
    for(const p of parts){
      p.vx += (Math.random()-.5)*46;
      p.vy += (Math.random()-.5)*46;
      p.vz += (Math.random()-.5)*46;
    }
    setTimeout(()=>{ eclate = 0; }, 900);
  }

  let t=0;
  function boucle(){
    rafH = 0;
    t += .016;
    ctx.clearRect(0,0,W,H);

    if(!drag){
      vrx*=.95; vry*=.95;
      repos++;
      if(!REDUIT && repos>140) vry += (.0035-vry)*.01;
      if(repos>140) rx += (-.12-rx)*.008;
      rx = Math.max(-1.45, Math.min(1.45, rx+vrx));
      ry += vry;
    }

    const cx=Math.cos(rx), sx=Math.sin(rx);
    const cy=Math.cos(ry), sy=Math.sin(ry);
    const ressort = eclate ? 0 : .055;
    const flot = [];

    for(const p of parts){
      // respiration ambiante
      const ond = REDUIT ? 0 : Math.sin(t*1.4+p.ph)*1.6;
      // rappel élastique vers la position d'origine
      p.vx += (p.hx-p.x)*ressort + (Math.random()-.5)*.06;
      p.vy += (p.hy+ond-p.y)*ressort;
      p.vz += (p.hz-p.z)*ressort;
      p.vx*=.86; p.vy*=.86; p.vz*=.86;
      p.x+=p.vx; p.y+=p.vy; p.z+=p.vz;

      // rotation 3D (Y puis X)
      let X = p.x*cy + p.z*sy;
      let Z = -p.x*sy + p.z*cy;
      let Y = p.y*cx - Z*sx;
      Z = p.y*sx + Z*cx;

      const s = FOC/(FOC+Z);
      let ex = W/2 + X*s*(W/560);
      let ey = H/2 + Y*s*(W/560);

      // répulsion du curseur (espace écran)
      const ddx=ex-curseur.x, ddy=ey-curseur.y;
      const dd=ddx*ddx+ddy*ddy;
      if(dd < 4900 && dd > .01){
        const f=(1-Math.sqrt(dd)/70)*16;
        const inv=1/Math.sqrt(dd);
        ex+=ddx*inv*f; ey+=ddy*inv*f;
      }
      flot.push({ex,ey,s,Z,col:p.col,lueur:p.lueur});
    }

    flot.sort((a,b)=>b.Z-a.Z);
    for(const q of flot){
      const taille = Math.max(.5, 1.9*q.s*(W/560));
      const alpha = Math.max(.12, Math.min(.95, .85*q.s));
      if(q.lueur){
        ctx.shadowColor='rgba(47,123,255,.9)';
        ctx.shadowBlur=6;
      } else ctx.shadowBlur=0;
      ctx.fillStyle=q.col+alpha+')';
      ctx.fillRect(q.ex-taille/2, q.ey-taille/2, taille, taille);
    }
    ctx.shadowBlur=0;
    planifier();
  }
})();
