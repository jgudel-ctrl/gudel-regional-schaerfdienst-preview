# Gudel Werkzeuge – regionaler Schärfdienst

Separate statische Landingpage für regionale Meta-Kampagnen.

## Vorschau starten

```bash
python3 -m http.server 4173
```

Dann `http://127.0.0.1:4173` öffnen.

## Vor dem Livegang

In `config.js` nur diese Werte eintragen:

```js
window.GUDEL_CONFIG = {
  META_PIXEL_ID: "PIXEL-ID",
  FORM_ENDPOINT: "HTTPS-ENDPUNKT-FUER-E-MAIL-VERSAND",
  PREVIEW_MODE: false
};
```

Zusätzlich:

1. Formular-Endpunkt mit echter Testanfrage prüfen.
2. Empfänger `schaerfen.de@gudel-werkzeuge.de` serverseitig konfigurieren.
3. Meta-Pixel `PageView` und `Lead` mit Meta Pixel Helper/Test Events prüfen.
4. Datenschutztext um den eingesetzten Formular- und Hostinganbieter ergänzen.
5. In `index.html` den Meta-Robots-Wert von `noindex, nofollow` nur dann ändern, wenn die Seite indexiert werden soll.
6. DNS für `schaerfdienst.gudel-werkzeuge.de` auf den späteren Host zeigen lassen.

## Tracking

- UTM-Parameter werden aus der URL übernommen und während der Sitzung gespeichert.
- `PageView` wird nach gültiger Pixel-ID ausgelöst.
- `Lead` wird nur nach erfolgreicher Antwort des Formular-Endpunkts ausgelöst.
- Im Vorschaumodus werden keine echten Leads oder Meta-Lead-Events gesendet.

## Medien

Alle genutzten Dateien liegen physisch unter `assets/`. Herkunft und Prüfsummen stehen in `assets/provenance.json`.
