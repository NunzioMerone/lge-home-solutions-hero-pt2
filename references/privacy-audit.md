# Verifica tecnica privacy — LGE Home Solutions

Data: 29 ottobre 2026. Ambito: codice locale di `Sito/`, asset pubblici, dipendenze dichiarate, configurazione Vite e workflow di pubblicazione. Il controllo documenta il comportamento presente prima dell'integrazione dell'informativa. Non è una certificazione GDPR né una verifica dell'account hosting o delle attività aziendali esterne al sito.

## Risultato sintetico

- Nessun modulo, login, newsletter, checkout o campo di raccolta dati è presente nell'applicazione esaminata.
- Non sono stati individuati analytics, pixel pubblicitari, CMP, iframe, widget social o widget recensioni, service worker o chiamate API applicative a servizi esterni.
- Esiste un caricamento diretto di contenuti esterni: le immagini cartografiche di `tile.openstreetmap.org`, attivate automaticamente quando la mappa si avvicina all'area visibile.
- WhatsApp, Instagram e Google Maps sono collegamenti esterni. I rispettivi servizi non vengono incorporati nella pagina.
- Nel codice iniziale è presente una chiave tecnica in `sessionStorage`, `lge-reduced-motion`. Nessun uso di `document.cookie`, `localStorage` o IndexedDB è stato individuato nel codice applicativo.
- Font, immagini, marchi partner e icona Google vengono serviti insieme al sito. Le recensioni sono una trascrizione statica, non una sincronizzazione con Google.
- La pubblicazione configurata è GitHub Pages. Le condizioni effettive dell'hosting, i log, la conservazione e le attività sui servizi esterni richiedono verifiche ulteriori.

## Evidenze nel codice

La tabella conserva la fotografia del codice precedente all’integrazione della Privacy Policy; file e righe possono cambiare. Gli aggiornamenti del 29 ottobre sono descritti sotto: email, denominazione e sede sono ora confermate dall’utente e la rotta privacy dispone dell’ingresso statico previsto.

