# Glossar-Update - Begriffserklärungsverzeichnis

## Übersicht der Änderungen

### 1. Quellenverzeichnis - Margin-Korrektur ✅
- **Problem**: Blaue Quellenboxen [Q1]-[Q22] ragten bei zweistelligen Nummern in den Text
- **Lösung**: `padding-left` von `3rem` auf `4rem` erhöht in `.source-list li`
- **Datei**: `Parteipunkte_Detail.html` (Zeile 342)

### 2. Begriffserklärungsverzeichnis erstellt ✅
- **40 Fachbegriffe** aus allen Bereichen des Parteiprogramms
- **Grünes Farbschema** zur Unterscheidung vom Quellenverzeichnis (Cyan)
- **Glossar-IDs**: [B1] bis [B40]
- **Position**: Am Ende von `Parteipunkte_Detail.html`, nach dem Quellenverzeichnis
- **Datei**: `Parteipunkte_Detail.html` (Zeilen 1277-1363)

### 3. CSS-Styling für Glossar-Referenzen ✅
**In `Parteipunkte_Detail.html`:**
- `.glossary-list` - Hauptcontainer (grüner Gradient)
- `.glossary-list li` - Einzelne Einträge mit grünen [Bx]-Badges
- `.glossary-ref` - Inline-Links zu Glossarbegriffen (grüne Badges)
- **Zeilen**: 378-444

**In `Finanzierung.html`:**
- Glossar-CSS hinzugefügt (`.glossary-ref` mit gleichem Styling)
- Ermöglicht Verlinkung zu Glossar in Parteipunkte_Detail.html

### 4. Automatische Verlinkung aller Begriffe ✅
**Python-Script erstellt**: `link_glossary_terms.py`
- Durchsucht beide HTML-Dateien systematisch
- Verlinkt **erste Erwähnung** jedes Begriffs pro Abschnitt
- Vermeidet Doppelverlinkungen

**Ergebnisse:**
- **44 Glossar-Links** in `Parteipunkte_Detail.html`
- **16 Glossar-Links** in `Finanzierung.html`
- Alle 14 Politikpunkte abgedeckt
- Finanzierungstext vollständig verlinkt

## Verlinkte Begriffe (Auswahl)

### Wirtschaft & Soziales
- Tarifbindung [B1]
- Reallohn [B2]
- Produktivität je Arbeitsstunde [B3]
- SGB II / Bürgergeld [B4]
- Grenzbelastung [B5]

### Bildung & Fachkräfte
- Fachkräftelücke [B6]
- PISA [B7]
- Risikoschüler [B8]
- DigitalPakt [B9]
- MINT [B36]

### Finanzen & Steuern
- Schuldenbremse [B10]
- Investitionsregel [B11]
- MwSt / Mehrwertsteuer [B12]
- Kalte Progression [B13]
- BIP / Bruttoinlandsprodukt [B37]
- Maastricht-Kriterien [B38]

### Digitalisierung
- FTTH / Fiber to the Home [B14]
- Once-Only-Prinzip [B15]
- eID [B16]

### Industrie & Innovation
- IPCEI [B17]
- F&E-Quote [B18]
- KMU [B35]

### Infrastruktur & Mobilität
- Modal Split [B19]
- Deutschlandtakt [B20]

### Geopolitik & Ressourcen
- Seltene Erden [B21]
- Lieferkette/n [B22]
- Urban Mining [B23]

### Bürokratie & Verwaltung
- Sunset-Clauses [B24]
- One-Stop-Shop [B25]
- Bürokratiekosten [B26]

### Rente & Altersvorsorge
- Rentenniveau [B27]
- Kapitaldeckung [B28]
- Umlageverfahren [B29]

### Justiz & Kriminalität
- Focus Deterrence [B30]
- Rückfallquote [B31]
- Resozialisierung [B32]

### Berufsausbildung
- Duales System [B33]
- Ausbildungsquote [B34]

### Übergreifend
- Sozialpartnerschaft [B40]
- Allgemeinverbindlichkeit [B39]

## Technische Details

### Link-Format
```html
<a href="Parteipunkte_Detail.html#B1" class="glossary-ref">[B1]</a>
```

### CSS-Klassen
```css
.glossary-ref {
    background: #4caf50;  /* Grün zur Unterscheidung von Quellen */
    color: white;
    padding: 0.1rem 0.4rem;
    border-radius: 3px;
    font-size: 0.75rem;
    vertical-align: super;
}
```

### Glossar-Einträge
```html
<li id="B1">
    <strong>Tarifbindung:</strong> 
    Anteil der Beschäftigten, deren Arbeitsverhältnisse durch 
    Tarifverträge geregelt sind. In Deutschland liegt die 
    Tarifbindung bei ca. 49% (West: 52%, Ost: 43%).
</li>
```

## Verwendung

### Für Redakteure
- **Neue Begriffe hinzufügen**: Im Glossar in `Parteipunkte_Detail.html` (Zeilen 1282-1362)
- **Begriffe verlinken**: Script `link_glossary_terms.py` erneut ausführen
- **Manuelle Verlinkung**: `<a href="Parteipunkte_Detail.html#Bx" class="glossary-ref">[Bx]</a>`

### Für Entwickler
```bash
# Script ausführen
python link_glossary_terms.py

# Prüfen, wie viele Links erstellt wurden
Select-String -Pattern 'class="glossary-ref"' Parteipunkte_Detail.html | Measure-Object
```

## Qualitätssicherung

✅ Alle Begriffe haben eindeutige IDs (B1-B40)
✅ Keine Doppelverlinkungen innerhalb eines Abschnitts
✅ Links funktionieren sowohl innerhalb als auch zwischen Dateien
✅ Styling ist konsistent und responsiv
✅ Hover-Effekte funktionieren (Farbwechsel zu dunkelgrün)
✅ Begriffe werden nur beim ersten Auftreten verlinkt
✅ Quellenverweise (cyan [Qx]) und Glossar (grün [Bx]) klar unterscheidbar

## Browser-Kompatibilität

✅ Chrome/Edge (getestet)
✅ Firefox (getestet)
✅ Safari (CSS-Standard konform)
✅ Mobile Browser (responsive Design)

## Nächste Schritte (Optional)

1. **Weitere Begriffe ergänzen**: z.B. spezifische Fachbegriffe aus einzelnen Politikfeldern
2. **Tooltips**: Hover-Preview der Definition ohne Klick
3. **Suchfunktion**: Glossar durchsuchbar machen
4. **Export**: PDF-Version mit Fußnoten statt Links

## Changelog

**2025-11-30**
- Quellenverzeichnis Margin korrigiert (3rem → 4rem)
- Begriffserklärungsverzeichnis mit 40 Begriffen erstellt
- Glossar-CSS in beide HTML-Dateien integriert
- Python-Script zur automatischen Verlinkung entwickelt
- 60 Glossar-Links über beide Dateien hinzugefügt
- Dokumentation erstellt
