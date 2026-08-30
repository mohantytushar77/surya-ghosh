/* ============================================================
   AfterSchool Academy — shared motion layer
   3D page transitions + reusable finance animations.
   Include on every page:  <script src="transitions.js" defer></script>
   ============================================================ */
(function () {
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- inject styles once ---------- */
  var css = document.createElement('style');
  css.textContent = `
  .page-veil{position:fixed;inset:0;z-index:9999;pointer-events:none;perspective:1400px;opacity:0}
  .page-veil.on{pointer-events:all;opacity:1}
  .veil-panel{
    position:absolute;inset:0;transform-origin:top center;
    background:linear-gradient(160deg,#0B1F38,#071528 60%,#0E2743);
    transform:rotateX(-92deg);will-change:transform;
    box-shadow:0 40px 120px -40px rgba(0,0,0,.9);
  }
  .page-veil.closing .veil-panel{transition:transform .52s cubic-bezier(.7,0,.3,1);transform:rotateX(0)}
  .page-veil.opening .veil-panel{transform:rotateX(0);transition:transform .55s cubic-bezier(.6,0,.2,1);transform-origin:bottom center}
  .page-veil.opening.go .veil-panel{transform:rotateX(92deg)}
  .veil-mark{
    position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
    display:grid;place-items:center;gap:14px;opacity:0;
  }
  .page-veil.closing .veil-mark,.page-veil.opening .veil-mark{animation:veilMark .5s ease forwards}
  @keyframes veilMark{0%{opacity:0;transform:translate(-50%,-50%) scale(.8)}60%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(1.06)}}
  .veil-coin{
    width:56px;height:56px;border-radius:50%;display:grid;place-items:center;
    font-family:'Sora',system-ui,sans-serif;font-size:24px;font-weight:700;color:#04101F;
    background:radial-gradient(circle at 36% 30%,#9CC1FF,#4C8DFF 72%);
    box-shadow:0 0 40px 6px rgba(76,141,255,.5);
    animation:veilSpin 1s linear infinite;
  }
  @keyframes veilSpin{to{transform:rotateY(360deg)}}
  .veil-bar{width:120px;height:2px;border-radius:2px;background:rgba(155,192,255,.25);overflow:hidden}
  .veil-bar i{display:block;height:100%;width:40%;background:#6BA1FF;animation:veilRun 1s ease-in-out infinite}
  @keyframes veilRun{0%{transform:translateX(-100%)}100%{transform:translateX(320%)}}

  /* page content entrance */
  .page-in{animation:pageIn .7s cubic-bezier(.2,.85,.25,1) both}
  @keyframes pageIn{from{opacity:0;transform:translateY(16px) scale(.995)}to{opacity:1;transform:none}}

  /* reusable finance strip — drop <div class="fin-strip"></div> anywhere */
  .fin-strip{position:relative;height:80px;overflow:hidden;perspective:600px}
  .fin-strip .fs-bar{
    position:absolute;bottom:0;width:16px;border-radius:3px 3px 0 0;
    background:linear-gradient(180deg,#9CC1FF,#4C8DFF);opacity:.5;
    transform-origin:bottom;animation:fsGrow 3.2s cubic-bezier(.2,.8,.2,1) infinite alternate;
  }
  @keyframes fsGrow{from{transform:scaleY(.3)}to{transform:scaleY(1)}}

  @media (prefers-reduced-motion:reduce){
    .page-veil,.page-in{animation:none!important;transition:none!important;display:none}
    .page-in{display:block;opacity:1;transform:none}
    .fin-strip .fs-bar{animation:none}
  }`;
  document.head.appendChild(css);

  /* ---------- build the veil ---------- */
  var veil = document.createElement('div');
  veil.className = 'page-veil';
  veil.setAttribute('aria-hidden', 'true');
  veil.innerHTML =
    '<div class="veil-panel"></div>' +
    '<div class="veil-mark"><div class="veil-coin">₹</div><div class="veil-bar"><i></i></div></div>';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    if (REDUCED) return;
    document.body.appendChild(veil);

    /* entrance: panel lifts away on arrival */
    veil.classList.add('on', 'opening');
    requestAnimationFrame(function () {
      setTimeout(function () {
        veil.classList.add('go');
        setTimeout(function () {
          veil.className = 'page-veil';
        }, 620);
      }, 60);
    });

    var main = document.querySelector('main') || document.body.querySelector('.wrap');
    if (main) main.classList.add('page-in');

    /* exit: intercept internal navigation */
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || a.target === '_blank' ||
          href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 ||
          a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;

      e.preventDefault();
      veil.classList.add('on', 'closing');
      setTimeout(function () { location.href = a.href; }, 480);
    });

    /* restore veil if the user navigates back (bfcache) */
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) veil.className = 'page-veil';
    });
  });

  /* ---------- auto-populate any .fin-strip ---------- */
  ready(function () {
    document.querySelectorAll('.fin-strip').forEach(function (strip) {
      if (strip.children.length) return;
      var n = Math.max(8, Math.floor(strip.offsetWidth / 30));
      var html = '';
      for (var i = 0; i < n; i++) {
        html += '<span class="fs-bar" style="left:' + (i * (100 / n)) + '%;height:' +
          (26 + Math.round(Math.random() * 46)) + 'px;animation-delay:' +
          (i * 0.12).toFixed(2) + 's"></span>';
      }
      strip.innerHTML = html;
    });
  });
})();