| Elemento | Evidenza | Comportamento rilevato |
| --- | --- | --- |
| Entry point | `src/main.tsx:4–5`, `index.html:16` | Fontsource importato da npm e script applicativo locale. Nessun font CDN o script analytics nell'HTML. |
| Dipendenze | `package.json:19–28` | React, Router, GSAP, Embla, Leaflet e font locali. Nessun SDK analytics, pubblicitario, social o Google Places dichiarato. |
| Preferenza movimento | `src/components/ui/MotionProvider.tsx:6–28` | Legge/scrive `lge-reduced-motion` in `sessionStorage`, con gestione degli errori di accesso allo storage. Scrive anche il valore iniziale `false`. Il valore non contiene identificativi e non viene inviato a un server dal codice. |
| Preferenza di sistema | `src/components/ui/MotionProvider.tsx:15–17` | Legge `prefers-reduced-motion` tramite una media query per adattare le animazioni. |
| URL cartografia | `src/config/locationMap.ts:1–7` | Coordinate aziendali fisse e tile `https://tile.openstreetmap.org/{z}/{x}/{y}.png`; attribuzione OpenStreetMap. |
| Avvio mappa | `src/components/sections/Contacts/LocationMap.tsx:14–30` | IntersectionObserver con margine di 200px: import e montaggio differiti della mappa, senza necessità di un clic. |
| Richieste cartografiche | `src/components/sections/Contacts/InteractiveMap.tsx:23–39` | Leaflet caricato localmente; `tileLayer` crea richieste alle immagini OSM. Nessuna richiesta di posizione al dispositivo. |
| Stato della mappa | `src/components/sections/Contacts/InteractiveMap.tsx:15–18,61–64` | Centro e zoom sono conservati solo in un ref React durante la vita della componente; non sono inviati a un'API applicativa né salvati nello storage. |
| Collegamenti contatto | `src/utils/contactLinks.ts:25–36` | Genera `tel:`, `wa.me`, eventuale `mailto:` e URL Instagram. Nessun invio di messaggi automatico. |
| Dati di contatto | `src/config/contacts.ts:3–21` | Telefono/WhatsApp `+39 334 600 8313`; Instagram ufficiale; indirizzo dello showroom; email, ragione sociale e partita IVA non configurati. |
| Google Maps | `src/components/sections/Contacts/LocationMap.tsx:36–43`, `src/config/contacts.ts:21` | Semplice link alle indicazioni, in nuova scheda con `noopener noreferrer`. |
| WhatsApp e Instagram | `src/components/sections/Contacts/Contacts.tsx:31–46`, `src/components/sections/Contacts/ContactChannels.tsx:10–17`, `src/components/layout/Footer.tsx:97–118` | Link esterni; icone locali. Nessun SDK o contenuto Instagram/WhatsApp caricato in pagina. |
| Recensioni statiche | `src/data/reviews.ts:3–10`, `src/services/reviewsRepository.ts:1–7` | Nove recensioni, media e conteggio trascritti manualmente; il repository restituisce una Promise del dataset locale. Il caricamento asincrono non effettua richieste a Google. |
| Dati dei recensori | `src/data/reviews.ts:11–92`, `src/components/sections/Reviews/ReviewCard.tsx:33–49` | Nomi pubblici, commenti se presenti, stelle e data relativa; avatar costruiti con iniziali, senza scaricare foto profilo. |
| Link riepilogo recensioni | `src/components/sections/Reviews/Reviews.tsx:29–42` | Apre la scheda Google solo al clic; marchio Google locale in `public/img/reviews/`. |
| Fotografie lavori | `src/data/gallery.ts:3`, `src/components/sections/Gallery/GalleryImage.tsx:7–28` | 101 fotografie locali, varianti WebP e caricamento della dimensione maggiore nel visualizzatore. Nessuna immagine remota. |
| Metadati delle foto | `references/gallery-real-sources.json:2–8` | Il manifest dell'elaborazione documenta l'applicazione dell'orientamento e l'omissione di EXIF/GPS e altri metadati dalle copie web. Questa verifica non ha rieseguito l'analisi binaria di ogni file. |
| Marchi partner | `src/data/partners.ts:4–102` | I dodici loghi sono percorsi locali prodotti da `assetUrl`; nessuna chiamata ai siti dei partner. |
| Attestati | `references/competency-evidence.json:3`, `../.gitignore` | Le scansioni nominative degli attestati sono mantenute fuori dalla pubblicazione; il sito usa contenuti editoriali e icone. |
| Hosting | `../.github/workflows/deploy.yml:38–59` | Build con base `/lge-home-solutions/`, upload di `Sito/dist` e deployment GitHub Pages. Nessun backend applicativo. |
| Rotte statiche | `scripts/prepare-pages.mjs:9–16` | Genera copie dell'entry point per le rotte prodotto su GitHub Pages. La nuova rotta privacy deve ricevere un entry point equivalente. |

È stata inoltre cercata la presenza di URL remoti, API di rete e storage, iframe, form, input, script, `navigator.geolocation`, riferimenti esterni in CSS e SVG pubblici. Non sono emersi ulteriori caricamenti esterni configurati. I namespace XML e i collegamenti nei commenti delle librerie non sono stati considerati richieste di rete.

## Flussi da descrivere nell'informativa

### Navigazione e hosting

Servire una pagina e i suoi asset comporta richieste HTTP al fornitore che ospita il sito. IP e altre informazioni tecniche possono essere trattati dall'infrastruttura, anche in assenza di moduli. Il frontend non può dimostrare se i log siano disponibili a LGE, quanto siano conservati o quali soggetti vi accedano. Non scrivere «non raccogliamo alcun dato».

### OpenStreetMap

Le richieste delle tile raggiungono un soggetto esterno durante la navigazione della homepage. Il destinatario riceve almeno l'indirizzo IP necessario alla comunicazione e le informazioni tecniche inviate dal browser; intestazioni e referer dipendono dal browser e dalle policy applicate in produzione. La mappa mostra la sede LGE, non la posizione rilevata del visitatore.

Il codice esaminato non installa script OSM di profilazione e non imposta cookie per la mappa. Questo non dimostra da solo le caratteristiche complete dell'infrastruttura cartografica o di eventuali cookie preesistenti. Occorre verificare documentazione ufficiale e richieste effettive del servizio prima di concludere sul trattamento e sulle garanzie applicabili. Se emergessero strumenti non necessari soggetti a consenso, il caricamento delle tile andrebbe bloccato preventivamente o sostituito con una risorsa locale/link; non basta aggiungere una nota informativa.

