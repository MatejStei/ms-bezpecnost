# Návod: založení App Registration v Entře (multi-tenant verze)

Tento návod tě provede založením aplikace v Microsoft Entra ID, aby se do dashboardu dalo přihlásit Microsoft účtem.

**Čas:** cca 15 minut + 30 vteřin za každý spravovaný tenant.
**Co budeš potřebovat:** účet s právy **Global Administrator** nebo **Application Administrator** ve **svém domácím tenantu** (a v každém spravovaném tenantu pro krok 7).

---

## Co je App Registration a proč multi-tenant

App Registration je **záznam v Entře, který říká „tahle aplikace smí žádat uživatele o přihlášení do našeho tenantu"**. Microsoft podle něj ověřuje, že aplikace je důvěryhodná a co smí dělat.

**Multi-tenant** znamená, že **jednu** App Registration založíš ve svém domácím tenantu a pak ji můžeš autorizovat v libovolném počtu jiných tenantů (mateřských školek, škol). Nemusíš zakládat App Reg pokaždé znovu — jeden záznam, mnoho tenantů.

Toto je standardní pattern používaný i Microsoftem samotným pro jejich aplikace.

---

## Tvůj domácí tenant

Než začneš, rozhodni se, **kde tahle App Registration bude bydlet**. Doporučuju produkční tenant tvojí organizace, ne testovací. Důvody:

- App Reg ID se bude objevovat v consent dialozích každé spravované školky/školky
- vidí ho administrátoři, kteří dávají souhlas — má to vypadat důvěryhodně, ne z testovacího tenantu „mojetestik123"
- kdybys ten tenant někdy zrušil, App Reg zmizí a všechny napojené tenanty se vrátí do "nepřihlašuje se"

---

## KROK 1: Přihlášení do Entra portálu

