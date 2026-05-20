/* ============================================================================
   config.js — konfigurace přihlášení a seznam spravovaných tenantů

   VYPLŇ:
     - clientId: Application (client) ID z Entra App Registration
     - managedTenants: seznam tenantů, které chceš v dashboardu vidět

   Kde najít hodnoty: viz NAVOD-ENTRA-APP.md.

   Poznámky:
   - Tyto hodnoty NEJSOU tajné. Jsou to veřejné identifikátory.
     Skutečnou bezpečnost zajišťuje delegovaný consent — aplikace dělá
     jen to, na co má právo právě přihlášený uživatel.
   - Pro jednoho školního správce stačí v managedTenants jeden záznam.
     Pak se UI přepne do "single-tenant" režimu (žádný přepínač).
   - Pro správce více školek/škol přidávej další záznamy. UI ukáže
     přepínač tenantu a možnost agregovaného pohledu napříč všemi.
   ============================================================================ */

window.APP_CONFIG = {
  // --- ZAČÁTEK KONFIGURACE ---

  clientId: "VYPLN_CLIENT_ID",  // např. "12345678-abcd-ef01-2345-6789abcdef01"

  managedTenants: [
    // PŘÍKLADY (smaž a nahraď svými):
    // { id: "abcdef12-3456-7890-abcd-ef1234567890", name: "MŠ Sluníčko Kladno" },
    // { id: "98765432-1234-5678-9abc-def012345678", name: "MŠ Klíček Buštěhrad" },
    { id: "VYPLN_TENANT_ID", name: "Můj tenant" }
  ],

  // --- KONEC KONFIGURACE ---

  // Scopes = oprávnění, která aplikace chce. Začínáme s nejmenším možným.
  // V dalších fázích přidáme další podle toho, co budou checky potřebovat.
  scopes: ["User.Read"]
};
