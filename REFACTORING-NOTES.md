# Frontend Refactoring - GPT Partei Website
## Änderungsdokumentation

### ✅ Phase 1 ABGESCHLOSSEN: Zentrales CSS erstellt

**Datei**: `styles.css` (870 Zeilen)

#### Hauptmerkmale:

1. **Design System mit CSS Variables**
   - 30+ Farb-, Spacing- und Typografie-Variablen
   - Konsistente Border-Radius, Shadows, Transitions
   - Z-Index Scale für Layering
   - Breakpoint-System

2. **Component Library**
   - Navigation (inkl. Mobile Burger-Menü)
   - Hero Sections
   - Buttons (Primary/Secondary)
   - Cards (Standard, Summary, Massnahme)
   - Info/Warning/Success/Error Boxes
   - KPI & Argument Boxes
   - Tabs System
   - Grid System (2/3/4/Auto-Fit)
   - Lists (Custom Style)
   - Source & Glossary References
   - Footer

3. **Accessibility Features**
   - Focus-visible States auf allen interaktiven Elementen
   - ARIA-ready Structure
   - Keyboard Navigation Support
   - Visually-hidden Utility Class
   - High Contrast Ratios

4. **Responsive Design**
   - Mobile-First Approach
   - 3 Breakpoints: 1024px, 768px, 480px
   - Burger-Menü für Mobile
   - Flexible Grids
   - Responsive Typography

5. **Print Optimization**
   - Navigation/Footer ausgeblendet
   - Optimierte Farben für Druck
   - Page-Break-Inside: avoid für Cards
   - Unterstriche bei Links

---

### 🔄 Phase 2 IN ARBEIT: JavaScript Modul

**Geplante Datei**: `main.js`

#### Funktionen:

```javascript
// Navigation Toggle
function toggleNav()

// Tab System
function initTabs(tabsSelector)
function switchTab(tabId)

// Punkt Navigation (Parteipunkte)
function initPunktNav()
function showPunkt(punktId)

// Detail Toggle (Finanzierung)
function toggleDetail(element)

// Smooth Scroll
function smoothScrollTo(target)

// Init All
document.addEventListener('DOMContentLoaded', initAll)
```

---

### 📋 Phase 3 GEPLANT: HTML Refactoring

#### 3.1 Index/Startseite (GPT_Partei_Website.html)

**Zu ändern:**
- [ ] `<link rel="stylesheet" href="styles.css">` einbinden
- [ ] Inline-Styles entfernen
- [ ] Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] Logo: `alt="Logo der GPT Partei"`
- [ ] Navigation: `.nav-container` + `.nav-links` + `.nav-toggle`
- [ ] Hero-Section mit `.hero` Class
- [ ] Cards mit `.card` statt custom Inline-Styles
- [ ] Footer hinzufügen: "GPT Partei • Schulprojekt • Stand 2025"

**Struktur:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GPT Partei - Programm</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav>
        <div class="nav-container">
            <img src="GptLogo.jpg" alt="Logo der GPT Partei" class="logo-nav">
            <button class="nav-toggle" aria-label="Navigation öffnen">☰</button>
            <ul class="nav-links">
                <li><a href="index.html" class="active">Start</a></li>
                <li><a href="Parteipunkte_Detail.html">Programm</a></li>
                <li><a href="Finanzierung.html">Finanzierung</a></li>
                <li><a href="Parteimitglieder.html">Team</a></li>
            </ul>
        </div>
    </nav>
    
    <section class="hero">
        <h1>GPT Partei</h1>
        <p>Gemeinschaft · Progress · Tatkraft</p>
    </section>
    
    <main class="container">
        <!-- Content -->
    </main>
    
    <footer>
        <p>GPT Partei · Schulprojekt · Stand 2025</p>
    </footer>
    
    <script src="main.js" defer></script>
</body>
</html>
```

---

#### 3.2 Parteipunkte_Detail.html

**Zu ändern:**
- [ ] Auf `styles.css` umstellen
- [ ] Punkt-Navigation: Grid mit `grid-auto` Class
- [ ] Detail-Cards: Semantic `<article>` statt `<div>`
- [ ] Section-Header: `<h2>` statt `<h3>`
- [ ] Maßnahmen: `.massnahmen-grid` + `.massnahme-card`
- [ ] JavaScript vereinfachen:
  ```javascript
  function showPunkt(nummer) {
      // Alle Cards verstecken
      document.querySelectorAll('.detail-card').forEach(c => c.classList.remove('active'));
      // Alle Nav-Items deaktivieren
      document.querySelectorAll('.punkt-nav-item').forEach(i => i.classList.remove('active'));
      // Ausgewählte aktivieren
      document.getElementById(`punkt-${nummer}`).classList.add('active');
      document.querySelector(`[data-punkt="${nummer}"]`).classList.add('active');
  }
  ```
- [ ] ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`

