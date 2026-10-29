# LGE Home Solutions — Homepage

Homepage locale realizzata dal prompt del 23 ottobre 2026. Il prompt completo è conservato in `references/homepage-request.txt`; l'immagine allegata è stata usata solo come riferimento estetico.

## Avvio

Richiede Node.js 22.12 o successivo e npm.

```sh
cd /Users/nunziomerone/Desktop/Project/LgeHomeSolutions/Sito
npm ci
npm run dev
```

Aprire **http://localhost:5175/**. La porta è separata dai prototipi 5173 e 5174.

## Pubblicazione su GitHub Pages

Sito: **https://nunziomerone.github.io/lge-home-solutions/**.

Repository personale: **https://github.com/NunzioMerone/lge-home-solutions**. Il workflow `deploy.yml` nella radice del repository esegue il controllo della Privacy Policy, lint, test, build e pubblicazione a ogni push su `main`. La bozza privacy attuale blocca il deploy finché i dati mancanti e la revisione non sono completati; la build locale rimane disponibile. La build usa il prefisso `/lge-home-solutions/`; asset e React Router rispettano `import.meta.env.BASE_URL`. Lo sviluppo locale continua a usare `/`.

Lo script `scripts/prepare-pages.mjs`, eseguito con Node.js 24 nel workflow, genera punti di ingresso statici per le cinque pagine prodotto, `/competenze`, `/lavori` e `/privacy-policy`. Competenze e Lavori includono titolo e descrizione dedicati. L’ingresso privacy contiene titolo e descrizione dedicati e `noindex, nofollow` finché la bozza non è approvata.

## Comandi di verifica

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

La preview della build usa la porta 4175. `npm run format` e `npm run format:check` gestiscono la formattazione.

## Struttura

```text
src/
  components/
    sections/       Hero, Partners, Certifications, Gallery, Reviews, Contacts
    layout/         Footer
    ui/             Carousel, immagini responsive, titoli, icone, azioni contatto
  pages/            Home, Competencies, pagine prodotto provvisorie e PrivacyPolicy
  hooks/            Animazioni, caroselli, preferenze, recensioni, ancore
  types/            Contratti tipizzati dei contenuti e dei componenti
  data/             Dataset provvisori e testi
  config/           Identità, contatti, movimento e breakpoint JS
  services/         Adattatore delle recensioni
  utils/            Macchina a stati del titolo e link contatto
  styles/           Design token e regole globali
public/img/         Loghi e fotografie responsive locali
public/documents/   Copie web autorizzate degli attestati
references/         Prompt, originali fotografici, licenze font
verification/       Anteprime e report delle verifiche
```

React, TypeScript strict, Vite, React Router, CSS Modules, CSS custom properties, GSAP/ScrollTrigger e Embla 8 con Auto Scroll. Nessuno stile inline React, nessun `any`, nessun backend o modulo di contatto. I type dedicati risiedono in `src/types/`.

Il prompt aggiornato richiede `Sito/`, che è stato creato senza rinominare la precedente cartella vuota `Sito_web/`. I due esperimenti e i test Blender non sono stati modificati.

## Contenuti e comportamento

La versione corrente usa il logo orizzontale lineare fornito per ultimo, il fondo globale `#FCFCFB` e il blu `#014380` campionato dal logo per il suffisso animato della hero. Il prefisso ha una comparsa dal basso di 0,95 secondi e resta poi statico. Il movimento ridotto mantiene tutti i contenuti immediatamente visibili.

La sezione separata «I nostri prodotti» è stata rimossa il 27 ottobre 2026. Le descrizioni e i report più vecchi di quella sezione documentano una versione precedente. Il footer rimanda al carosello della hero con «Le nostre soluzioni».

**Hero attuale — 27 ottobre 2026.** Hero chiara e minimale, senza fotografia di sfondo. Logo originale immediatamente visibile a sinistra della navbar e tutte le voci a destra, con più spazio tra i gruppi. Nessuna introduzione con logo che sale. «Il design che» entra con una dissolvenza dal basso di 0,95 secondi e poi resta fisso; cinque finali si scrivono, si cancellano e ruotano con cursore lampeggiante, su una sola riga da 700 px e con disposizione su più righe sui telefoni. Il sottotitolo completo «Ogni ambiente merita di essere vissuto al meglio.» entra con dissolvenza dal basso e resta statico. Spazio riservato per tutte le frasi; nessun controllo pausa/riprendi nella hero. Resta rispettato il movimento ridotto e si evitano aggiornamenti fuori vista o a scheda nascosta. Sotto: carosello Embla di Infissi, Oscuranti, Porte e sicurezza, Porte interne e Atelier Gibus, con ingresso delle card dal basso in 1,8 secondi, a intervalli di 0,18 secondi. Foto locali, proporzioni 4:5, angoli di 8 px, pannello chiaro e zoom interno del 3,5% in hover/focus, dimensioni esterne fisse. Su touch e sotto 700 px il pannello è già visibile. Frecce circolari sottili nel blu LGE affiancano gli indicatori da 700 px quando il contenuto è scorrevole; ai limiti del carosello sono disabilitate. Swipe e tastiera restano disponibili. Le piccole frecce interne ai pannelli identificano i link alle categorie. La sezione separata «I nostri prodotti» è stata eliminata: le cinque categorie restano soltanto nella hero. L’ancora #prodotti ora raggiunge il carosello della hero. Spazio maggiore sopra il titolo e sotto il sottotitolo; testi della navbar leggermente rientrati verso il centro. Il pannello delle card ha sfondo opaco costante e si anima soltanto con una traslazione, senza dissolvenze concorrenti; l’intera card mantiene una sola superficie di puntamento.

