(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('wz-theme');
  if (saved) root.dataset.theme = saved;
  else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('wz-theme', next);
  });

  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    mobileNav?.classList.toggle('open', !open);
  });
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 }) : null;
  document.querySelectorAll('.reveal').forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-visible');
  });

  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = navAnchors.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => navObserver.observe(s));
  }


  // Google Scholar citation count. The JSON file is refreshed by GitHub Actions.
  const scholarCitations = document.getElementById('scholarCitations');
  if (scholarCitations) {
    fetch(`assets/scholar_stats.json?v=${Date.now()}`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Scholar stats unavailable');
        return res.json();
      })
      .then((data) => {
        const citedby = Number(data?.citedby);
        if (Number.isFinite(citedby) && citedby >= 0) {
          scholarCitations.textContent = citedby.toLocaleString();
          if (data?.updated) {
            scholarCitations.closest('.scholar-link')?.setAttribute(
              'title',
              `Google Scholar citations · updated ${new Date(data.updated).toLocaleString()}`
            );
          }
        }
      })
      .catch(() => {
        // Keep the graceful "—" fallback if the scheduled crawler has not run yet.
      });
  }

  document.querySelectorAll('[data-repo]').forEach(async (card) => {
    const repo = card.dataset.repo;
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`, { headers: { Accept: 'application/vnd.github+json' } });
      if (!res.ok) return;
      const data = await res.json();
      const stars = card.querySelector('[data-stars]');
      const forks = card.querySelector('[data-forks]');
      const lang = card.querySelector('.repo-language');
      if (stars) stars.textContent = data.stargazers_count ?? '—';
      if (forks) forks.textContent = data.forks_count ?? '—';
      if (lang && data.language) lang.textContent = data.language;
    } catch (_) {
      // Graceful fallback when GitHub API is unavailable or rate-limited.
    }
  });
})();
