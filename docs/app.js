(() => {
  const config = window.GUDEL_CONFIG || {};
  const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const themes = {
    service: {
      title: 'Zuverlässiger Schärfdienst mit kostenlosem Hol- und Bringservice.',
      text: 'Für Betriebe im Niederrhein, Münsterland und Ruhrgebiet.',
      image: 'assets/team-workshop.jpg', alt: 'Team von Gudel Werkzeuge in der eigenen Werkstatt', label: 'Regionaler Schärfdienst',
      benefits: [
        ['calendar','Fester Tourtag','Regelmäßige Abholung und Rücklieferung.'],
        ['mail','Automatische E-Mail','Am Morgen werden Sie über unseren Besuch informiert.'],
        ['bolt','Kostenloser Express-Service','Bei Bedarf fahren wir außerhalb der Tour – ohne Mehrkosten.']
      ],
      formIntro: 'Senden Sie uns Ihre Kontaktdaten. Wir melden uns persönlich.'
    },
    pkd: {
      title: 'PKD- und Diamantwerkzeuge. Im eigenen Haus geschärft.',
      text: 'Ein 48-Stunden-Service ist nach vorheriger Abstimmung möglich.',
      image: 'assets/pkd-bearbeitung.jpg', alt: 'PKD-Werkzeug während der Bearbeitung bei Gudel Werkzeuge', label: 'PKD-Bearbeitung im eigenen Haus',
      benefits: [
        ['factory','Eigene Bearbeitung','Ihre Werkzeuge bleiben bei Gudel.'],
        ['clock','48 Stunden möglich','Abholung, Schärfen und Rücklieferung von Montag bis Freitag.'],
        ['truck','Kostenloser Fahrservice','Abholung und Rücklieferung ohne zusätzliche Fahrtkosten.']
      ],
      formIntro: 'Wir klären Werkzeug und gewünschten Termin im Rückruf.'
    },
    'cnc-komplett': {
      title: 'Komplettservice für CNC-Werkzeuge.',
      text: 'Fertig montiert, vermessen und mit Messprotokoll zurück.',
      image: 'assets/maschinenpark.jpg', alt: 'CNC-Werkzeugschleifmaschine bei Gudel Werkzeuge', label: 'Werkzeug und Aufnahme komplett',
      benefits: [
        ['mount','Komplette Einheit','Für Schrumpf-, Spannzangen- und Hydrodehnspannfutter.'],
        ['balance','Bei Bedarf ausgewuchtet','Werkzeug und Aufnahme werden fachgerecht zusammengebaut.'],
        ['document','Direkt einsatzbereit','Länge und Durchmesser aus dem Messprotokoll eingeben.']
      ],
      formIntro: 'Wir klären Werkzeug, Aufnahme und Leistungsumfang im Rückruf.'
    }
  };

  const params = new URLSearchParams(location.search);
  const aliases = {abholung:'service',zuverlaessig:'service',werkstatt:'pkd'};
  const requested = aliases[params.get('thema')] || params.get('thema');
  const themeKey = themes[requested] ? requested : 'service';
  const theme = themes[themeKey];

  document.title = `${theme.title} | Gudel Werkzeuge`;
  document.querySelector('#hero-title').textContent = theme.title;
  document.querySelector('#hero-text').textContent = theme.text;
  document.querySelector('#hero-image').src = theme.image;
  document.querySelector('#hero-image').alt = theme.alt;
  document.querySelector('#photo-label').textContent = theme.label;
  document.querySelector('#form-intro').textContent = theme.formIntro;
  document.querySelector('#campaign-theme').value = themeKey;
  document.querySelector('#benefit-grid').innerHTML = theme.benefits.map(([i,t,x]) => `<article><span class="icon">${icon(i)}</span><div><h3>${t}</h3><p>${x}</p></div></article>`).join('');

  ['utm_source','utm_medium','utm_campaign','utm_content'].forEach(name => {
    const field = document.querySelector(`#${name}`);
    if (field) field.value = params.get(name) || '';
  });

  if (/^\d{5,20}$/.test(String(config.META_PIXEL_ID || ''))) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init',String(config.META_PIXEL_ID)); fbq('track','PageView');
  }

  const form = document.querySelector('.request-form');
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', async event => {
    event.preventDefault(); status.className = 'form-status'; let firstInvalid = null;
    [...form.querySelectorAll('[required]')].forEach(field => {
      const invalid = !field.value.trim(); field.setAttribute('aria-invalid',String(invalid));
      if (invalid && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.textContent = 'Bitte füllen Sie die vier Felder vollständig aus.';
      status.classList.add('error'); firstInvalid.focus(); return;
    }
    const button = form.querySelector('button'); button.disabled = true;
    if (config.PREVIEW_MODE || !config.FORM_ENDPOINT) {
      status.textContent = 'Vorschau erfolgreich – es wurde keine echte Anfrage versendet.';
      status.classList.add('success'); button.disabled = false; return;
    }
    try {
      const response = await fetch(config.FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
      if (!response.ok) throw new Error();
      status.textContent = 'Vielen Dank. Wir melden uns telefonisch bei Ihnen.'; status.classList.add('success');
      if (window.fbq) fbq('track','Lead',{content_name:themeKey}); form.reset();
    } catch {
      status.textContent = 'Die Anfrage konnte nicht versendet werden. Bitte rufen Sie uns unter 02369 20990-0 an.'; status.classList.add('error');
    } finally { button.disabled = false; }
  });
})();
