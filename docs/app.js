(() => {
  const config = window.GUDEL_CONFIG || {};
  const campaigns = {
    'zuverlässigkeit': {
      title: 'Ein Schärfdienst, auf den Ihre Werkstatt planen kann.',
      text: 'Wir holen Ihre Werkzeuge ab, schärfen sie in unserer eigenen Schleiferei und bringen sie wieder zurück.',
      image: 'assets/video-poster.jpg',
      alt: 'Kreissägeblatt beim Schärfen in der Werkstatt von Gudel Werkzeuge',
      caption: 'Schärfen in der eigenen Schleiferei'
    },
    abholservice: {
      title: 'Wir holen Ihre Werkzeuge ab. Schärfen sie. Und bringen sie zurück.',
      text: 'Kein Verpacken, kein Paketversand. Wir übernehmen den Weg von Ihrem Betrieb zu uns und zurück.',
      image: 'assets/team-workshop.jpg',
      alt: 'Team von Gudel Werkzeuge in der eigenen Werkstatt',
      caption: 'Abholung, Bearbeitung und Rücklieferung'
    },
    touren: {
      title: 'Wir kommen, bevor die stumpfen Werkzeuge zum Problem werden.',
      text: 'Für Stammkunden planen wir regelmäßige Touren. So lässt sich die nächste Abholung frühzeitig abstimmen.',
      image: 'assets/maschinenpark.jpg',
      alt: 'CNC-Schleifmaschinen bei Gudel Werkzeuge',
      caption: 'Planbare Touren und eigene Fertigung'
    },
    express: {
      title: 'Stumpf rein. Scharf zurück. Ohne lange Wartezeiten.',
      text: 'In der Regel sind Ihre Werkzeuge 2–3 Arbeitstage bei uns im Betrieb. Wenn es dringend ist, prüfen wir eine kurzfristige Lösung.',
      image: 'assets/saegeblatt.jpg',
      alt: 'Geschärftes HW-Kreissägeblatt',
      caption: 'Kurze Wege in der eigenen Schleiferei'
    },
    regional: {
      title: 'Ihr Schärfdienst fährt bereits durch Ihre Region.',
      text: 'Unser Abhol- und Bringservice ist im Ruhrgebiet, Münsterland und am Niederrhein unterwegs.',
      image: 'assets/christian-jan-bernd.jpg',
      alt: 'Christian und Jan Bernd Gudel in der Werkstatt',
      caption: 'Persönlich betreut aus Dorsten'
    },
    digital: {
      title: 'Nicht mehr hinter Ihren Werkzeugen hertelefonieren.',
      text: 'Sie erhalten digitale Informationen zu Abholung, Bearbeitung und Rücklieferung.',
      image: 'assets/pkd-bearbeitung.jpg',
      alt: 'Präzisionswerkzeug während der Bearbeitung bei Gudel Werkzeuge',
      caption: 'Bearbeitungsstand digital nachvollziehen'
    }
  };

  const params = new URLSearchParams(location.search);
  const aliases = { service: 'zuverlässigkeit', zuverlaessigkeit: 'zuverlässigkeit' };
  const requested = aliases[params.get('thema')] || params.get('thema');
  const campaignKey = campaigns[requested] ? requested : 'zuverlässigkeit';
  const campaign = campaigns[campaignKey];

  document.title = `${campaign.title} | Gudel Werkzeuge`;
  document.querySelector('#hero-title').textContent = campaign.title;
  document.querySelector('#hero-text').textContent = campaign.text;
  const heroImage = document.querySelector('#hero-image');
  heroImage.src = campaign.image;
  heroImage.alt = campaign.alt;
  document.querySelector('#hero-caption').textContent = campaign.caption;
  document.querySelector('#campaign-theme').value = campaignKey;

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(name => {
    document.querySelector(`#${name}`).value = params.get(name) || '';
  });

  if (/^\d{5,20}$/.test(String(config.META_PIXEL_ID || ''))) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', String(config.META_PIXEL_ID));
    window.fbq('track', 'PageView');
  }

  const form = document.querySelector('.request-form');
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.className = 'form-status';
    let firstInvalid = null;
    [...form.querySelectorAll('[required]')].forEach(field => {
      const invalid = !field.validity.valid;
      field.setAttribute('aria-invalid', String(invalid));
      if (invalid && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.textContent = firstInvalid.type === 'email' && firstInvalid.value
        ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
        : 'Bitte füllen Sie alle fünf Pflichtfelder vollständig aus.';
      status.classList.add('error');
      firstInvalid.focus();
      return;
    }

    const button = form.querySelector('button');
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    if (config.PREVIEW_MODE || !config.FORM_ENDPOINT) {
      status.textContent = 'Vorschau erfolgreich – es wurde keine echte Anfrage versendet.';
      status.classList.add('success');
      button.disabled = false;
      button.removeAttribute('aria-busy');
      return;
    }
    try {
      const response = await fetch(config.FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!response.ok) throw new Error('request failed');
      status.textContent = 'Vielen Dank. Wir melden uns persönlich bei Ihnen.';
      status.classList.add('success');
      if (window.fbq) window.fbq('track', 'Lead', { content_name: campaignKey });
      form.reset();
    } catch {
      status.textContent = 'Die Anfrage konnte nicht versendet werden. Bitte rufen Sie uns unter 02369 20990-0 an.';
      status.classList.add('error');
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  });
})();
