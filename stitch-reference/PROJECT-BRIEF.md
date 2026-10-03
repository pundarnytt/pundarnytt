# Projektbrief & PRD: Pundarnytt (Oberoende Broadsheet)

## 1. Sammanfattning & Vision (Executive Summary)
**Pundarnytt** är en svensk digital nyhetsplattform och morgontidning som kombinerar genuin, hårdkokt lokaljournalistik och reportage med torr satir, kåserier, debatt och skönlitterära följetonger. 

Tidningen bygger på premissen: **»Oberoende. Obekvämt. Obehandlat.«**
Den redaktionella och visuella kärnidén är:
> *»En etablerad skandinavisk morgontidning (broadsheet) som har blivit varsamt saboterad av sin egen redaktion.«*

Målet är att läsarens första reaktion ska vara: *»Det här ser ut som Dagens Nyheter eller Svenska Dagbladet...«* – för att några sekunder senare slås av: *»...vänta, vad i helvete är det jag läser?«*

---

## 2. Visuella Riktlinjer & Designsystem (Visual Identity)

### Balans (The 90/10 Rule)
- **90 % Seriös skandinavisk morgontidning:** Hög redaktionell pondus, klassiskt fler-kolumners rutnät (broadsheet grid), tidningslinjer (hairlines/double rules), typografisk hierarki i världsklass, dämpat obestruket tidningspapper som bakgrund.
- **10 % Subversiv gatukultur/underjord:** Diskreta detaljer inspirerade av svenska källarförråd, stencilmärken, röda juriststämplar, maskinskrivna arkivkoder, elskåpsklistermärken, cykelnycklar och kopierade zines.

### Förbjudna Klichéer (Negative Constraints)
- **INGEN** förhärligande av missbruk, våld eller utsatthet.
- **INGA** stereotyper: inga cannabisblad, sprutor, piller, dödskallar, neongröna färger, biohazard-symboler eller »420«-estetik.
- **INGA** generiska SaaS-kort (cards), runda färgglada knappar eller lekfulla tech-ikoner. Det är en *tidning*, inte en webbapp eller tech-blogg.

### Typografi & Färgskala
- **Display / Rubriker:** Klassisk antikva/serif med auktoritet (*Newsreader / Georgia / Times-stil*), från 60pt för toppnyhet ned till 16pt för notiser.
- **Brödtext & Notiser:** Läsbar serif med klassisk tidningsavstavning, anfang (drop caps) och spaltbrytning.
- **Metadata & Navigering:** Ren, stram sans-serif (arkivkoder, bylines, datum, upplaga).
- **Färgpalett:**
  - Pappersbas: `#fdf9ef` (varmt, obestruket tidningspapper) / `#dddad0` (mörkare tidningsarkiv)
  - Bläck: `#121314` (nästan rent svart trycksvärta)
  - Accent/Stämpel: `#b91c1c` / `#991b1b` (torkat stämpelbläck, röd juristmarkering, varningsstämplar)

---

## 3. Informationsarkitektur & Artikeltyper

Plattformen kategoriserar innehåll i sex strikta artikeltyper, där transparensen kring fiktion är absolut:

| Kategori | Syfte & Ton | Visuell Markering |
| :--- | :--- | :--- |
| **NYHET** | Saklig, rapp lokalrapportering om kommunal byråkrati, låsbyten och fastighetsfrågor. | Minimal sektionsetikett i versaler, tidstämpel. |
| **REPORTAGE** | Djuplodande granskningar av underjordiska miljöer, förrådsgångar och mikrosamhällen. | Anslående rubrik, anfang, tvåspalt, foto med arkiv-caption. |
| **INTERVJU** | Samtal med lokala profiler, nattvandrare och stammisar på pressbyråer. | Citatrubrik (»...«), utskriftsband-kod (t.ex. *UTSKRIFT BAND 4*). |
| **DEBATT** | Insändare från boende i förorten, tvättstugestridigheter, bytesekonomi. | Byline med anonym debattör, klassisk insändarspalt. |
| **SATIR** | Torr, absurd samhällssatir skriven med fullständigt gravallvarlig ton. | **Obligatorisk röd stämpelram:** `[ SATIR ] FIKTIV TEXT FÖR UNDERHÅLLNINGSÄNDAMÅL`. |
| **FIKTION** | Underjordisk prosaserie, följetonger och noveller om vardagsmysterier. | **Obligatorisk ram:** `[ FIKTION & NOVELL ] UNDERJORDISK PROSASERIE (KAPITEL X AV Y)`. |

---

## 4. Sid- & Funktionsomfång (Core Features & Screens)

### 1. Förstasidan (Morgonupplagan / Hem) — *Levererad (Desktop)*
- **Header:** Datum, väder, upplagesiffra (`14.892`), styckpris (`38 SEK`), masthead och navigering.
- **Telegram:** Löpande ticker med akuta händelser i förorterna.
- **Huvudnyhet (Lead):** Stor dominant artikel med bild, ingress och citatblänkare.
- **Sekundärspalt:** Intervjuer, snabba kommunalnyheter, avgränsade satir- och fiktionssektioner.
- **Senaste Nytt & Notiser:** Fyrspaltig notisavdelning (blåljus, kulturrecensioner av elskåp, kollektivtrafik).
- **Planket (Klassiska radannonser):** Bytesmarknad för hylsnycklar, försvunna källarnycklar, varningar om grovsoprum.
- **Krypterat Tipsforum:** Diskret länk för anonyma tips rörande fastighetsbolag och låsbyten.
- **Kolofon & Redaktion:** Komplett ansvarig utgivare, redaktionsinfo och tryckspecifikation.

### 2. Artikelsida / Läsläge (Longread Template) — *Kommande fas*
- Ren tidningsläsning med fokus på typografi och dokumentärt bildmaterial.
- Redaktionellt arkivnummer, datum och juridisk friskrivning.
- Kommentarer utformade som "Källarvägg / Klotterplank" eller klassiska insändare.

### 3. Mobilanpassning (Mobile Broadsheet) — *Kommande fas*
- Översättning av broadsheet-rutnätet till ett vertikalt flöde utan att förlora tidningskänslan eller stämpeldetaljerna.

### 4. "Planket" / Radannonser (Klassificerat) — *Kommande fas*
- Interaktiv sida för lokal byteshandel, efterlysningar av borttappade källarnycklar och cykeldelar.

---

## 5. Målgrupp & Användarupplevelse
- **Primär målgrupp:** Läsare som uppskattar skandinavisk satir, grävande lokaljournalistik, subkultur och designintresserade som tröttnat på homogena digitala nyhetssajter.
- **Tonfall:** Formellt, allvarligt, sakligt och byråkratiskt – humorn uppstår uteslutande ur situationernas absurditet och kontrasten till den eleganta formgivningen.