Rifinitura del 24 ottobre: titoli delle sezioni più contenuti (`clamp(1.85rem, 2.7vw, 2.75rem)`) e linea blu di 52 px che compare dopo l'inizio dell'ingresso del titolo. La hero mantiene il fondo `#FAF9F6`; Prodotti usa `#EDE9E3`, lo stesso greige delle Competenze, poi Partner ritorna al fondo della hero. Le cinque card prodotto hanno fotografie verticali 3:4, angoli da 8 px, testi brevi dedicati e centrati, senza “Scopri di più” né bordo inferiore. Su desktop gli ingressi alternano alto e basso, durano 1,8 secondi con intervalli di 0,2 secondi e avvengono una sola volta. Sotto 700 px il carosello entra come gruppo con una dissolvenza e un movimento verso l'alto di 18 px in 1,3 secondi, senza alternanza o ritardi tra le card; durante lo swipe le fotografie restano visibili. Il focus rende subito leggibile il contenuto e il movimento ridotto disabilita gli ingressi. I loghi partner reali sono una selezione dimostrativa dai produttori, con ingresso da destra verso sinistra: fonti in `references/partner-logo-sources.json`; rapporti commerciali e uso pubblico sono da confermare. Il report aggiornato è `verification/products-partners-checks.json`.

Rifinitura delle intestazioni: i titoli iniziali delle sezioni usano la stessa scala fluida (`--font-size-section-title`). L’assetto iniziale centrato resta da Partner a Recensioni; dal 29 ottobre il titolo Contatti è allineato a sinistra nel pannello introduttivo, secondo il nuovo riferimento. I titoli H3 delle card condividono `--font-size-card-title`. Resta un solo H1, nella hero, avvicinato al logo con 20–24 px di spazio oltre l'altezza della navbar. Etichette introduttive e Lorem ipsum sono stati rimossi dalle intestazioni; rimangono i contenuti demo dentro le card e le indicazioni sulla provenienza degli asset. La voce selezionata della navbar, determinata dall'ancora navigata, ha una linea nel blu LGE `#205D9B`, anche nel menu mobile; Soluzioni resta senza linea su tutta la homepage, anche all’ancora #prodotti e con il sottomenu aperto; l’indicatore dipende esclusivamente dal percorso di una delle cinque pagine prodotto, su desktop e mobile. La nuova hero mantiene un carosello orizzontale anche sul telefono, con swipe, indicatori e tastiera. Verifiche aggiornate in `verification/heading-cleanup-checks.json`.

La homepage ha una **navbar fissa bianca e traslucida**, immediatamente visibile, con logo a sinistra e tutti i link a destra. È stato rimosso il precedente ingresso del logo dal centro dello schermo. La barra iniziale misura 112 px su desktop e 96 px su mobile. Il logo orizzontale fornito il 27 ottobre mantiene proporzioni 3:1 e dimensioni fluide, adattate anche alla barra compatta. Oltre 24 px di scroll si compatta a 88/76 px e usa il fondo bianco al 74% con sfocatura. Soluzioni e le altre destinazioni mantengono il comportamento precedente; le pagine prodotto mostrano navbar, footer, titolo e messaggio di preparazione.

Sotto 1100 px, due linee si incrociano nella X in 550 ms. Il menu bianco occupa lo schermo, si apre dall'alto in 650 ms e presenta le voci con ingressi graduali; Soluzioni apre le categorie a fisarmonica; il logo rimane a sinistra anche su mobile. Il pannello ha gestione del focus, chiusura con Esc, sfondo non interattivo e blocco dello scroll. Link, chiusura e cambio breakpoint ripristinano lo stato della pagina. I menu chiusi sono esclusi dalla navigazione e dall'albero di accessibilità. Il movimento ridotto rende immediate le transizioni. La navbar e il footer sono condivisi anche dalle cinque pagine prodotto provvisorie.

