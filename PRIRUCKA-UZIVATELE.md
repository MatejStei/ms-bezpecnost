# Uživatelská příručka — Školní bezpečnost

Tato příručka vysvětluje, jak dashboardu rozumět a co s tím dělat. Není o instalaci — to je v `RYCHLY-START.md`. Je o **každodenním používání**.

---

## Co to vlastně je

Webová aplikace, která vám jednou za čas (nebo na vyžádání) **stáhne data z vašeho školního Microsoft 365 tenantu** a ukáže vám seznam věcí, které by mohly být **bezpečnostně problematické**. Není to nástroj, který sám něco opravuje — jen vám říká *„podívej se na tohle"*. Vy se rozhodnete, co s tím.

Funguje **plně v prohlížeči** — nemá vlastní server, vaše data nikam neukládá. Když zavřete záložku, vše je pryč. Při dalším otevření si to znovu načte z Microsoftu.

---

## První otevření

1. Otevřete adresu v prohlížeči (např. `https://matejstei.github.io/ms-bezpecnost/`).
2. Vyskočí dialog **Nastavení aplikace** — vyplňte:
   - **Client ID** — to dostanete jednou od IT správce (zůstane u vás v prohlížeči navždy)
   - **Tenanty** — jméno (libovolné) a Tenant ID každé školy/školky, kterou chcete sledovat
3. Klikněte **Uložit a pokračovat**.
4. Klikněte vpravo nahoře **Přihlásit se přes Microsoft**.
5. Přihlaste se svým pracovním účtem.
6. Microsoft se vás zeptá, jestli aplikace smí vidět určitá data (audit log, uživatele atd.). Klikněte **Accept**.
7. Po pár sekundách vidíte dashboard se skutečnými daty.

**Vše vyplněné zůstává ve vašem prohlížeči.** Když si otevřete aplikaci v jiném prohlížeči nebo zařízení, budete to muset zadat znovu. Žádné z vašich údajů nejde nikam ven.

---

## Jak číst dashboard

### Vlevo: kategorie

```
Přehled   9     ← všechny nálezy
Hrozby    3
Identita  5
Pošta     1
Aplikace  2
Hosté     1
Zařízení  0
```

Číslo vedle kategorie = kolik nálezů v ní je. Kliknutím na kategorii vyfiltrujete jen ji.

### Nahoře: KPI karty

Čtyři barevné karty:

- **Kritické** (červená) — vyžaduje pozornost teď
- **Varování** (oranžová) — měli byste si přečíst
- **Informativní** (modrá) — pro vědomí
- **Poslední běh** — kdy se data naposled stáhla

### Uprostřed: seznam zjištění

