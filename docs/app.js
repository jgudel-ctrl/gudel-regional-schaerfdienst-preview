(() => {
  const config = window.GUDEL_CONFIG || {};
  const themes = {
    abholung: {
      title: 'Wir holen Ihre Werkzeuge im Betrieb ab.',
      text: 'Gudel Werkzeuge übernimmt Abholung, Schärfen und Rücklieferung für holzverarbeitende Betriebe in der Region.',
      image: 'assets/team-workshop.jpg',
      alt: 'Mitarbeiter von Gudel Werkzeuge in der eigenen Werkstatt'
    },
    werkstatt: {
      title: 'Ihre Werkzeuge werden bei uns im Haus geschärft.',
      text: 'Eigene CNC-Schleiftechnik, zwei Präzisionswerkzeugmechaniker-Meister und ein fester Ansprechpartner.',
      image: 'assets/maschinenpark.jpg',
      alt: 'CNC-Schleiftechnik in der Werkstatt von Gudel Werkzeuge'
    },
    zuverlaessig: {
      title: 'Sie suchen einen zuverlässigen Schärfdienst?',
      text: 'Wir holen Ihre Werkzeuge ab, schärfen sie in unserer eigenen Werkstatt und bringen sie wieder zurück.',
      image: 'assets/team-workshop.jpg',
      alt: 'Team von Gudel Werkzeuge in der eigenen Werkstatt'
    }
  };

  const params = new URLSearchParams(location.search);
  const themeKey = themes[params.get('thema')] ? params.get('thema') : 'zuverlaessig';
  const theme = themes[themeKey];
  document.querySelector('#hero-title').textContent = theme.title;
  document.querySelector('#hero-text').textContent = theme.text;
  const heroImage = document.querySelector('#hero-image');
  heroImage.src = theme.image;
  heroImage.alt = theme.alt;
  document.querySelector('#campaign-theme').value = themeKey;

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((name) => {
    const field = document.querySelector(`#${name}`);
    if (field) field.value = params.get(name) || '';
  });

  if (/^\d{5,20}$/.test(String(config.META_PIXEL_ID || ''))) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', String(config.META_PIXEL_ID));
    fbq('track', 'PageView');
  }

  const form = document.querySelector('.request-form');
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.className = 'form-status';
    const required = [...form.querySelectorAll('[required]')];
    let firstInvalid = null;
    required.forEach((field) => {
      const invalid = !field.value.trim();
      field.setAttribute('aria-invalid', String(invalid));
      if (invalid && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.textContent = 'Bitte füllen Sie die vier Felder vollständig aus.';
      status.classList.add('error');
      firstInvalid.focus();
      return;
    }

    const button = form.querySelector('button');
    button.disabled = true;
    if (config.PREVIEW_MODE || !config.FORM_ENDPOINT) {
      status.textContent = 'Vorschau erfolgreich – es wurde keine echte Anfrage versendet.';
      status.classList.add('success');
      button.disabled = false;
      return;
    }

    try {
      const response = await fetch(config.FORM_ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) });
      if (!response.ok) throw new Error('Versand fehlgeschlagen');
      status.textContent = 'Vielen Dank. Wir melden uns telefonisch bei Ihnen.';
      status.classList.add('success');
      if (window.fbq) fbq('track', 'Lead', { content_name: themeKey });
      form.reset();
    } catch {
      status.textContent = 'Die Anfrage konnte nicht versendet werden. Bitte rufen Sie uns unter 02369 20990-0 an.';
      status.classList.add('error');
    } finally {
      button.disabled = false
    }
  });
})();