1. Jdi na [**entra.microsoft.com**](https://entra.microsoft.com)
2. Přihlas se účtem s rolí Global Admin ve svém tenantu
3. V levém menu klikni na **Applications** → **App registrations**
4. Nahoře klikni na **+ New registration**

---

## KROK 2: Základní údaje

Vyplň:

| Pole | Hodnota |
|---|---|
| **Name** | `Školní bezpečnost` |
| **Supported account types** | **Accounts in any organizational directory (Any Microsoft Entra ID tenant — Multitenant)** *(třetí možnost)* |
| **Redirect URI — platforma** | **Single-page application (SPA)** |
| **Redirect URI — URL** | viz níže |

> **Pozor na výběr account types** — pokud zvolíš první možnost ("**this organizational directory only**"), App Registration ti bude fungovat *jen* ve tvém domácím tenantu a do žádné jiné školky se s ní nepřihlásíš. Pro náš případ vyber **třetí** ("multitenant").

### Redirect URI podle toho, kde dashboard pojede

- **Pokud máš GitHub Pages live:** `https://{tvuj-github-username}.github.io/skolni-bezpecnost/`
- **Pokud testuješ lokálně:** `http://localhost:3000/` (musíš spustit lokální server, viz sekce [Lokální testování](#lokální-testování-bez-github-pages))

**Doporučuju:** zadej **obě adresy**. První teď, druhou přidáš v kroku 5 — aby sis mohl testovat lokálně i z GitHub Pages.

Klikni **Register**.

---

## KROK 3: Zkopíruj si Application (client) ID

Po vytvoření se dostaneš na **Overview** stránku nové aplikace. Uvidíš tam:

- **Application (client) ID** — tohle je tvůj `clientId`. Zkopíruj si ho.
- **Directory (tenant) ID** — tohle je ID tvého domácího tenantu. Zkopíruj si i tohle, ale jen pro orientaci — v multi-tenant configu je to jen jeden z více tenantů, ne hlavní hodnota.

---

## KROK 4: Nastav oprávnění (API permissions)

V levém menu aplikace klikni na **API permissions**.

Uvidíš tam už přidané `User.Read`. To je výchozí — nech ho tam.

**Zatím nic dalšího nepřidávej.** Fáze 2 projektu dělá jen přihlášení, takže `User.Read` stačí. V dalších fázích postupně přidáme:

**Pro základní bezpečnostní checky:**
- `AuditLog.Read.All` — pro čtení sign-in logů
- `Policy.Read.All` — pro Conditional Access
- `Directory.Read.All` — pro seznam uživatelů/skupin
- `MailboxSettings.Read` — pro přeposílací pravidla
- `UserAuthenticationMethod.Read.All` — pro MFA status

**Pro Microsoft Defender / Threats sekci** (až je doplníme):
- `SecurityEvents.Read.All` — Security Alerts a Incidents (Defender)
- `SecurityActions.Read.All` — Secure Score a improvement actions
- `IdentityRiskEvent.Read.All` — Risk Detections
- `IdentityRiskyUser.Read.All` — Risky Users (potřebuje Entra ID P2 / A5 v tenantu)

Každé oprávnění přidáme, až dotyčný check začneme implementovat. Méně je víc — aplikace má mít jen ta oprávnění, která reálně používá.

> **Pozn. licencí:** Defender checky se nesmí rozbít, když školka licenci na Defender nemá. Aplikace v takovém případě ukáže "tato kontrola vyžaduje Defender P1/P2" a ostatní funkce jedou dál.

---

## KROK 5: Přidej druhou Redirect URI (pro lokální testování)

V levém menu klikni **Authentication**.

V sekci **Single-page application** klikni na **Add URI** a přidej druhou adresu:

- Pokud jsi v kroku 2 zadal GitHub Pages URL, přidej teď `http://localhost:3000/`
- Pokud jsi zadal localhost, přidej teď GitHub Pages URL

Jsou tam tlačítka, která zkontrolují, že obě URL jsou validní.

Klikni **Save** nahoře.

---

## KROK 6: Vyplň údaje v aplikaci přes „Nastavení"

**Údaje se NEzapisují do žádného souboru ani se necommitují na GitHub.** Vyplníš je přímo v aplikaci, ukládají se jen do localStorage tvého prohlížeče a nikam jinam.

1. Otevři aplikaci v prohlížeči (svou GitHub Pages adresu, nebo lokálně).
2. Při prvním otevření se automaticky zobrazí **dialog Nastavení**. Kdykoli později ho můžeš znovu otevřít tlačítkem **⚙ Nastavení** v pravém horním rohu.
3. Vyplň:
   - **Client ID** — Application (client) ID z kroku 3
   - **Tenanty** — pro každého spravovaného tenantu jeden řádek:
     - **Název** — volitelný (např. „Naše škola" nebo „MŠ A")
     - **Tenant ID** — Directory (tenant) ID dané školy/školky
4. Pro každý další tenant klikni **+ Přidat tenant**.
5. Klikni **Uložit**.

**Kde Tenant ID najdeš:** v Entře daného tenantu → **Overview** → **Tenant ID**. Nebo přes URL: `https://login.microsoftonline.com/{vase-domena}/.well-known/openid-configuration` — vrátí JSON, ve kterém je `tenant_id`.

**Pro správce jednoho tenantu** (např. typický školní administrátor) stačí jeden řádek — žádný přepínač tenantů se nezobrazí, UI je jednoduché.

**Pro správce více tenantů** přidej tolik řádků, kolik potřebuješ — v topbaru se objeví přepínač, kterým se mezi nimi přepínáš.

**Za 1–2 minuty** se web aktualizuje.

---

## KROK 7: Schvaľ App Registration v každém spravovaném tenantu

Multi-tenant App Registration sice **může** žít v cizím tenantu, ale dokud jí to admin toho tenantu nepotvrdí, Microsoft přihlášení zamítne.

**Pro každý tenant ze seznamu `managedTenants` udělej:**

1. Otevři v prohlížeči (nahraď `{tenant-id}` a `{client-id}`):

   ```
   https://login.microsoftonline.com/{tenant-id}/adminconsent?client_id={client-id}
   ```

2. Přihlas se účtem s Global Admin v té školce/škole.
3. Microsoft ti ukáže consent dialog s názvem aplikace a oprávněními (`User.Read`). Klikni **Accept**.
4. Tenant je teď autorizovaný.

**Pro tvoji MSP roli ve školkách:** ty máš ve školce admin účet, takže tohle uděláš sám.

**Pro školu se svým správcem:** consent musí udělat *jejich* správce, ne ty. Pošli mu tu URL e-mailem.

---

## KROK 8: Vyzkoušej přihlášení

Otevři svou GitHub Pages adresu a klikni na **Sign in with Microsoft**.

Pokud vše funguje:
1. Otevře se přihlašovací okno Microsoftu
2. Přihlásíš se
3. Pokud jsi **uživatel** (ne admin) v daném tenantu a admin už dal admin consent (krok 7), přihlášení projde rovnou
4. Pokud admin consent ještě neproběhl a ty jsi obyčejný uživatel, Microsoft tě zamítne — vrať se ke kroku 7
5. Okno se zavře, v dashboardu uvidíš vlevo dole své jméno
6. Pokud máš v `managedTenants` více tenantů, v topbaru vidíš **přepínač tenantů**

**Hurá, jsi přihlášen.** Dashboard zatím ukazuje demo data, ale ověřili jsme, že auth infrastruktura funguje. V další fázi nahradíme demo data skutečnými voláními Microsoft Graph.

---

## Lokální testování (bez GitHub Pages)

Pokud chceš testovat **lokálně bez nahrávání na GitHub** (rychlejší iterace), potřebuješ **lokální HTTP server**. MSAL nefunguje, když `index.html` otevřeš jen dvojklikem (kvůli bezpečnostním pravidlům prohlížeče).

### Nejjednodušší varianta — Python

Pokud máš Mac/Linux (skoro jistě máš Python předinstalovaný):

1. Otevři terminál
2. Přejdi do složky s projektem:
   ```bash
   cd cesta/ke/slozce/skolni-bezpecnost
   ```
3. Spusť server:
   ```bash
   python3 -m http.server 3000
   ```
4. Otevři v prohlížeči: `http://localhost:3000/`

Server necháš běžet, dokud ho nezavřeš (Ctrl+C v terminálu).

### Windows

1. Nainstaluj Python z [python.org](https://python.org) (zaškrtni „Add Python to PATH")
2. V Průzkumníku ve složce projektu podrž **Shift + pravé tlačítko** → **Otevřít v Terminálu**
3. Spusť:
   ```cmd
   python -m http.server 3000
   ```

---

## Časté problémy

### "AADSTS50011: The redirect URI ... does not match"

Microsoft říká, že URL, kam aplikace vrátila uživatele, není na seznamu povolených Redirect URI.

**Řešení:** v Entře otevři **App registrations → Školní bezpečnost → Authentication** a zkontroluj, že **přesně ta URL**, ze které testuješ, je v seznamu. Pozor na:
- `http` vs `https`
- koncové `/` (některé sítě ho přidávají automaticky — pro jistotu přidej obě varianty)
- velká/malá písmena

### "AADSTS65001: The user or administrator has not consented"

Aplikace vyžaduje oprávnění, která uživatel nedal. V naší fázi 2 by se to stát nemělo — `User.Read` udělí běžný uživatel sám. Pokud přijde tato chyba později u admin-only oprávnění, potřebuješ **Grant admin consent** v **API permissions**.

### "Config není vyplněn" v konzoli prohlížeče

V `config.js` jsou pořád placeholdery `VYPLN_CLIENT_ID` / `VYPLN_TENANT_ID`. Uprav soubor, nahraj na GitHub, počkej 1–2 minuty, obnov stránku (Ctrl+F5 nebo Cmd+Shift+R pro tvrdé obnovení bez cache).

### Dashboard ukazuje "Nepřipojeno" i po přihlášení

1. Otevři **Developer Tools** v prohlížeči (F12 nebo Cmd+Option+I)
2. Záložka **Console** — hledej červené chyby
3. Nejčastěji: zastaralá cache. Vyčisti sessionStorage: v konzoli napiš `sessionStorage.clear()` a dej Enter, pak obnov stránku.

---

## Co dál

Až budeš mít:
- App Registration založený
- `config.js` vyplněný
- Web live (GitHub Pages nebo localhost)
- Úspěšné přihlášení Microsoft účtem (vidíš své jméno vlevo dole)

...dej mi vědět a pustíme se do **fáze 3: první skutečný check** — uživatelé bez MFA. To je bezpečnostní informace č. 1 pro každý tenant.
