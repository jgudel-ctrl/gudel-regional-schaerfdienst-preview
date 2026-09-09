(() => {
  const config = window.GUDEL_CONFIG || {};
  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const themes = {
    service: {
      title: 'Zuverlässiger Schärfdienst. Kostenloser Hol- und Bringservice.',
      text: 'Fester Tourtag, automatische E-Mail-Benachrichtigung und ein kostenloser Express-Service, wenn es kurzfristig gehen muss.',
      image: 'assets/team-workshop.jpg', alt: 'Team von Gudel Werkzeuge in der eigenen Werkstatt', label: 'Regional unterwegs · persönlich betreut',
      benefitIntro: 'Der Hol- und Bringdienst gehört dazu. Den Unterschied machen die planbare Organisation und der kostenlose Express-Service.',
      benefits: [
        ['calendar','Fester Tourtag','Sie wissen, an welchem Tag Gudel Ihren Betrieb regelmäßig anfährt.'],
        ['mail','Automatische E-Mail','Am Morgen erhalten Sie die Nachricht, dass wir heute kommen.'],
        ['bolt','Kostenloser Express-Service','Nach telefonischer Abstimmung fahren wir auch außerhalb der Tour – ohne zusätzliche Kosten.']
      ],
      processIntro: 'Für Sägeblätter, Bohrer, Fräser, weitere Zerspanungswerkzeuge und neu angefertigte Sonderwerkzeuge.',
      steps: [['phone','Rückruf anfordern','Wir prüfen Ihren Standort und stimmen den festen Tourtag ab.'],['mail','Bescheid bekommen','Am Morgen der Abholung oder Rücklieferung kommt automatisch eine E-Mail.'],['truck','Werkzeuge abholen','Wir übernehmen die Werkzeuge direkt in Ihrem Betrieb.'],['check','Geschärft zurück','Die bearbeiteten Werkzeuge kommen auf einer der nächsten Touren zurück.']],
      evidenceTitle: 'Wenn es nicht bis zur nächsten Tour warten kann.',
      evidenceText: 'Rufen Sie uns an. Wir holen die Werkzeuge außerhalb der regulären Tour ab und bringen sie nach dem Schärfen wieder zurück. Für die Expressfahrt berechnen wir keine zusätzlichen Kosten.',
      evidenceList: ['Niederrhein, Münsterland und Ruhrgebiet','Paketversand alternativ möglich','Persönliche Abstimmung mit Gudel Werkzeuge'],
      evidenceType: 'service', formIntro: 'Senden Sie uns vier Angaben. Wir klären Tourgebiet, Bedarf und den passenden Einstieg persönlich.'
    },
    pkd: {
      title: 'PKD-Werkzeuge werden bei uns im Haus geschärft.',
      text: 'PKD- und Diamantwerkzeuge bleiben bei Gudel. Bei dringendem Bedarf ist nach vorheriger Abstimmung ein 48-Stunden-Service möglich.',
      image: 'assets/pkd-bearbeitung.jpg', alt: 'PKD-Werkzeug während der Bearbeitung bei Gudel Werkzeuge', label: 'PKD-Bearbeitung · im eigenen Haus',
      benefitIntro: 'Keine Weitergabe an einen externen Werkzeugschleifer. Bearbeitung und Abstimmung bleiben bei Gudel.',
      benefits: [
        ['factory','Im eigenen Haus','Ihre PKD- und Diamantwerkzeuge werden direkt bei Gudel bearbeitet.'],
        ['clock','48 Stunden möglich','Nach Express-Abstimmung von der Abholung bis zur Rücklieferung.'],
        ['truck','Kostenlos abgeholt','Der Hol- und Bringservice ergänzt den Expressauftrag ohne zusätzliche Fahrtkosten.']
      ],
      processIntro: 'Der 48-Stunden-Service gilt innerhalb der Arbeitstage Montag bis Freitag für reguläres Schärfen.',
      steps: [['phone','Express abstimmen','Wir prüfen Werkzeug, Tour und Termin vor der Abholung.'],['truck','Werkzeug abholen','Gudel holt das PKD-Werkzeug direkt bei Ihnen ab.'],['diamond','Im Haus schärfen','Das reguläre Schärfen erfolgt in unserer eigenen Werkstatt.'],['check','Zurückliefern','Das fertig geschärfte Werkzeug kommt innerhalb der abgestimmten 48 Stunden zurück.']],
      evidenceTitle: 'Kurze Wege, weil die Bearbeitung bei uns bleibt.',
      evidenceText: 'Reparaturen an Schneiden und externe Beschichtungen werden separat abgestimmt. Sie gehören nicht zur 48-Stunden-Frist.',
      evidenceList: ['Grundsätzlich für alle PKD-Werkzeuge','48 Stunden nur nach vorheriger Abstimmung','Montag bis Freitag'],
      evidenceType: 'image', evidenceImage: 'assets/pkd-bearbeitung.jpg', formIntro: 'Beschreiben Sie uns im Rückruf kurz das PKD-Werkzeug und den gewünschten Termin.'
    },
    'cnc-komplett': {
      title: 'Messwerte eingeben. Werkzeug einsetzen. Weiterarbeiten.',
      text: 'Wir halten CNC-Werkzeug und Aufnahme als komplette Einheit instand und liefern beides fertig montiert mit Messprotokoll zurück.',
      image: 'assets/maschinenpark.jpg', alt: 'CNC-Werkzeugschleifmaschine bei Gudel Werkzeuge', label: 'Komplettservice · Werkzeug und Aufnahme',
      benefitIntro: 'Sie erhalten keine Einzelteile zurück, sondern ein fertig montiertes und vermessenes Komplettwerkzeug.',
      benefits: [
        ['mount','Komplette Einheit','Für Schrumpf-, Spannzangen- und Hydrodehnspannfutter.'],
        ['balance','Bei Bedarf ausgewuchtet','Das komplette Werkzeug wird ausgewuchtet, wenn es technisch erforderlich ist.'],
        ['document','Messprotokoll dabei','Werkzeuglänge und Werkzeugdurchmesser liegen zur direkten Eingabe vor.']
      ],
      processIntro: 'Prüfung, Bearbeitung, Montage und Vermessung greifen bei Gudel direkt ineinander.',
      steps: [['inspect','Prüfen und reinigen','Wir kontrollieren Werkzeug und Aufnahme und reinigen die Bauteile.'],['grind','Schärfen','Das Werkzeug wird geschärft; eine Beschichtung ist optional über einen Partner möglich.'],['mount','Montieren und wuchten','Wir schrumpfen ein oder montieren mit passendem Drehmoment und wuchten bei Bedarf.'],['measure','Vermessen','Sie erhalten Werkzeuglänge und Durchmesser in einem Messprotokoll.']],
      evidenceTitle: 'Zwei Werte übernehmen. Direkt weiterarbeiten.',
      evidenceText: 'Sie tippen Werkzeuglänge und Werkzeugdurchmesser aus dem Messprotokoll in die Maschine ein. Eine erneute Vermessung oder langwierige Einstellarbeit ist nicht nötig.',
      evidenceList: ['Schrumpffutter','Spannzangenfutter','Hydrodehnspannfutter'],
      evidenceType: 'protocol', formIntro: 'Senden Sie uns Ihre Kontaktdaten. Wir klären Werkzeug, Aufnahme und gewünschten Leistungsumfang im Rückruf.'
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
  document.querySelector('#benefit-intro').textContent = theme.benefitIntro;
  document.querySelector('#process-intro').textContent = theme.processIntro;
  document.querySelector('#evidence-title').textContent = theme.evidenceTitle;
  document.querySelector('#evidence-text').textContent = theme.evidenceText;
  document.querySelector('#form-intro').textContent = theme.formIntro;
  document.querySelector('#campaign-theme').value = themeKey;

  document.querySelector('#benefit-grid').innerHTML = theme.benefits.map(([i,t,x]) => `<article><span class="icon">${icon(i)}</span><h3>${t}</h3><p>${x}</p></article>`).join('');
  document.querySelector('#process-list').innerHTML = theme.steps.map(([i,t,x],n) => `<li><span class="step-icon">${icon(i)}</span><div><small>${String(n+1).padStart(2,'0')}</small><h3>${t}</h3><p>${x}</p></div></li>`).join('');
  document.querySelector('#evidence-list').innerHTML = theme.evidenceList.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('');

  const visual = document.querySelector('#evidence-visual');
  if (theme.evidenceType === 'service') {
    visual.innerHTML = `<div class="mail-demo"><span>${icon('mail')}</span><small>Automatische Tourbenachrichtigung</small><strong>Hallo, wir kommen heute.</strong><p>Bitte legen Sie Ihre Werkzeuge bereit.</p></div><div class="express-badge">${icon('bolt')}<b>Express</b><small>ohne Extrakosten</small></div>`;
  } else if (theme.evidenceType === 'protocol') {
    visual.innerHTML = `<div class="protocol"><span class="sample">MUSTER</span><div class="protocol-head">Gudel Werkzeuge <small>Messprotokoll</small></div><dl><div><dt>Werkzeuglänge</dt><dd>— mm</dd></div><div><dt>Werkzeugdurchmesser</dt><dd>— mm</dd></div><div><dt>Aufnahme</dt><dd>Schrumpf · Spannzange · Hydro</dd></div></dl></div>`;
  } else {
    visual.innerHTML = `<img src="${theme.evidenceImage}" alt="${theme.alt}">`;
  }

  ['utm_source','utm_medium','utm_campaign','utm_content'].forEach(name => { const field=document.querySelector(`#${name}`); if(field) field.value=params.get(name)||''; });

  if (/^\d{5,20}$/.test(String(config.META_PIXEL_ID || ''))) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init',String(config.META_PIXEL_ID)); fbq('track','PageView');
  }

  const form=document.querySelector('.request-form'), status=document.querySelector('#form-status');
  form.addEventListener('submit',async event=>{
    event.preventDefault(); status.className='form-status'; let firstInvalid=null;
    [...form.querySelectorAll('[required]')].forEach(field=>{const invalid=!field.value.trim();field.setAttribute('aria-invalid',String(invalid));if(invalid&&!firstInvalid)firstInvalid=field;});
    if(firstInvalid){status.textContent='Bitte füllen Sie die vier Felder vollständig aus.';status.classList.add('error');firstInvalid.focus();return;}
    const button=form.querySelector('button');button.disabled=true;
    if(config.PREVIEW_MODE||!config.FORM_ENDPOINT){status.textContent='Vorschau erfolgreich – es wurde keine echte Anfrage versendet.';status.classList.add('success');button.disabled=false;return;}
    try{const response=await fetch(config.FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});if(!response.ok)throw new Error();status.textContent='Vielen Dank. Wir melden uns telefonisch bei Ihnen.';status.classList.add('success');if(window.fbq)fbq('track','Lead',{content_name:themeKey});form.reset();}
    catch{status.textContent='Die Anfrage konnte nicht versendet werden. Bitte rufen Sie uns unter 02369 20990-0 an.';status.classList.add('error');}
    finally{button.disabled=false;}
  });
})();
