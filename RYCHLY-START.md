# Rychlý start — jen 7 kroků

Tenhle dokument je úplné minimum. Detailní návody jsou v ostatních souborech, ale pokud chceš nejrychlejší cestu od „mám účet" k „funguje to", jsi tady správně.

**Celkem cca 30 minut.**

---

## 1. Vytvoř GitHub repozitář (2 min)

- jdi na **github.com → +  → New repository**
- name: `skolni-bezpecnost`
- description: `Bezpečnostní dashboard pro EDU tenant`
- **Public** ✓
- žádný README, .gitignore, license nezatrhuj
- **Create repository**

## 2. Nahraj všechny soubory (3 min)

- na stránce nového repa klikni **uploading an existing file**
- otevři Finder/Průzkumník na složku `skolni-bezpecnost`
- označ **všechny soubory uvnitř** (Cmd+A nebo Ctrl+A)
- přetáhni do prohlížeče
- commit message: `Initial commit`
- **Commit changes**

## 3. Zapni GitHub Pages (1 min + 2 min čekání)

- v repu **Settings → Pages**
- Source: `Deploy from a branch`
- Branch: `main` + `/ (root)`
- **Save**
- za 2 minuty otevři: `https://<tvuj-username>.github.io/skolni-bezpecnost/`
- mělo by se zobrazit demo s tlačítkem **⚙ Nastavení**, ale modal automaticky vyskočí

## 4. Vytvoř Entra App Registration (5 min)

- jdi na **entra.microsoft.com → Applications → App registrations → New registration**
- Name: `Školní bezpečnost`
- Supported account types: **Accounts in any organizational directory (Multitenant)** ← třetí možnost
- Redirect URI: **Single-page application (SPA)** + URL: `https://<tvuj-username>.github.io/skolni-bezpecnost/`
- **Register**
- na Overview stránce **zkopíruj Application (client) ID** ← budeš ho potřebovat

## 5. Pro každý spravovaný tenant udělej admin consent (10 min při 15 tenantech)

Pro každý tenant otevři tuto URL (nahraď `<TENANT-ID>` a `<CLIENT-ID>`):

```
https://login.microsoftonline.com/<TENANT-ID>/adminconsent?client_id=<CLIENT-ID>
```

- přihlas se jako Global Admin daného tenantu
- klikni **Accept**
- hotovo, tenant je autorizovaný
- **Tenant ID** dané školky najdeš v Entře té školky → **Overview → Tenant ID**

## 6. Vyplň v aplikaci „Nastavení" (3 min)

- otevři dashboard (svou GitHub Pages URL)
- modal Nastavení se sám otevře (nebo klikni **⚙ Nastavení** vpravo nahoře)
- vyplň **Client ID** (z kroku 4)
- pro každý tenant klikni **+ Přidat tenant**, vyplň název a Tenant ID
- klikni **Uložit**

**Tyto údaje se ukládají JEN do tvého prohlížeče. Nikam jinam.**

## 7. Přihlas se (1 min)

- klikni **Sign in with Microsoft**
- přihlas se svým účtem, který má přístup do daných tenantů
- vlevo dole se objeví tvé jméno + v topbaru přepínač tenantů
- hotovo

---

## Když něco nepůjde

Pošli mi screenshot nebo přesnou chybovou hlášku. Většina problémů je:

- **AADSTS50011 redirect URI** → v Entře v App Registration → Authentication zkontroluj, že máš tam přesně tu URL, ze které se přihlašuješ
- **Web ukazuje prázdno** → otevři F12 (Developer Tools) → Console, pošli mi co tam svítí červeně
- **Tenant picker se neukáže** → v Nastavení musíš mít víc než 1 tenant