1. **Hero:** Hero chiara e minimale, senza fotografia di sfondo. Logo originale immediatamente visibile a sinistra della navbar e tutte le voci a destra, con più spazio tra i gruppi. Nessuna introduzione con logo che sale. «Il design che» entra con una dissolvenza dal basso di 0,95 secondi e poi resta fisso; cinque finali si scrivono, si cancellano e ruotano con cursore lampeggiante, su una sola riga da 700 px e con disposizione su più righe sui telefoni. Il sottotitolo completo «Ogni ambiente merita di essere vissuto al meglio.» entra con dissolvenza dal basso e resta statico. Spazio riservato per tutte le frasi; nessun controllo pausa/riprendi nella hero. Resta rispettato il movimento ridotto e si evitano aggiornamenti fuori vista o a scheda nascosta. Sotto: carosello Embla di Infissi, Oscuranti, Porte e sicurezza, Porte interne e Atelier Gibus, con ingresso delle card dal basso in 1,8 secondi, a intervalli di 0,18 secondi. Foto locali, proporzioni 4:5, angoli di 8 px, pannello chiaro e zoom interno del 3,5% in hover/focus, dimensioni esterne fisse. Su touch e sotto 700 px il pannello è già visibile. Frecce circolari sottili nel blu LGE affiancano gli indicatori da 700 px quando il contenuto è scorrevole; ai limiti del carosello sono disabilitate. Swipe e tastiera restano disponibili. Le piccole frecce interne ai pannelli identificano i link alle categorie. La sezione separata «I nostri prodotti» è stata eliminata: le cinque categorie restano soltanto nella hero. L’ancora #prodotti ora raggiunge il carosello della hero. Spazio maggiore sopra il titolo e sotto il sottotitolo; testi della navbar leggermente rientrati verso il centro. Il pannello delle card ha sfondo opaco costante e si anima soltanto con una traslazione, senza dissolvenze concorrenti; l’intera card mantiene una sola superficie di puntamento. La macchina a stati è verificata in `utils/heroTyping.test.ts`; `useHeroEntrance` gestisce ingressi e cleanup in Strict Mode. Il carosello è separato dagli aggiornamenti per carattere del titolo. Le fotografie restano dimostrative.
2. **I nostri partner:** Dodici marchi indicati dal titolare: Atelier Gibus, Bettio, VEKA, ALWO, Fideal, New Solar, SikurHome, EFFEPI, TEHNi, DoorArreda, I-PEA e VELUX. Loghi originali ospitati localmente e fonti in `Sito/references/partner-logo-sources.json`. Griglia con divisori sottili: quattro colonne su desktop, tre su tablet, due su smartphone. Restano fondo greige e titolo con «partner» in corsivo blu, senza effetti luminosi.
3. **Competenze:** Sintesi sul fondo antracite con titolo centrato «La qualità nasce dalla competenza», sottotitolo breve e tre elementi con icone: Posa qualificata (UNI 11673-2 · EQF 4), PosaClima e Termografia di I e II livello. Ogni descrizione è contenuta e il collegamento «Scopri le nostre competenze» è evidenziato da un pulsante con bordo chiaro. La griglia dei riconoscimenti è presente soltanto nella pagina `/competenze`, insieme agli approfondimenti e ai sette documenti autorizzati. La homepage mantiene l’ancora `/#competenze` e le animazioni di ingresso condivise. EQF 4 Caposquadra e termografia II restano qualifiche confermate dall’utente, distinte dai documenti DEKRA senior e ITC categoria 1; provenienza e scadenze in `Sito/references/competency-evidence.json`.
4. **I nostri lavori:** La home presenta 15 fotografie autentiche, tre per ciascuna delle cinque categorie, alternate nel carosello per variare le soluzioni mostrate. Restano coverflow, autoplay, swipe, tastiera, frecce da tablet, finestra di cinque indicatori e apertura della fotografia intera. Il collegamento «Esplora tutti i lavori» apre `/lavori`. La pagina dedicata rende disponibili tutte le 101 fotografie: Infissi (32), Oscuranti (16), Porte e sicurezza (11), Porte interne (16), Atelier Gibus / Outdoor (26). L’indice filtra tramite `?categoria=…`, preservando link diretti e cronologia. La panoramica mostra sei foto per categoria e il link alla raccolta; la categoria selezionata parte da 12 foto e aggiunge le successive a gruppi di 12. Nessuna foto omessa o duplicata tra le raccolte. Foto ottimizzate esistenti e originali invariati; selezione e classificazione in `Sito/src/data/works.ts`, fonti in `Sito/references/gallery-real-sources.json`.
5. **Recensioni:** titolo centrato senza linea, con «noi» in corsivo blu LGE e sottotitolo breve. Card bianche più compatte, con Google, voto, stelle, citazione serif, autore e data; quattro card da 1100 px e cinque da 1600 px, una centrata sui telefoni. Il carosello Embla con lieve enfasi centrale usa il motore useLoopCarousel condiviso con la galleria: avanzamento dopo 6,5 secondi di sosta, swipe e tastiera; al massimo cinque indicatori visibili in una finestra che scorre con animazione, con pallini più piccoli ai bordi e selezione attiva allungata. Si montano al massimo sette indicatori, includendo quelli di transizione, anche con centinaia di recensioni. Frecce circolari sottili nel blu LGE affiancano gli indicatori su tablet e desktop da 700 px; sui telefoni rimangono soltanto indicatori e swipe. Movimento interrotto durante lettura e interazioni, fuori vista, a scheda nascosta e con movimento ridotto. Riepilogo Google a destra su desktop e sotto il titolo sui dispositivi più piccoli. Commenti oltre quattro righe espandibili con «Leggi di più / Leggi di meno»; nessun messaggio sostitutivo per commenti assenti. Dati ricontrollati il 27 ottobre 2026: nove recensioni autentiche, media 5,0/5, tutte inserite. Le quattro nuove sono mostrate prima delle cinque storiche; testo italiano originale e assenza di commenti conservati. Provenienza e verifica manuale documentate in references/google-reviews.md (dentro Sito/). Nessun aggiornamento automatico, chiave Places o nuovo servizio esterno.
6. **Contatti:** sezione «Vieni a trovarci» su fondo greige come i Partner. Il titolo è nel pannello introduttivo, con la scala tipografica condivisa delle sezioni e «trovarci» in corsivo blu. Da 1000 px la colonna sinistra contiene introduzione, azioni, indirizzo/orari e Instagram; a destra resta la mappa. Sotto 1000 px l’ordine è introduzione con azioni, indirizzo/orari, mappa, Instagram. I dettagli sono affiancati da 600 px e impilati sugli schermi più stretti, con divisori sottili. Il pulsante blu «Prenota su WhatsApp» usa il simbolo bianco derivato dal marchio ufficiale locale; «Chiamaci» è un collegamento testuale. Il titolare ha confermato il 29 ottobre 2026 il numero +39 334 600 8313 per telefono e WhatsApp, condiviso anche con il footer, e il profilo ufficiale @atelier_gibus_campiflegrei, collegato senza parametri di tracciamento. L’email info@lgesolutions.it, confermata dal titolare il 29 ottobre 2026, è configurata con collegamento mailto e condivisa con il footer. La mappa OpenStreetMap con Leaflet 1.9.4 resta differita, con marcatore blu, zoom sottile e attribuzione essenziale invariati; la cornice bianca riporta «LGE Home Solutions» e il link «Apri le indicazioni» verso Google Maps. Via Roma 29, 80070 Monte di Procida (NA) e orari Lun–Ven 09–18, Sab–Dom chiuso restano quelli verificati il 27 ottobre 2026. Ingressi morbidi compatibili con le preferenze di movimento; nessun modulo. Fonti in `Sito/references/contact-sources.md`.
7. **Footer**: aggiornato al riferimento del 29 ottobre 2026, con fondo antracite e tre colonne da 1000 px: identità e recapiti, «Soluzioni» ed «Esplora». Il logo bianco ufficiale conserva asset e geometria originali; il CSS ritaglia soltanto i margini trasparenti per allinearlo ai recapiti. I gruppi di navigazione non hanno più lineette blu. Su mobile identità e recapiti precedono le due colonne di link; la fascia inferiore raccoglie social circolari da 44 px e copyright automatico con new Date().getFullYear(). Telefono e WhatsApp usano +39 334 600 8313, Instagram il profilo ufficiale @atelier_gibus_campiflegrei. L’email info@lgesolutions.it è stata confermata dal titolare il 29 ottobre 2026. I recapiti compaiono nell’ordine telefono, indirizzo, email, con testo da 13 px su mobile/tablet e 14 px su desktop. Il link «Privacy Policy» apre la pagina locale `/privacy-policy`, predisposta come bozza non approvata e non pubblicata. Nessun reveal, Lorem Ipsum, dicitura legale provvisoria o controllo «Riduci le animazioni». Restano rispettate le preferenze di movimento del sistema.