### Contatti volontari e servizi collegati

WhatsApp viene aperto al clic e l'utente sceglie se inviare un messaggio. Da quel momento il trattamento dei dati della conversazione riguarda anche l'attività aziendale e il servizio scelto. Numero, nome/profilo, messaggi, eventuali allegati e tempi di conservazione effettivi non sono gestiti dal frontend. Il link `tel:` avvia una chiamata soltanto su iniziativa dell'utente. Instagram e Google Maps sono destinazioni esterne, non componenti incorporati.

Non dichiarare l'assenza di trasferimenti fuori dal SEE sulla base del solo frontend. Le garanzie, i ruoli e i trattamenti dei servizi esterni devono essere descritti sulla base della configurazione e delle fonti pertinenti, evitando di attribuire automaticamente a tutti i fornitori il ruolo di responsabile.

### Recensioni e realizzazioni pubblicate

L'assenza di raccolta da moduli non elimina il trattamento editoriale di dati personali: i nomi e i commenti delle recensioni sono ripubblicati dal sito. Fonte e modalità manuale sono verificabili; il solo fatto che siano pubblici su Google non dimostra la base giuridica per ogni riutilizzo. Il titolare deve confermare condizioni di riuso, informazione agli interessati quando dovuta, criteri di conservazione/aggiornamento e gestione delle richieste di rimozione.

Le foto dei lavori sono locali e prive dei metadati indicati dal manifest. Il 29 ottobre l’utente ha confermato che si tratta di foto proprie dei lavori dei clienti e che il consenso viene chiesto prima di fotografare e pubblicare. Non sono state esaminate liberatorie o verificati singolarmente tutti gli eventuali dettagli identificabili nelle immagini; la dichiarazione dell’utente non viene presentata come verifica documentale delle autorizzazioni.

## Cookie banner e limiti del controllo

Nel codice applicativo non sono emersi strumenti pubblicitari o di profilazione che giustifichino l'aggiunta automatica di un banner. La chiave `lge-reduced-motion` è una preferenza locale relativa all'accessibilità, senza identificatore pubblicitario o comunicazione a terzi. `toggleMotion` risulta esposto dal contesto ma non consumato attualmente da componenti; la scrittura iniziale è quindi un residuo tecnico da documentare o rimuovere in modo mirato.

La valutazione finale va completata con le condizioni dei servizi e una verifica in un contesto browser pulito della build pubblicata: richieste prima/dopo la comparsa della mappa, header di risposta, cookie e storage. Un controllo locale non certifica l'assenza di cookie impostati dall'hosting o da configurazioni aggiunte successivamente. Nessuna CMP è stata introdotta dall'audit.

## Conferme dell’utente e verifiche interne — 29 ottobre 2026