---

#### 3.3 Finanzierung.html

**Zu ändern:**
- [ ] Auf `styles.css` umstellen
- [ ] Daten in JS Arrays auslagern:
  ```javascript
  const phase1Ausgaben = [
      { id: 1, name: 'Bildung', amount: 10, detail: '...' },
      // ...
  ];
  ```
- [ ] Summen automatisch berechnen:
  ```javascript
  const totalAusgaben = phase1Ausgaben.reduce((sum, item) => sum + item.amount, 0);
  ```
- [ ] Phase-Tabs: `.tabs` + `.tab` Classes
- [ ] Summary-Cards: `.summary-card` mit `.ausgaben`/`.einnahmen`
- [ ] Cost-Rows: Semantic `<table>` mit `<thead>`, `<tbody>`
- [ ] Toggle-Details: ARIA `aria-expanded`, `aria-controls`

---

#### 3.4 Parteibogen_Final.html

**Zu ändern:**
- [ ] Auf `styles.css` umstellen
- [ ] Print-spezifische Styles nutzen
- [ ] Semantic Sections: `<section id="präambel">`, etc.
- [ ] A4-Layout: CSS `@page { size: A4; margin: 2cm; }`
- [ ] Überschriften-Hierarchie prüfen
- [ ] Unnötige Navigation entfernen

---

#### 3.5 Parteimitglieder.html

**Zu ändern:**
- [ ] Auf `styles.css` umstellen
- [ ] Team-Grid: `.grid-auto`
- [ ] Profile-Cards: `.card` mit `.card-header`, `.card-body`
- [ ] Bilder: `loading="lazy"`, `alt` Texte
- [ ] ARIA: `role="img"` bei dekorativen Elementen

---

### 🎯 Prioritätenliste (Nächste Schritte)

1. **Höchste Priorität**
   - [ ] `main.js` erstellen
   - [ ] Index.html refactoren
   - [ ] Parteipunkte_Detail.html refactoren

2. **Mittlere Priorität**
   - [ ] Finanzierung.html refactoren
   - [ ] Parteimitglieder.html refactoren

3. **Niedrige Priorität**
   - [ ] Parteibogen_Final.html refactoren
   - [ ] Alte Versionen aufräumen (Finanzierung_alt.html, Finanzierung_backup.html)

---

### 📊 Metriken & Verbesserungen

#### Vorher:
- 8 HTML-Dateien mit jeweils 70-200 Zeilen inline CSS
- Duplikate CSS: ~5.000 Zeilen gesamt
- Keine einheitliche Navigation
- Keine Mobile-Menü
- Inkonsistente Farben/Abstände
- Schlechte A11y (keine Focus-States, ARIA fehlt)

#### Nachher (Ziel):
- 1 zentrales CSS (870 Zeilen)
- 1 zentrales JS (~200 Zeilen)
- 8 semantische HTML-Dateien (~50% kleiner)
- Konsistentes Design
- Vollständig responsive
- WCAG 2.1 AA konform
- Wartbar & erweiterbar

---

### 🧪 Testing Checklist

- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Edge Desktop
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Screenreader (NVDA/JAWS)
- [ ] Keyboard Navigation
- [ ] Print Preview
- [ ] Lighthouse Score (Target: >90)

---

### 📚 Weitere Dokumentation

Siehe:
- `STYLE-GUIDE.md` - Design System Dokumentation
- `styles.css` - Kommentierte Styles
- `main.js` - Kommentierte Funktionen

---

### 💡 Wartungshinweise

**CSS anpassen:**
1. Farben: Nur in `:root` CSS Variables ändern
2. Spacing: `--space-*` Variables nutzen
3. Neue Components: Im entsprechenden Abschnitt in `styles.css` hinzufügen

**HTML anpassen:**
1. Semantic HTML nutzen
2. Classes aus `styles.css` verwenden
3. Keine Inline-Styles
4. ARIA-Attribute nicht vergessen

**JavaScript anpassen:**
1. Event-Delegation nutzen
2. Generische Funktionen bevorzugen
3. `data-*` Attribute für State
4. Kommentare hinzufügen

---

**Version**: 2.0-beta
**Datum**: 2025-11-30
**Autor**: Frontend Refactoring Team