Le cinque rotte prodotto mostrano navbar, footer, titolo e messaggio di preparazione:

- `/prodotti/infissi`
- `/prodotti/oscuranti`
- `/prodotti/porte-e-sicurezza`
- `/prodotti/porte-interne`
- `/atelier-gibus`

La pagina `/privacy-policy` condivide navbar e footer e usa un lieve ingresso CSS coerente con il movimento ridotto. L’anteprima locale mantiene sette sezioni concise e la data del 29 ottobre 2026; non mostra avvisi di bozza/revisione, proposte da confermare o checklist. Resta un unico paragrafo sull’hosting da completare quando verrà scelto il fornitore definitivo. Denominazione «LGE Home Solutions S.a.s. di Schiano Lomoriello Lemuel», sede «Via Roma, 29 — 80070 Monte di Procida (NA)» ed email info@lgesolutions.it sono confermate direttamente dall’utente. Il precedente riscontro su schede commerciali resta una fonte storica, non una visura. L’utente conferma foto proprie dei lavori dei clienti e richiesta preventiva del consenso a fotografare e pubblicare; non sono state esaminate liberatorie. WhatsApp è soltanto un collegamento esterno, senza invio automatico o raccolta dei messaggi da parte del frontend. Le recensioni restano statiche e la futura API Google non è attiva. Il testo descrive il tempo necessario a rispondere e gestire l’eventuale seguito, con eventuali obblighi o tutela di diritti, senza durate inventate o cancellazioni automatiche. Resta la descrizione del caricamento automatico OSM; il riepilogo GitHub Pages/trasferimenti è rimosso dall’anteprima e conservato nell’audit. La pagina non è pubblicata né certificata sul piano legale: `src/config/privacy.ts` mantiene nove campi di revisione interna e `approved: false`. Il controllo `scripts/check-privacy.mjs` restituisce un errore se mancano dati o approvazione e impedisce il deploy nel workflow; `npm run build` continua a consentire la verifica locale.

