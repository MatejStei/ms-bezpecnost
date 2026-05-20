# Návod: jak dostat projekt na GitHub (pro úplné začátečníky)

Tenhle návod tě provede krokem za krokem — od "mám účet" k "projekt je online a funguje jako web".

Předpoklad: máš **založený účet na github.com**.

> **Upozornění k soukromí:** GitHub Pages repo bude **veřejné**, takže kdokoli uvidí kód. To je v pořádku — žádné citlivé údaje (clientId, tenant IDs, jména školek) v něm nejsou. Konfigurace se vyplňuje v aplikaci přes „Nastavení" a ukládá se **jen v tvém prohlížeči**, ne na GitHubu. Více v sekci [Soukromí](#soukromí-dat) na konci tohoto návodu.

Celý proces zabere **15–20 minut**. Většinu času je to jen klikání ve webovém prohlížeči.

---

## Co je na konci

Až dokončíš tenhle návod, budeš mít:

1. Veřejný repozitář `skolni-bezpecnost` na GitHubu
2. Živý web na adrese `https://{tvuj-github-username}.github.io/skolni-bezpecnost/`
3. Možnost cokoliv kdykoliv upravit — buď přímo ve webu GitHubu, nebo stažením do počítače

---

## KROK 1: Vytvoř nový repozitář

**Repozitář** = složka s kódem projektu, uložená na GitHubu. Myslete na to jako na Dropbox, ale pro kód.

1. Přihlas se na [github.com](https://github.com).
2. Vpravo nahoře klikni na **+** → **New repository**.
3. Vyplň:
   - **Repository name:** `skolni-bezpecnost`
   - **Description:** `Bezpečnostní dashboard pro EDU tenant`
   - **Public** (ponech zatržené — bude to open source)
   - **Add a README file:** NEzaškrtávej (náš README si nahrajeme sami)
   - **Add .gitignore:** None
   - **Choose a license:** None
4. Klikni **Create repository**.

Dostaneš se na stránku `github.com/{tvuj-github-username}/skolni-bezpecnost`. Je prázdná — to je správně.

---

## KROK 2: Nahraj soubory

**Nejjednodušší způsob (bez instalace Gitu):**

1. Na stránce repozitáře (prázdná stránka po kroku 1) klikni na odkaz **uploading an existing file**.
   - Pokud ho nevidíš, klikni na **Add file** → **Upload files**.

2. Otevři Finder (Mac) nebo Průzkumník (Windows).

3. Najdi složku `skolni-bezpecnost`, kterou jsi dostal ode mě.

4. Označ **všechny soubory uvnitř** (ne samotnou složku):
   - `index.html`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
   - `NAVOD-GITHUB.md`

5. Přetáhni je do okna prohlížeče (do oblasti, kde GitHub říká "Drag files here").

6. Dole na stránce do pole **Commit message** napiš:
   ```
   Initial commit — UI kostra s i18n
   ```

7. Klikni na zelené tlačítko **Commit changes**.

Chvilku to zpracuje a pak uvidíš seznam souborů. Jsi online.

---

## KROK 3: Zapni GitHub Pages

GitHub Pages je funkce, která z tvého repozitáře udělá živý web. Zdarma.

1. Na stránce repozitáře klikni na záložku **Settings** (vpravo nahoře).
2. V levém menu klikni na **Pages**.
3. V sekci **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` a složka `/ (root)`
   - Klikni **Save**.

GitHub ti ukáže zelený pruh: *Your site is live at https://{tvuj-github-username}.github.io/skolni-bezpecnost/*.

První nasazení trvá **2–5 minut**. Počkej, dej si kávu, pak zkus otevřít tu adresu.

**Když web neběží hned:** počkej ještě chvíli a obnov stránku. GitHub Pages umí být líný při prvním nasazení.

---

## KROK 4: Vyzkoušej to

Otevři `https://{tvuj-github-username}.github.io/skolni-bezpecnost/` v prohlížeči.

Mělo by se otevřít:
- Sidebar s kategoriemi (Přehled, Identita, Pošta, Aplikace, Hosté, Zařízení)
- KPI karty s počty nálezů
- Tabulka ukázkových zjištění
- Přepínač CZ/EN vlevo dole

Vyzkoušej:
- **přepnutí jazyka** (CS/EN) — všechno se přeloží
- **kliknutí na kategorii** — filtruje nálezy
- **hledání** a **filtr závažnosti**
- **export CSV** — stáhne se ti soubor

Pokud všechno funguje, **jsi online**.

---

## KROK 5: Jak upravovat soubory v budoucnu

Dvě možnosti:

### A) Přímo ve webu GitHubu (nejjednodušší pro malé změny)

1. Na stránce repozitáře klikni na soubor (např. `index.html`).
2. Vpravo nahoře klikni na ikonu tužky ✏️ **Edit**.
3. Uprav text.
4. Dole napiš **Commit message** (krátký popis změny).
5. Klikni **Commit changes**.

GitHub Pages automaticky aktualizuje web za 1–2 minuty.

### B) Stáhnout projekt, upravit lokálně, nahrát zpátky

Tohle budu doporučovat, jakmile začneme dělat větší změny. Zatím to nepotřebuješ.

---

## Časté problémy

**"Web ukazuje 404 — Page not found"**
- Počkej 5 minut od aktivace Pages — první nasazení je pomalejší.
- Zkontroluj v **Settings → Pages**, jestli je tam zelený pruh s URL.
- Zkontroluj, že soubor se jmenuje přesně `index.html` (malá písmena).

**"Nahrál jsem soubory, ale nevidím .gitignore"**
- GitHub schovává soubory začínající tečkou v některých zobrazeních. Je tam, věř mi. Můžeš ověřit v **Files → View all files**.

**"Chci repozitář smazat"**
- Settings → úplně dole **Danger Zone** → **Delete this repository**. Musíš potvrdit jméno.

**"Co když udělám chybu?"**
- Na GitHubu je historie všech změn. V záložce **Commits** vidíš každou změnu a můžeš se vrátit. Nic neztratíš.

---

## Soukromí dat

GitHub Pages repo je **veřejné** a kdokoli vidí kód. Toto je záměr — projekt je open source.

**Co je v repu vidět:**
- Kód aplikace (HTML, JS, CSS)
- Návody a dokumentace
- Šablona `config.js` s prázdnými hodnotami

**Co NIKDY není v repu:**
- Tvůj clientId nebo tenant IDs — vyplňuješ je v aplikaci přes „Nastavení", uloží se do **localStorage tvého prohlížeče**
- Tvoje hesla, tokeny, ani data ze sledovaných tenantů — nic z toho se nedostane do žádného souboru ani na žádný server

Pokud bys přesto omylem commitnul `config.js` s reálnými hodnotami: smaž z něj obsah a znovu commitni. Konfiguraci máš v prohlížeči, neztratíš ji.

---

## Co dál

Až potvrdíš, že ti základ funguje, pokračujeme:

1. **Založíme Entra ID App Registration** (viz `NAVOD-ENTRA-APP.md`)
2. **V aplikaci klikneš na "⚙ Nastavení"** a vyplníš identifikátory — uloží se ti do prohlížeče
3. **Přihlásíš se Microsoft účtem** a aplikace začne tahat skutečná data
4. Postupně zbývajících 5 checků
5. Polish a dokumentace pro školu

Každý krok bude podobně popsaný — žádný "spusť tohle v terminálu" bez vysvětlení.