Každý řádek je jedno zjištění. Má:
- **Barvu závažnosti** vlevo (červená/oranžová/modrá)
- **Popis** uprostřed („5 účtů globálních administrátorů nemá zapnuté MFA")
- **Detail** menším písmem pod tím
- **Čas**, kdy událost nastala, vpravo

**Kritické nálezy mají červené zvýraznění + tučný text.** Toho si všimnete jako prvního.

### Vpravo nahoře: tlačítka

- **Obnovit** — stáhne data znovu z Microsoftu (jinak zůstává v paměti to poslední)
- **Export CSV** — uloží aktuální nálezy do tabulky pro Excel
- **⚙ Nastavení** — kde jste vyplňovali Client ID a tenanty
- **Přihlásit / Odhlásit** — Microsoft auth

### Vlevo dole: přepínače

- **CS / EN** — jazyk UI
- **🌓** — světlý / tmavý režim (respektuje OS výchozí, nebo si zvolíte)
- **Jméno přihlášeného účtu** nebo „Nepřipojeno"

---

## Co znamenají jednotlivé checky

### Identita

**Riziková přihlášení** — Microsoft Defender / Identity Protection zaznamenal podezřelé přihlášení (netypická lokace, anonymní IP, atypický cestování). Když se tu objeví třeba *„přihlášení z Turecka"* a vy jste tam nebyli, **změňte heslo a zavolejte IT**.

**Změny admin rolí** — Někdo (možná vy) přidal/odebral uživatele do role Global Admin nebo podobné. Kritické: pokud někoho povýšili, koho jste nečekali. **Zkontrolujte, jestli to byla vaše akce.**

**MFA registrace** — Kolik uživatelů má/nemá zapnutý druhý faktor přihlášení. *Admin bez MFA = vážná chyba.* Studenti s A1 licencí často MFA nemají, to je v normě.

**Nové účty** — Kdo byl založen za posledních 7 dní. Pro orientaci. Kritické není automaticky.

**Expirace hesel** — Komu brzy expiruje heslo. Můžete je v předstihu varovat.

### Pošta

**Externí přeposílací pravidla** — Klasický signál, že někdo (nebo nějaký útočník) si nechává kopii pošty do externí adresy (např. svůj Gmail). **Kritické — okamžitě řešit.**

**Změny oprávnění schránek** — Kdy někdo dal někomu Full Access nebo Send As na cizí schránku. Často legitimní (zástup), ale ověřit.

### Aplikace

**OAuth consenty** — Někdo schválil aplikaci s oprávněními k tenantu. Kritické pokud aplikace chce *Mail.ReadWrite*, *Files.ReadWrite* apod.

**App Registrations** — Aplikace registrované ve vašem tenantu s brzy expirujícími hesly/certifikáty. Pro orientaci, abyste nezůstali bez funkčnosti, až jim secret expiruje.

**Neaktivní Teams/Groups** — Skupiny, které se dlouho neobnovily. Cleanup kandidáti.

### Hosté

**Staří hosté** — Externí účty (consultanti, dodavatelé), kteří se 90+ dní nepřihlásili. Pravděpodobně už nepotřebujete — odebrat.

### Zařízení

**Compliance zařízení** — Zařízení v Intune, která neodpovídají vašim policy (nešifrovaná, bez antivirů, atd.) nebo se dlouho nesynchronizovala. Pouze pokud máte Intune licenci.

### Hrozby (Defender)

**Microsoft Secure Score** — Microsoftí 0–100 hodnocení bezpečnosti tenantu, s trendem. Vyšší = lepší. Pod 50 % je varování.

**Defender alerty** — Konkrétní bezpečnostní hlášení (malware, phishing, podezřelé chování). Pouze pokud máte Defender P1+.

**Defender incidenty** — Skupiny souvisejících alertů. Pouze Defender P2 / Sentinel.

**Rizikoví uživatelé** — Účty, které Microsoft označil jako risky. Pouze Entra ID P2.

### Conditional Access

**Změny CA politik** — Kdy kdo upravil nebo smazal CA pravidlo. Pokud někdo vypnul důležitou politiku, **kritické**.

### Licence

**Licenční využití** — Kolik máte zaplaceno licencí a kolik jich reálně používáte. Nevyužité = ušetříte peníze, když je odeberete.

---

## Co dělat když vidíte kritický nález

1. **Nepanikujte.** Většina kritických nálezů jsou věci, které se daly přehlédnout — teď je vidíte.
2. **Klikněte na řádek** — uvidíte detail (kdo, kdy, kde).
3. **Postupujte podle typu nálezu**:

| Typ nálezu | První akce |
|---|---|
| Rizikové přihlášení z neobvyklé země | Resetovat heslo dotyčného účtu, zkontrolovat přihlášení v Entra |
| Admin přidán a nečekal jste | Odebrat z role, zjistit kdo to udělal |
| Externí přeposílací pravidlo | Smazat pravidlo, zkontrolovat zda nebylo cokoli ukradeno |
| OAuth aplikace s vysokými právy | Revoke v Entra → Enterprise Applications |
| Admin bez MFA | Zapnout MFA pro daného admina TEĎ |
| CA politika vypnuta | Zapnout zpět, zjistit kdo a proč |

4. **Po vyřešení klikněte Obnovit** — nález by měl zmizet.

---

## Časté otázky

**Proč některé checky vrací „vyžaduje licenci"?**
Tenant nemá licenci na daný produkt. Např. Defender alerty potřebují Defender P1/P2, rizikoví uživatelé potřebují Entra ID P2. To nevadí — ostatní checky jedou dál.

**Proč data nevidím real-time?**
Aplikace tahá data **na vyžádání** (při loginu nebo kliknutí Obnovit). Microsoft sám má drobné zpoždění v audit logu (typicky 5–15 minut).

**Mohu sledovat víc tenantů najednou?**
Ano. Přidejte je do Nastavení. V topbaru se objeví přepínač. Aktuálně se přepínáte mezi nimi — agregovaný pohled „všechny dohromady" přijde v další verzi.

**Co když chci aplikaci sdílet s kolegou?**
Pošlete mu URL. On si v Nastavení zadá *své* údaje (Client ID stejný, ale jen ty tenanty, kam má přístup). Vaše údaje neuvidí.

**Funguje to i offline?**
UI ano (díky service workeru), ale data ne — Microsoft Graph potřebuje internet.

**Funguje to na mobilu/tabletu?**
Ano. Otevřete v Safari/Chrome a přidejte na plochu — chová se jako nativní aplikace. Detaily v `NAVOD-INSTALACE.md`.

**Mám obavy o bezpečnost dat. Co kdyby někdo viděl můj kód na GitHubu?**
Veřejný je jen *kód aplikace*, ne vaše data. Client ID a Tenant IDs zadáváte v Nastavení, uloží se výhradně v localStorage vašeho prohlížeče — nikdy nikam jinam. Detailněji `NAVOD-GITHUB.md` sekce „Soukromí dat".

---

## Tipy pro efektivní používání

- **Začněte Přehledem.** Uvidíte čísla na první pohled. Pokud je 0 kritických a 0 varování, jste v klidu.
- **Filtr závažnosti** vpravo nahoře — když jdete cíleně po nejhorším, vyfiltrujte si jen kritické.
- **Vyhledávání** — pište kus textu (jméno uživatele, název aplikace) a filtruje se napříč.
- **CSV export** — Excel umí. Hodí se na měsíční reporty pro ředitele.
- **Tmavý režim** — 🌓 vlevo dole. Méně bolí oči večer.
- **Tlačítko Obnovit** — Aplikace data necachuje. Pokud chcete novější data, klikněte na obnovit. Microsoft Graph je rychlý (do 10 sekund).