Titolo, descrizione e direttive robots sono gestiti centralmente da `App`, `getPageMetadata` e `usePageMetadata`, così il passaggio tra rotte ripristina i metadati della destinazione senza lasciare `noindex` sulle altre pagine. Fonti, limiti e dati da confermare sono raccolti in `references/privacy-audit.md`. Il link dal footer esiste già; la pagina non costituisce un’informativa definitiva.

Non sono stati realizzati ulteriori contenuti interni di prodotto, CMS, amministrazione, preventivazione o nuove animazioni 3D.

## Fotografie, loghi e font

**Archivio della prima proposta:** le cinque fotografie generate con Imagegen sono conservate per riferimento. La hero usa i cinque file forniti successivamente dall’utente, mentre la galleria usa ora le 101 fotografie reali di LGE. Gli asset dimostrativi sotto elencati non rappresentano lavori LGE.

| Asset      | Soggetto                                      |
| ---------- | --------------------------------------------- |
| `security` | Porta di ingresso in una villa contemporanea  |
| `windows`  | Infissi affacciati sul paesaggio mediterraneo |
| `outdoor`  | Pergola bioclimatica con arredi outdoor       |
| `shading`  | Oscuranti esterni orientabili                 |
| `interior` | Porta interna in rovere                       |

I file della prima proposta restano in `public/img/photos/`, nelle varianti WebP da 640 e 1024 px. I PNG generati sono conservati in `references/generated/`; l'intero set dei prompt è in `references/photo-prompts.json`.

La navbar usa il logo orizzontale fornito il 27 ottobre: l’originale è conservato in `../img/Logo LGE_ il design per il tuo benessere - lineare.png` accanto al precedente logo quadrato. Il sito serve `public/img/brand/lge-navbar-horizontal-flat.webp`, convertito in WebP lossless con trasparenza e colori originali, senza ritagli o ridisegni (2172 × 724 px, rapporto 3:1). Il menu desktop compare da 1100 px per evitare sovrapposizioni con il marchio più largo. Gli altri asset e le varianti usate nei prototipi e nel footer sono conservati.

DM Sans variabile e Cormorant Garamond 400 sono ospitati localmente tramite Fontsource. Le licenze sono conservate in `references/licenses/`.

Per rigenerare le varianti ottimizzate, con `cwebp` installato:

```sh
python3 scripts/prepare_photos.py
```

Nessun hotlink fotografico, scraping o acquisto di asset. La mappa è l'unica risorsa esterna della pagina, con attribuzione OpenStreetMap mantenuta nell'embed.

## Accessibilità e movimento

La sezione prodotti ha meno spazio superiore: da 36 a 56 px tra lo stacco dalla hero e l’intestazione, con fondo greige condiviso con le Competenze. Le verifiche dell’ingresso unico sono in `verification/products-once-checks.json`.

Gli ingressi iniziano quando il titolo raggiunge il 78% dell'altezza visibile. Le card prodotto attendono almeno il 40% di visibilità nel riquadro di osservazione, con margine inferiore negativo del 12%, evitando di partire appena sfiorano lo schermo. Le card già entrate rimangono visibili: non si nascondono né ripetono l’ingresso risalendo la pagina o cambiando formato. Anche il focus e la modalità con movimento ridotto segnano i contenuti come già presentati.

Lo sfondo chiaro è `#FAF9F6`, leggermente più luminoso della prima versione. I titoli sui fondi chiari condividono l’antracite `#252A30`, un poco più scuro del footer `#2F343A`; quelli sulle fotografie e nel footer mantengono il contrasto necessario.

Navigazione semantica, link per saltare ai prodotti, focus visibile, titoli gerarchici, alt descrittivi, nomi accessibili dei comandi, regioni dei caroselli e controlli di pausa. I reveal delle sezioni usano opacità e trasformazioni mantenendo il contenuto nell'albero di accessibilità; il focus completa immediatamente un reveal.

