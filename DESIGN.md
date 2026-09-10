# Designsystem – Gudel Regionaler Schärfdienst

## Aufgabe und Richtung

Die Landingpage führt gewerbliche Betriebe durch den vollständigen Schärfkreislauf: Abholen, Schärfen, Informieren und Zurückbringen. Sie ist eine bilddominante Kampagnenseite ohne Hauptnavigation. Eine reale Werkstattaufnahme und die kampagnenabhängige Aussage bestimmen den ersten Bildschirm; die primäre Handlung ist immer die Anfrage zur Abholung.

## Aufbau

Das gemeinsame Template hat acht Hauptbereiche in fester Reihenfolge:

1. Hero mit Kampagnenaussage, vier festen Nutzenpunkten, realem Gudel-Bild und CTA „Schärfdienst testen“
2. vier Schritte des Ablaufs mit CTA „Abholung anfragen“
3. sechs konkrete Vorteile unter „Warum Gudel?“
4. sachlich gekennzeichneter Social-Proof-Platzhalter, bis echte freigegebene Bewertungen vorliegen
5. sechs Werkzeuggruppen mit lokalen, realen Bildern
6. schematische Regionsgrafik für Ruhrgebiet, Münsterland und Niederrhein mit Hinweis, dass keine exakten Tourgrenzen dargestellt werden
7. gemeinsames Foto und getrennte Rollen von Jan Bernd Gudel und Christian Gudel
8. Abschluss mit fünf Pflichtfeldern und CTA „Abholung anfragen“

## Kampagnenvarianten

Der Parameter `thema` steuert H1, Einleitung, Hero-Bild und Bildbeschriftung. Unterstützt werden:

- `zuverlässigkeit` sowie Alias `service`
- `abholservice`
- `touren`
- `express`
- `regional`
- `digital`

Unbekannte Werte fallen auf `zuverlässigkeit` zurück. UTM-Felder und Kampagnenwert werden im Formular weitergereicht.

## Farben und Material

- Gudel-Orange `#ff9d2e`: Prozessfläche, CTA, Markierungen und ausgewählte Werkzeugbeschriftungen
- dunkles Orange `#8a3d00`: kontrastreiche Hinweistexte auf hellen Flächen
- Werkstatt-Anthrazit `#1d2328`: Belegflächen, Formular, dunkle Bedienelemente
- Hellgrau `#f2f3f3`: Seitenfläche und ruhige technische Hintergründe
- Weiß `#ffffff`: Inhaltsflächen und Werkzeugfreisteller
- Liniengrau `#d6d8d9`: Trennung ohne zusätzliche Kartenoptik

Die Formsprache nutzt kompakte Radien von 8 bis 14 Pixeln. Nur Aktionsflächen sind pillenförmig. Flächige Schatten bleiben auf interaktive Aktionen begrenzt.

## Typografie

- DM Sans Gudel, lokal als `dm-sans-medium.woff2`, für Überschriften, Namen und Bedienelemente
- Jost Gudel, lokal als `jost-regular.woff2`, für Fließtext und Formulartexte
- direkte Überschriften ohne Kicker
- kurze Absätze und klar getrennte Fakten für schnelles Scannen

## Bildsystem und Regionsgrafik

Alle Rasterbilder liegen lokal in `assets/`; Quelle, Transformation und Prüfsumme stehen in `assets/provenance.json`. Bilder zeigen Gudel-Mitarbeiter, eigene Fertigung und konkrete Werkzeuge. Der Social-Proof-Bereich enthält bewusst keine Zitate, Sterne, Logos oder Kennzahlen.

Die Regionsgrafik ist eine im Markup enthaltene Vektorgrafik. Ihre Flächen sind absichtlich schematisch und werden sowohl sichtbar als auch im Alternativtext als unverbindliche Darstellung gekennzeichnet.

## Responsive Verhalten

Die Umsetzung ist mobile-first. Bei 390 Pixeln steht das Hero-Bild über der Aussage; vier Nutzenpunkte bilden ein kompaktes Zweispaltenraster, damit der Hero-CTA vollständig im ersten 844-Pixel-Viewport liegt. Werkzeugbilder bleiben in einem lesbaren Zweispaltenraster. Prozess, Vorteile, Kontakte und Formular werden linear gestapelt.

Ab 720 Pixeln wechselt der Inhalt in breitere Raster. Ab 1050 Pixeln nutzt der Hero zwei asymmetrische Spalten, die Werkzeugübersicht sechs Spalten und Ansprechpartner, Regionsgrafik sowie Formular jeweils eine klare Zweiteilung. Es gibt keinen horizontalen Überlauf.

## Formulare und Zugänglichkeit

Die Pflichtfelder sind Firma, Ansprechpartner, PLZ / Ort, Telefon und E-Mail. Leere oder formal ungültige Felder erhalten `aria-invalid`; die erste fehlerhafte Eingabe wird fokussiert. Der Fokus auf der anthrazitfarbenen Formularfläche hat einen 3-Pixel-Orange-Ring mit Abstand. Statusmeldungen werden über `role="status"` ausgegeben. Im Preview-Modus bestätigt die Seite die Prüfung, versendet aber keine Anfrage.

## Motion

Die Seite nutzt nur kurze Zustandswechsel an CTA. Unter `prefers-reduced-motion: reduce` werden diese Übergänge abgeschaltet und weiches Scrollen deaktiviert. Der vollständige Inhalt bleibt ohne Animation sichtbar.
