# Školní bezpečnost

> Bezpečnostní dashboard pro školní a školkové Microsoft 365 tenanty. Jednoduché, přehledné, zdarma, bez serveru.

## Co to je

Webová aplikace v jednom HTML souboru, která po přihlášení správce školního tenantu zobrazí přehled bezpečnostních rizik — účty bez MFA, podezřelá přeposílací pravidla, aplikace s příliš velkými oprávněními, staré hostovské účty a další.

**Pro koho je to určeno:**
- ICT koordinátoři škol a školek
- Učitelé, kteří se zároveň starají o IT
- Správci EDU tenantů s omezeným časem

**Proč vznikl:**
Školy mívají 1–3 administrátory, kteří zároveň učí. Defender, Entra a Exchange Admin Centrum jsou mocné, ale rozházené přes tři portály a pět záložek. Tenhle dashboard vezme těch 6–10 nejdůležitějších věcí a zobrazí je na jedné stránce.

## Technologie

- Čistý HTML + CSS + JavaScript — žádný build, žádné frameworky.
- Microsoft Authentication Library (MSAL.js) — přihlášení přes Microsoft.
- Microsoft Graph API — čtení dat z tenantu.
- GitHub Pages — hosting zdarma.
- Žádný server. Všechna data zůstávají v prohlížeči.

## Bezpečnost

- Aplikace nemá vlastní backend ani databázi.
- Používá **delegovaná oprávnění** — aplikace dělá jen to, na co má právo právě přihlášený uživatel.
- Žádná hesla ani tajné klíče nejsou v kódu.
- Zdrojový kód je otevřený, dá se ověřit.

## Stav projektu

Fáze 1 — UI kostra hotová. Dashboard se dá spustit lokálně s ukázkovými daty.

- UI layout (sidebar + main panel + KPI karty)
- Filtrování podle závažnosti + fulltext
- CSV export
- Přepínač jazyků CZ/EN
- MSAL.js integrace (přihlášení) — plánováno
- Microsoft Graph API volání — plánováno
- Jednotlivé bezpečnostní checky — plánováno

## Jak to spustit lokálně

Stačí otevřít `index.html` dvojklikem v prohlížeči. Funguje bez instalace čehokoliv.

## Licence

MIT — viz [LICENSE](LICENSE).

## Cíl

Pomoct českým školám a školkám mít jednoduchý a srozumitelný přehled o bezpečnosti svého Microsoft 365 tenantu — bez drahých nástrojů, bez složitých portálů, otevřeně.

## Příspěvky

Pull requesty vítané. Pokud najdeš chybu nebo máš nápad na vylepšení, založ Issue na GitHubu.