Gli ingressi delle sezioni durano 1,4 secondi, con intervallo di 0,16 secondi tra gli elementi e curva `power2.out`; i tempi sono centralizzati in `config/motion.ts`. Il movimento del logo mantiene i tempi precedenti.

`prefers-reduced-motion` viene letto e aggiornato tramite `matchMedia`. Il controllo manuale nel footer è stato rimosso su richiesta; restano rispettate le preferenze di movimento del sistema. Questa modalità disabilita introduzione, reveal e autoplay e rende immediati gli spostamenti manuali dei caroselli. Se il sistema richiede già il movimento ridotto, il sito lo rispetta senza permettere di forzarlo.

Sono previsti safe area, immagini con dimensioni intrinseche, caricamento differito e `srcSet`/`sizes`. Le media query CSS usano soglie documentate nei moduli; i corrispondenti confini JS sono centralizzati in `config/layout.ts`. Le custom properties standard non sono utilizzabili direttamente come soglie nelle media query CSS.

## Verifiche eseguite

- TypeScript, build, lint e cinque test sui link di contatto.
- Browser interno: 320 × 740, 360 × 800, 390 × 844, 700 × 1000, 768 × 1024, 1024 × 768, 1280 × 720, 1440 × 900 e 1920 × 1080.
- Controlli di overflow e titoli tagliati, ordine delle sezioni, caricamento immagini, layout desktop e smartphone.
- Introduzione iniziale del logo e composizione finale della hero su desktop e smartphone. La navbar usa lo stesso nodo immagine dal centro dello schermo alla posizione fissa centrale; voci Home / Soluzioni / I nostri lavori a sinistra e Competenze / Recensioni / Contatti a destra.
- Navbar: fondo bianco traslucido dopo l’ingresso del logo e durante lo scroll; dropdown Soluzioni, tastiera, Esc, click esterno, ancore e rotte prodotto. Logo unico centrato verificato su desktop a 1211 e 900 px e su mobile a 390 px, dalla comparsa iniziale alla posizione fissa durante lo scroll. Le verifiche aggiornate di trasparenza completa, logo grande e riduzione durante lo scroll, colori e tipografia sono in `verification/hero-integrated-checks.json`; la verifica della sequenza con un unico logo è conservata in `verification/centered-navbar-checks.json`.
- Menu mobile: 390 × 844 e 320 × 568, X animata, categorie, focus ciclico in entrambe le direzioni, ripristino dello scroll e dello sfondo, chiusura al cambio breakpoint e movimento ridotto. Report in `verification/navbar-checks.json`.
- Cinque rotte prodotto provvisorie con navbar, footer e ritorno alle sezioni della homepage.
- Frecce e tastiera, trascinamento dei prodotti, avanzamento recensioni.
- Autoplay lavori, pausa stabile, ripresa, preferenze di movimento e pausa conservata dopo resize.
- Mappa reale caricata, contatti mancanti disattivati, footer e navigazione ad ancore.

Il movimento ridotto è stato provato con il controllo del sito, che usa lo stesso percorso logico della preferenza di sistema; non è stata modificata o emulata la preferenza del sistema operativo. I controlli nei viewport non sostituiscono prove su iPhone/Android fisici o un audit completo su Safari e Firefox. Lighthouse non è installato e non sono dichiarati punteggi.

## Prima della pubblicazione

Fotografie autentiche, dodici marchi partner e sette documenti sulle qualifiche/riconoscimenti sono stati forniti dal titolare. I livelli EQF 4 e termografia II sono stati confermati dal titolare il 28 ottobre 2026, distintamente dagli attestati precedenti. Restano da consolidare i testi definitivi, la configurazione Google Maps/Places per l’eventuale aggiornamento automatico delle recensioni, la Partita IVA e la revisione finale dei testi legali. Denominazione, sede ed email info@lgesolutions.it sono confermate direttamente dal titolare, senza ispezione di una visura. Il titolare conferma inoltre foto proprie dei lavori dei clienti e consenso richiesto prima di fotografare e pubblicare; non sono state esaminate liberatorie. Le nove recensioni Google reali sono già state verificate e inserite come rilevazione manuale del 27 ottobre 2026.

La versione pubblica attuale usa GitHub Pages, con ingressi statici per le rotte previste; l’hosting definitivo non è ancora stato scelto. Restano da definire l’eventuale prerendering SEO e l’URL canonico definitivo, e da completare la revisione dell’informativa sulla gestione effettiva dei dati e dei servizi esterni. Telefono, WhatsApp, Instagram ed email confermati sono già configurati; la bozza privacy locale non è pubblicata e blocca nuovi deploy finché dati e revisione non sono completati.

### Rifinitura visiva del 28 ottobre 2026

