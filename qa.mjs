import { chromium } from '/home/hermes/.npm/_npx/fd3bca3c548369c0/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const failures = [];
const consoleErrors = [];
const check = (ok, message) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${message}`);
  if (!ok) failures.push(message);
};

await mkdir('.impeccable/review', { recursive: true });

const campaigns = {
  zuverlässigkeit: 'Ein Schärfdienst, auf den Ihre Werkstatt planen kann.',
  service: 'Ein Schärfdienst, auf den Ihre Werkstatt planen kann.',
  abholservice: 'Wir holen Ihre Werkzeuge ab. Schärfen sie. Und bringen sie zurück.',
  touren: 'Wir kommen, bevor die stumpfen Werkzeuge zum Problem werden.',
  express: 'Stumpf rein. Scharf zurück. Ohne lange Wartezeiten.',
  regional: 'Ihr Schärfdienst fährt bereits durch Ihre Region.',
  digital: 'Nicht mehr hinter Ihren Werkzeugen hertelefonieren.'
};

for (const [theme, expectedH1] of Object.entries(campaigns)) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(`${theme}: ${message.text()}`);
  });
  page.on('pageerror', error => consoleErrors.push(`${theme}: ${error.message}`));
  const response = await page.goto(`${baseURL}?thema=${encodeURIComponent(theme)}`, { waitUntil: 'networkidle' });
  check(response?.status() === 200, `${theme}: HTTP 200`);
  check((await page.locator('h1').textContent())?.trim() === expectedH1, `${theme}: H1 korrekt`);
  check(await page.locator('.hero-benefits li').count() === 4, `${theme}: vier Hero-Nutzenpunkte`);
  check(await page.locator('main > section').count() === 8, `${theme}: acht Hauptbereiche`);
  const order = await page.locator('main > section').evaluateAll(sections => sections.map(section => section.id));
  check(order.join('|') === 'hero|ablauf|warum|stimmen|leistungen|regionen|ansprechpartner|anfrage', `${theme}: Hauptbereiche in freigegebener Reihenfolge`);
  check(await page.locator('#ablauf .process-step').count() === 4, `${theme}: vier Prozessschritte`);
  check(await page.locator('#warum .reason').count() === 6, `${theme}: sechs Warum-Gudel-Vorteile`);
  check(await page.locator('#stimmen .proof-placeholder').count() === 1, `${theme}: ehrlicher Social-Proof-Platzhalter`);
  check((await page.locator('#stimmen').innerText()).includes('Echte Bewertungen werden noch ergänzt'), `${theme}: keine erfundene Bewertung`);
  check(await page.locator('#leistungen .tool').count() === 6, `${theme}: sechs Werkzeuggruppen`);
  check(await page.locator('#leistungen .tool img').count() === 6, `${theme}: sechs Werkzeugbilder`);
  check(await page.locator('#regionen .region-map').count() === 1, `${theme}: Regionsgrafik vorhanden`);
  const regionText = await page.locator('#regionen').innerText();
  check(['Ruhrgebiet', 'Münsterland', 'Niederrhein'].every(region => regionText.includes(region)), `${theme}: drei Regionen genannt`);
  check(await page.locator('#ansprechpartner .person').count() === 2, `${theme}: beide Ansprechpartner`);
  check(await page.locator('a.cta[href="#anfrage"]').count() === 3, `${theme}: drei wiederholte CTA-Ziele`);
  check(await page.locator('#anfrage input[required]').count() === 5, `${theme}: fünf Formular-Pflichtfelder`);
  check(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), `${theme}: Bilder geladen`);
  const width = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  check(width.scroll <= width.client, `${theme}: kein horizontaler Überlauf`);
  await page.close();
}

for (const [name, width, height, screenshot] of [
  ['desktop', 1440, 1100, '.impeccable/review/desktop.png'],
  ['mobile', 390, 844, '.impeccable/review/mobile.png']
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(`${name}: ${message.text()}`);
  });
  page.on('pageerror', error => consoleErrors.push(`${name}: ${error.message}`));
  await page.goto(`${baseURL}?thema=zuverl%C3%A4ssigkeit&utm_source=qa&utm_campaign=nachtlauf`, { waitUntil: 'networkidle' });
  const viewport = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  check(viewport.scroll <= viewport.client, `${name}: kein horizontaler Überlauf`);
  check(await page.locator('main > section').evaluateAll(sections => sections.every(section => {
    const box = section.getBoundingClientRect();
    return box.width > 0 && box.height > 0;
  })), `${name}: alle Hauptbereiche sichtbar`);
  check(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), `${name}: Bilder geladen`);
  check(await page.locator('a[href="tel:+492369209900"]').count() === 2, `${name}: Telefonlinks korrekt anwählbar`);
  if (name === 'mobile') {
    const heroCta = await page.locator('#hero .cta').boundingBox();
    check(Boolean(heroCta && heroCta.y + heroCta.height <= height), 'mobile: Hero-CTA im ersten Bildschirm');
  }
  await page.screenshot({ path: screenshot, fullPage: true });

  if (name === 'mobile') {
    await page.locator('button[type="submit"]').click();
    check(await page.locator('[aria-invalid="true"]').count() === 5, 'Formular: fünf Pflichtfelder werden validiert');
    check((await page.locator('#form-status').textContent())?.includes('fünf Pflichtfelder'), 'Formular: verständliche Fehlermeldung');
    await page.locator('#company').fill('Mustertischlerei');
    await page.locator('#contact-person').fill('Max Mustermann');
    await page.locator('#place').fill('46286 Dorsten');
    await page.locator('#phone').fill('02369 123456');
    await page.locator('#email').fill('keine-adresse');
    await page.locator('button[type="submit"]').click();
    check(await page.locator('#email[aria-invalid="true"]').count() === 1, 'Formular: E-Mail-Format wird validiert');
    await page.locator('#email').fill('max@example.de');
    await page.locator('button[type="submit"]').click();
    check((await page.locator('#form-status').textContent())?.includes('Vorschau erfolgreich'), 'Formular: Preview-Modus versendet nicht');
    check(await page.locator('#campaign-theme').inputValue() === 'zuverlässigkeit', 'Formular: Kampagnenfeld erhalten');
    check(await page.locator('#utm_source').inputValue() === 'qa', 'Formular: Tracking-Feld erhalten');
  }
  await page.close();
}

check(consoleErrors.length === 0, 'keine Browser- oder Konsolenfehler');
if (consoleErrors.length) console.error(consoleErrors.join('\n'));
await browser.close();
if (failures.length) {
  console.error(`\n${failures.length} Prüfung(en) fehlgeschlagen.`);
  process.exit(1);
}
console.log('\nAlle Prüfungen bestanden.');
