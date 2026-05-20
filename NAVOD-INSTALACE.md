# Návod: instalace na tablet, telefon nebo počítač

Aplikace funguje jako **PWA (Progressive Web App)** — jde si ji nainstalovat na plochu zařízení a vypadá pak jako nativní aplikace. Žádný App Store, žádný Google Play, žádný instalační soubor.

**Předpoklad:** aplikace běží na HTTPS adrese (např. GitHub Pages: `https://{tvuj-github-username}.github.io/skolni-bezpecnost/`).

---

## iPad / iPhone (Safari)

1. Otevři adresu aplikace v **Safari** (musí být Safari, ne Chrome).
2. Klepni na ikonu **Sdílet** (čtvereček s šipkou nahoru) v dolním panelu.
3. V seznamu sjeď dolů a klepni na **Přidat na plochu**.
4. Pojmenuj zástupce (nebo nech výchozí "Školní bezpečnost") a klepni **Přidat**.

Na ploše se objeví ikona se štítem v tmavě modré. Klepnutím se aplikace otevře **bez prohlížečové lišty** — vypadá jako nativní aplikace.

---

## Android (Chrome)

1. Otevři adresu aplikace v **Chrome**.
2. Chrome ti sám nabídne lištu **„Přidat Školní bezpečnost na plochu"** — klepni na ni.
3. Pokud lišta nepřišla, klepni na **třítečkové menu** vpravo nahoře → **Nainstalovat aplikaci**.
4. Potvrď.

Ikona je na ploše. Otevírá se bez prohlížeče.

---

## Surface tablet / Windows počítač (Edge nebo Chrome)

1. Otevři adresu aplikace v **Edge** nebo **Chrome**.
2. V adresním řádku vpravo se objeví ikona **+** (nebo monitor s šipkou).
3. Klikni na ni → **Nainstalovat**.
4. Potvrď.

Aplikace se přidá do **Start menu** a otevírá se ve vlastním okně, ne v prohlížeči.

---

## Mac (Safari nebo Chrome)

### Safari (macOS Sonoma 14+)

1. Otevři aplikaci v Safari.
2. Menu **Soubor** → **Přidat do Docku**.

### Chrome / Edge

1. Klikni na ikonu **+** v adresním řádku → **Nainstalovat**.

Ikona se objeví v Docku jako kterákoli jiná aplikace.

---

## Co PWA umí

- **Otevírá se bez prohlížeče** — vypadá jako nativní aplikace.
- **Funguje offline** (částečně) — UI se načte i bez internetu z lokální cache. Ale **bezpečnostní data** vyžadují internet (volá Microsoft Graph API).
- **Automaticky se aktualizuje** — při spuštění s internetem si stáhne novou verzi, žádné ruční update.
- **Nezabírá místo** — instalace je jen pár MB (kód aplikace, ne data).

## Co PWA neumí (a to je dobře)

- **Nemůže běžet na pozadí** — žádné notifikace, žádné automatické skenování každou hodinu. Pokud to budeš chtít, musí se otevřít aplikace.
- **Nemá přístup k systémovým funkcím** — nečte soubory na zařízení, nepouští se při startu, nemá přístup ke kontaktům.

To není bug, to je feature — PWA je **bezpečnější** než nativní aplikace, protože běží v sandboxu prohlížeče.

---

## Odinstalace

### iPad/iPhone
Stiskni a podrž ikonu → **Odebrat aplikaci** → **Smazat aplikaci**.

### Android
Stiskni a podrž ikonu → **Odinstalovat**.

### Windows
Start menu → najdi aplikaci → pravé tlačítko → **Odinstalovat**.

### Mac
Dock → pravé tlačítko na ikonu → **Možnosti** → **Odebrat z Docku** (Safari verze).
Pro Chrome: `chrome://apps` → pravé tlačítko → **Odebrat z Chrome**.

---

## Bezpečnost dat (přečti si!)

Aplikace **nemá vlastní server ani databázi**. Po nainstalování se z ní stane jen rychlejší zástupce na ploše — chování je úplně stejné jako webová verze.

Konkrétně:

- **Tvé heslo** nikdy aplikace nezná. Přihlášení probíhá přes Microsoft, který vrátí jen **přístupový token**.
- **Token** se ukládá v `sessionStorage` — když zavřeš okno aplikace, token zmizí.
- **Bezpečnostní data** (uživatelé, sign-iny, atd.) si aplikace stahuje jen tehdy, když ji aktivně používáš. **Nikam se neukládají.** Po zavření aplikace zmizí.
- **Žádný cache na disku** s citlivými daty. Service worker cachuje pouze samotnou aplikaci (HTML/CSS/JS), nikoli odpovědi z Microsoft Graphu.

Pokud chceš tohle ověřit sám:
1. Otevři aplikaci.
2. F12 (nebo Cmd+Option+I na Macu) → **Application** → **Storage**.
3. Uvidíš jen `sessionStorage` s tokenem a `Cache Storage` se statickými soubory aplikace.
4. Žádná IndexedDB s daty, žádné cookies s uživatelskými informacemi.