Titoli coerenti in Cormorant Garamond, parti in corsivo nel blu ufficiale `#014380`, eccetto il corsivo chiaro concordato per il titolo delle Competenze sul fondo scuro; `--color-blue` ora rimanda a `--color-brand-blue`. Hero con sottotitolo «Ogni ambiente merita di essere vissuto al meglio.». Ingresso della galleria esteso a 1,8 s, stagger 0,2 s, senza cambiare il carosello o il dialogo fotografico. Spazi verticali centralizzati in `--section-space: clamp(48px, 5.5vw, 80px)` e `--section-heading-gap: clamp(32px, 3.6vw, 52px)`; ridotti i margini interni inferiori dei caroselli, evitando spazio aggiuntivo tra Recensioni e Contatti.

Nel menu mobile eliminati «Esplora LGE» e la firma inferiore, peso delle voci 400 e chevron a 14 px dal testo. Restano focus, hamburger, sottomenu, Esc e blocco dello sfondo. Il footer usa `lge-footer-white.png`, originale trasparente 2171×724 copiato senza alterazioni; originale conservato anche in `img/Logo LGE bianco - lineare.png`.

Ultima precisazione concordata: titolo e sottotitolo delle Competenze sono entrambi sul fondo scuro, con «competenza» in corsivo chiaro. Il footer è stato arricchito con le cinque soluzioni e i recapiti sotto al logo; il controllo manuale per il movimento è stato eliminato su richiesta, lasciando il supporto a `prefers-reduced-motion`.

Foto hero aggiornate il 28 ottobre 2026 con i cinque file forniti dall’utente: infissi.jpg → Infissi; Oscuranti e sicurezza.png → Oscuranti; Ingresso moderno in legno e vetro.png → Porte e sicurezza; Soggiorno moderno con porta in legno.png → Porte interne; Pergola moderna al crepuscolo.png → Atelier Gibus. Immagini della hero separate dalla galleria, originali conservati in Sito/references/hero-supplied e varianti WebP 480/960 in Sito/public/img/hero. Inquadratura CSS dedicata alla porta interna e agli oscuranti, senza modifiche ai file originali.

Rifinitura del footer aggiornata al riferimento del 29 ottobre: logo bianco allineato ai recapiti eliminando soltanto lo spazio trasparente mediante CSS, senza modificare il file o le proporzioni; telefono, indirizzo ed email, in quest’ordine, con icone lineari in cerchi discreti e testo da 13 px su mobile/tablet e 14 px su desktop. Colonne «Soluzioni» ed «Esplora» senza i precedenti accenti blu, con cinque categorie e quattro collegamenti di sezione; nessuna voce «Chi siamo». Tre colonne da 1000 px; identità e recapiti affiancati sui tablet, gruppi di navigazione in due colonne sotto l’identità sui telefoni. Fascia inferiore più compatta, con social circolari da 44 px e copyright dinamico, disposto in fondo su mobile. Telefono e WhatsApp restano +39 334 600 8313 e Instagram resta collegato al profilo ufficiale @atelier_gibus_campiflegrei. L’email info@lgesolutions.it è stata confermata dal titolare il 29 ottobre 2026 ed è collegata tramite mailto. Il link «Privacy Policy» è ora presente e apre la bozza locale `/privacy-policy`, non ancora approvata né pubblicata. Sfondo antracite e assenza di reveal conservati.

## Responsive e pagine provvisorie — 28 ottobre 2026

Le frecce condivise di tutti i caroselli sono nascoste sotto 700 px e visibili da tablet in su. La semplificazione iniziale dei lavori sui telefoni è stata superata il 29 ottobre 2026: anche sotto 700 px è ripristinato il coverflow, con fotografia centrale in evidenza e laterali più piccole. Le dimensioni delle slide restano stabili durante lo swipe; si animano soltanto scala e opacità delle fotografie interne. Le frecce restano nascoste sui telefoni e il movimento ridotto è rispettato. Il canvas del documento è antracite come il footer, mantenendo il fondo chiaro del contenuto. Le cinque pagine prodotto mostrano navbar, footer, titolo e messaggio di sezione in preparazione; navbar e titolo riconoscono anche gli URL con slash finale generati da GitHub Pages.

### Materiali aziendali del 28 ottobre 2026

Il footer usa ora `lge-footer-white-official.png`, copia esatta del nuovo logo trasparente 1000×1000; originale archiviato anche in `img/Logo-LGE-(Png-Bianco).png`. Le cartelle originali `Attestati/` e `foto_lavori_lge/` sono conservate localmente ed escluse da Git: il sito contiene soltanto le immagini ottimizzate autorizzate e la sintesi editoriale dei documenti. Nella prima fase del 28 ottobre le scansioni non erano pubblicate; dal 29 ottobre l’utente autorizza l’inserimento dei sette documenti nella nuova pagina locale `/competenze`. Questa modifica non avvia un deploy.

## Pagina Competenze — 29 ottobre 2026

