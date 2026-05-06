// iiSports Redesign — Interactions
document.addEventListener('DOMContentLoaded', () => {
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    // === Cart Drawer ===
    const cartDrawer = $('#cart-drawer');
    const overlay = $('#overlay');
    const openCart = () => { cartDrawer.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow='hidden'; };
    const closeCart = () => { cartDrawer.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow=''; };

    $('#cart-btn')?.addEventListener('click', e => { e.preventDefault(); openCart(); });
    $('#mob-cart-btn')?.addEventListener('click', e => { e.preventDefault(); openCart(); });
    $('#cart-close')?.addEventListener('click', closeCart);
    $('#continue-shop')?.addEventListener('click', closeCart);
    overlay?.addEventListener('click', () => { closeCart(); closeMobMenu(); });

    // === Mobile Menu ===
    const mobMenu = $('#mob-menu');
    const openMobMenu = () => { mobMenu.classList.add('open'); document.body.style.overflow='hidden'; };
    const closeMobMenu = () => { mobMenu.classList.remove('open'); document.body.style.overflow=''; };

    $('#hamburger-btn')?.addEventListener('click', openMobMenu);
    $('#mob-close')?.addEventListener('click', closeMobMenu);

    // === Sticky Nav Shrink ===
    const nav = $('#main-nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });

    // === Add to Cart Micro-interaction ===
    $$('.btn-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const orig = btn.textContent;
            btn.textContent = '✅ ADDED!';
            btn.style.background = '#2ecc71';
            btn.style.transform = 'scale(.95)';
            setTimeout(() => { btn.style.transform = ''; }, 120);
            setTimeout(() => {
                btn.textContent = orig;
                btn.style.background = '';
                openCart();
            }, 900);
        });
    });

    // === Deal Countdown Timer ===
    let totalSec = 2*86400 + 14*3600 + 37*60 + 52; // 2d 14h 37m 52s
    const tick = () => {
        if (totalSec <= 0) return;
        totalSec--;
        const d = Math.floor(totalSec / 86400);
        const h = Math.floor((totalSec % 86400) / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        const pad = n => String(n).padStart(2, '0');
        const el = id => $(id);
        if (el('#timer-d')) el('#timer-d').textContent = pad(d);
        if (el('#timer-h')) el('#timer-h').textContent = pad(h);
        if (el('#timer-m')) el('#timer-m').textContent = pad(m);
        if (el('#timer-s')) el('#timer-s').textContent = pad(s);
    };
    setInterval(tick, 1000);

    // === Scroll Reveal Animations ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.08 });

    $$('.prod-card, .rev-card, .news-box').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `all .5s cubic-bezier(.4,0,.2,1) ${i * 80}ms`;
        observer.observe(el);
    });

    // === Mobile Search (scroll to top + focus) ===
    $('#mob-search-btn')?.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            const si = $('#search-input');
            if (si) { si.style.display = 'block'; si.focus(); }
        }, 400);
    });

    // === Announcement bar rotation (mobile) ===
    const annTexts = $$('.ann-bar span');
    if (window.innerWidth < 768 && annTexts.length > 1) {
        let idx = 0;
        annTexts.forEach((t, i) => { if (i > 0) t.style.display = 'none'; });
        setInterval(() => {
            annTexts[idx].style.display = 'none';
            idx = (idx + 1) % annTexts.length;
            annTexts[idx].style.display = '';
        }, 4000);
    }
});