L’utente ha confermato direttamente la denominazione «LGE Home Solutions S.a.s. di Schiano Lomoriello Lemuel», la sede «Via Roma, 29 — 80070 Monte di Procida (NA)» e l’email `info@lgesolutions.it`. Telefono e WhatsApp sono anch’essi confermati. I dati societari erano stati inizialmente riscontrati nelle schede pubbliche di [iCRIBIS](https://www.icribis.com/it/scheda-azienda/NA1031085_LGE_HOME_SOLUTIONS_S.A.S._DI_SCHIANO_LOMORIELLO_LEMUEL) e [Ufficio Camerale](https://www.ufficiocamerale.it/5215/lge-home-solutions-sas-di-schiano-lomoriello-lemuel); quest’ultimo dichiara che le informazioni non provengono direttamente dalle Camere di Commercio. Quel riscontro resta una fonte storica e non una visura: nessun documento camerale o a pagamento è stato acquisito o esaminato.

Ulteriore precisazione dell’utente: Lemuel Schiano Lomoriello è l’amministratore, mentre il titolare del trattamento è la società «LGE Home Solutions S.a.s. di Schiano Lomoriello Lemuel». La denominazione sociale non cambia. Soltanto nella sezione «Chi tratta i dati» della Privacy Policy il recapito è +39 329 826 5371 (`tel:+393298265371`); telefono, footer e WhatsApp operativi rimangono +39 334 600 8313. La provenienza è la conferma dell’utente; non viene attribuita all’utente la qualità di titolare del trattamento. La correzione non comporta pubblicazione.

L’utente conferma fotografie proprie dei lavori dei clienti e consenso richiesto prima di fotografare e pubblicare. Non sono state esaminate liberatorie. Le recensioni provengono da Google e restano copie statiche aggiornate manualmente: la futura API Google non è ancora attiva. Il frontend non raccoglie messaggi WhatsApp e non invia messaggi automaticamente; il collegamento apre il servizio esterno su iniziativa del visitatore. Queste conferme non sostituiscono la valutazione delle condizioni di riuso delle recensioni o delle attività aziendali successive al contatto.

L’anteprima contiene sette sezioni concise e la data del 29 ottobre 2026. Su richiesta dell’utente sono stati rimossi tutti gli avvisi visibili di bozza/revisione, le proposte «da confermare» e le checklist. Resta un unico paragrafo sull’hosting da completare dopo la scelta definitiva. Il riepilogo su GitHub Pages e trasferimenti è stato tolto dalla pagina di anteprima, ma i dettagli tecnici e le fonti restano in questo audit: il sito `.github.io` usa già GitHub Pages, mentre l’hosting definitivo non è scelto. La descrizione del caricamento automatico OSM resta nella pagina.

La conservazione viene descritta attraverso il tempo necessario per rispondere alla richiesta e gestire l’eventuale seguito, limitando l’eventuale conservazione ulteriore a obblighi applicabili o alla tutela di diritti. Non sono stati inventati periodi fissi né una cancellazione automatica delle chat o degli altri dati. La modalità operativa effettiva resta una verifica interna.

`src/config/privacy.ts` conserva nove campi di revisione; denominazione, sede ed email sono compilate e le sei verifiche rimanenti restano interne. `approved: false`, `noindex, nofollow` e il controllo che blocca il deploy sono mantenuti. L’assenza degli avvisi nell’anteprima non significa approvazione legale né pubblicazione. Nessun deploy viene effettuato da queste modifiche.

Restano da completare internamente:

1. Destinazione di hosting e dominio definitivo; condizioni applicabili all’account GitHub Pages o a un diverso fornitore, ruoli, accesso ai log, conservazione e garanzie per i trasferimenti pertinenti.
2. Modalità aziendale di gestione di WhatsApp/chiamate: servizi utilizzati, persone autorizzate, eventuali backup e fornitori, criteri effettivi di conservazione delle richieste e delle conversazioni.
3. Condizioni documentate di riuso delle recensioni, gestione delle autorizzazioni fotografiche dichiarate, criteri di revisione/conservazione e canale per rettifiche o rimozioni.
4. Finalità e interessi effettivi del titolare per le basi giuridiche che non possono essere dedotte dall’implementazione, compresa la valutazione del servizio cartografico.

La partita IVA può servire per completare i dati societari del sito, ma non sostituisce l’identificazione del titolare e non viene inventata. DPO, profilazione e decisioni automatizzate non risultano pertinenti all’implementazione esaminata; non aggiungerli come trattamenti presenti.

## Verifiche di regressione utili per l'integrazione

- Build con la stessa base della pubblicazione e generazione di `dist/privacy-policy/index.html`, mantenendo anche le rotte prodotto.
- Accesso diretto, ricaricamento e navigazione interna a `/privacy-policy` e alla variante con slash finale; asset risolti sotto `/lge-home-solutions/` in configurazione Pages.
- Link del footer presente su homepage, pagine prodotto e privacy, tramite React Router.
- Title e meta description della privacy applicati all'accesso e ripristinati correttamente al cambio rotta; eventuali metadati statici dell'entry point coerenti con la pagina.
- Campi di revisione centralizzati internamente, con blocco deploy e `approved: false` finché dati e revisione non sono completati. L’anteprima richiesta non mostra checklist o avvisi di bozza; resta solo il paragrafo sull’hosting da completare.
- Layout leggibile a larghezze smartphone/tablet/desktop, focus da tastiera e sola animazione d'ingresso compatibile con `prefers-reduced-motion`.
- Typecheck, lint, test pertinenti e build. Non sono necessari test che ripetano ogni paragrafo statico della policy.

## Fonti primarie consultate per la bozza

- [GDPR su EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj/ita): riferimento normativo. L'accesso automatico al testo EUR-Lex ha incontrato una verifica anti-bot; i punti operativi sono stati verificati anche nelle risorse ufficiali del Garante sotto riportate.
- [Garante: principi fondamentali](https://www.garanteprivacy.it/home/principi-fondamentali-del-trattamento), [diritti degli interessati](https://www.garanteprivacy.it/regolamentoue/diritti-degli-interessati) e [esercizio dei diritti e reclamo](https://www.garanteprivacy.it/home/diritti/come-agire-per-tutelare-i-tuoi-dati-personali).
- [Garante: cookie e altri strumenti di tracciamento](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876): informativa per strumenti tecnici; eventuali tracciamenti non tecnici richiedono valutazione e, ove dovuto, consenso preventivo. Il semplice trasferimento dell'IP per servire una mappa non prova da solo l'uso di tracker soggetti a consenso.
- [GitHub Pages: raccolta dati](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection): registrazione e conservazione degli IP dei visitatori per sicurezza, anche senza login. [Informativa GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement): trattamenti internazionali e garanzie generali dichiarate; non identifica da sola la durata dei log Pages o le condizioni applicabili all'account LGE.
- [Informativa OSM Foundation](https://osmfoundation.org/wiki/Privacy_Policy) e [condizioni del servizio tile](https://operations.osmfoundation.org/policies/tiles/): richieste cartografiche, IP/dati tecnici e distribuzione globale. La sezione cookie generale di OSM non dimostra che il servizio tile imposti cookie di profilazione.
- [WhatsApp, informativa SEE](https://www.whatsapp.com/legal/privacy-policy-eea) e [Google, informativa](https://policies.google.com/privacy?hl=it): link informativi, senza incorporare i servizi. Il link all'[informativa Instagram](https://privacycenter.instagram.com/policy/) è presente; il recupero automatico ha restituito HTTP 429 e non è stato usato per formulare affermazioni ulteriori.

## Integrazione e controlli eseguiti

Le verifiche seguenti documentano l’integrazione iniziale; non attestano una nuova esecuzione dopo le successive modifiche editoriali del 29 ottobre.

- Prima versione locale `/privacy-policy`, collegata dal footer condiviso: inizialmente 11 sezioni e segnaposto centralizzati in `src/config/privacy.ts`, poi sostituiti dall’anteprima a sette sezioni descritta sopra. La pagina non è pubblicata.
- Una sola animazione CSS di ingresso; le regole globali riducono la durata con la preferenza di movimento ridotto. Non è stata effettuata una prova su dispositivo fisico o con cambio della preferenza del sistema operativo.
- Layout controllato nel browser a 320, 375, 768 e 1440 px: nessun overflow orizzontale rilevato. Controllati anche link footer, skip-link da tastiera e struttura H1/H2.
- Build con la base `/lge-home-solutions/` e generazione dell'entry HTML della privacy. Provata con un server statico locale privo di fallback SPA: URL senza slash, redirect alla directory, URL con slash e ricaricamento. Navbar, font e asset caricati correttamente.
- Navigazione privacy → homepage → prodotto → privacy: title, description e `noindex` aggiornati correttamente; nessun errore console rilevato nel percorso provato.
- Il controllo `scripts/check-privacy.mjs`, eseguito dal workflow prima del deployment, rifiuta campi null/vuoti e revisione non confermata. Provati separatamente quattro casi: bozza con campi compilati, campo null, campo vuoto e configurazione completa approvata. Il controllo fallisce intenzionalmente sulla configurazione attuale; la build e l'anteprima locale restano disponibili. `noindex` da solo non impedisce la pubblicazione e non è una protezione di accesso.
- Restano da verificare richieste/header/cookie della configurazione definitiva in produzione, ruoli e condizioni effettive dei fornitori e attività aziendali: non è stato dichiarato un audit completo del traffico di rete o dell'account hosting.