La pagina `/competenze` riprende la proposta visiva approvata: qualifiche tecniche, riconoscimenti e anteprime dei sette documenti forniti dall’utente, con navbar e footer condivisi. Navbar desktop e mobile, footer e il nuovo collegamento «Scopri le nostre competenze» della homepage puntano alla pagina; l’ancora `/#competenze` resta utilizzabile. La pagina ha title e meta description dedicati e `prepare-pages.mjs` prepara l’ingresso statico con gli stessi metadati.

I due PDF vengono conservati originali. Le altre cinque immagini sono ora i PNG sostitutivi forniti direttamente dall’utente il 29 ottobre, convertiti per il web senza interventi estetici. La posa senior DEKRA e la termografia di categoria 1 ITC non vengono presentate come prova dei livelli EQF 4 e II confermati separatamente dall’utente. Le collaborazioni prive di scansione non ricevono documenti inventati. L’integrazione locale non modifica lo stato di approvazione della privacy e non avvia pubblicazioni.

I nuovi PNG sono archiviati senza alterazioni in `references/credentials-supplied/`; `scripts/prepare-supplied-credentials.py` genera i WebP a qualità 95 senza ingrandimenti, ritagli o ritocchi, e miniature con lato massimo 640 px. Il manifest corrente `references/credential-supplied-derivatives.json` registra fonti, hash e dimensioni. Le precedenti rettifiche delle foto HEIC sono superate: originali in `Attestati/`, script `scripts/prepare-credential-photos.py` e manifest `references/credential-photo-derivatives.json` restano come storico e non sono usati per gli asset attuali. Le miniature leggere sono separate dalle immagini complete, caricate solo all’apertura del visualizzatore; i PDF originali sono identici ai file forniti. Il visualizzatore mostra soltanto immagine intera e X, come la galleria lavori; conserva chiusura Esc/esterno, focus da tastiera e zoom naturale del browser su touch. Il percorso Home / Competenze è stato rimosso. I testi di dettaglio della pagina sono separati dalla sintesi della homepage e riprendono i contenuti degli attestati; Cosmet include Tour Evolution del 13 marzo 2025. I blocchi entrano individualmente al 78% del viewport con dissolvenza e spostamento di 24 px in 1,4 s, rispettando il movimento ridotto. Le immagini hanno uno zoom interno del 3,5% in hover/focus, senza variazioni delle dimensioni delle card.


## Pagina I nostri lavori — 29 ottobre 2026

La pagina `/lavori` sviluppa la bozza approvata con cinque categorie distinte. Le raccolte comprendono tutte le 101 foto esistenti; `src/data/works.ts` centralizza classificazione, ordine e selezione per la home. `src/utils/works.ts` gestisce ordinamento e URL dei filtri. Navbar desktop e mobile, footer e collegamento sotto il carosello della home portano alla pagina dedicata.

La panoramica mostra sei immagini per gruppo; i filtri aprono l’intera categoria con caricamento progressivo a gruppi di 12. Selezione e cronologia sono nell’URL (`?categoria=infissi`, `oscuranti`, `porte-e-sicurezza`, `porte-interne`, `atelier-gibus`). Dopo «Mostra altre foto» il focus passa alla prima immagine aggiunta. Il visualizzatore condiviso mantiene foto intera, chiusura X/Esc/esterno, scroll bloccato e ritorno del focus.

Il nuovo indice fotografico mostra le cinque categorie, senza contatori: cinque colonne da tablet, scorrimento orizzontale con snap e barra sottile sui telefoni. I collegamenti ai filtri portano direttamente alla raccolta con l’ancora `#works-content`. Le fotografie usano le varianti WebP già presenti; solo la prima anteprima è caricata subito, le altre sono differite. Nessun originale ritoccato, servizio esterno o deploy aggiunto. Le preferenze di movimento ridotto disattivano gli ingressi.

Verifiche: 25 test superati, TypeScript e lint senza errori; controllati i cinque filtri, cronologia, caricamento completo degli infissi, visualizzatore e layout desktop/tablet/smartphone. La build segnala il bundle principale appena sopra 500 kB minificati; il caricamento completo resta 166 kB gzip, oltre ai font e alle fotografie richieste.


### Nuova direzione visiva dei Lavori

La revisione richiesta dall’utente sostituisce l’impostazione precedente con una hero su fondo greige: titolo «Il nostro lavoro, la vostra casa.», grande foto outdoor e dettaglio interno sovrapposto, entrambi autentici e ingrandibili. Non sono state alterate le fotografie. Seguono categorie fotografiche e gallerie con proporzioni originali: le immagini sono distribuite in colonne stabili, tre su desktop e due su smartphone/tablet, senza ritagli uniformi. Aggiungendo altre immagini le precedenti non cambiano colonna. Contatori visibili eliminati; il riepilogo del caricamento rimane soltanto per le tecnologie assistive. La home conserva la selezione di tre foto per categoria.
