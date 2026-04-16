document.addEventListener('DOMContentLoaded', () => {

    /* ---- Mobile Nav ---- */
    const btn = document.getElementById('navBtn');
    const nav = document.getElementById('navList');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            btn.classList.toggle('open');
            nav.classList.toggle('open');
        });
        nav.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => { btn.classList.remove('open'); nav.classList.remove('open'); })
        );
        document.addEventListener('click', e => {
            if (!btn.contains(e.target) && !nav.contains(e.target)) {
                btn.classList.remove('open'); nav.classList.remove('open');
            }
        });
    }

    /* ---- Scroll Reveal ---- */
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.card, .style-tile, .gallery-sm').forEach(el => {
        el.classList.add('anim-up');
        io.observe(el);
    });

    const s = document.createElement('style');
    s.textContent = `.anim-up{opacity:0;transform:translateY(36px);transition:opacity .7s ease,transform .7s ease}.vis{opacity:1!important;transform:translateY(0)!important}`;
    document.head.appendChild(s);

    /* ---- Sticky Header Shadow ---- */
    const hdr = document.getElementById('header');
    if (hdr) {
        let last = 0;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            hdr.style.boxShadow = y > 30 ? '0 2px 24px rgba(30,42,56,.06)' : 'none';
            /* Optional: auto-hide on scroll down */
            hdr.style.transform = y > 400 && y > last ? 'translateY(-100%)' : 'translateY(0)';
            hdr.style.transition = 'transform .35s ease, box-shadow .3s ease';
            last = y;
        }, { passive: true });
    }

    /* ---- Smooth number count-up on hero stats (if present) ---- */
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current.toLocaleString();
        }, 30);
    });
});