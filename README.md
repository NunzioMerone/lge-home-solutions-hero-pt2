# LGE Home Solutions — Hero PT2

Secondo sito indipendente per confrontare una futura hero alternativa. La copia iniziale è identica al sito locale del 29 ottobre 2026. La seconda versione usa ora una hero fotografica, con testo animato a sinistra e collegamento WhatsApp. Le card precedenti sono nella sezione «Le nostre soluzioni», subito dopo la hero e prima dei partner.

- Repository: https://github.com/NunzioMerone/lge-home-solutions-hero-pt2
- Demo: https://nunziomerone.github.io/lge-home-solutions-hero-pt2/
- Primo sito: https://nunziomerone.github.io/lge-home-solutions/

## Avvio locale

Node.js 22.12 o successivo. Eseguire `npm ci`, poi `npm run dev`: http://localhost:5177/. Dipendenze e configurazione sono separate dal sito originale.

## Verifiche

`npm run lint`, `npm test`, `npm run build`.

## Pubblicazione della demo

GitHub Actions pubblica sul percorso dedicato alla seconda versione. `VITE_PUBLIC_PREVIEW=true` conserva `noindex, nofollow` anche durante i cambi pagina. HTML e ingressi statici hanno lo stesso stato. Nome del pacchetto, porte locali e percorso di pubblicazione distinguono la copia; le due versioni mantengono hero indipendenti.

La Privacy Policy mantiene `approved: false`. Il controllo viene eseguito e segnalato nel workflow, ma è consultivo soltanto per questa demo pubblica non indicizzata, autorizzata per confrontare le hero. Il progetto originale mantiene il proprio controllo di pubblicazione.

Il manifest `references/hero-pt2-copy-manifest.json` registra gli hash dei 500 file di codice e asset al momento della copia. Documentazione del progetto di partenza: `references/SOURCE_README.md`.


## Hero fotografica

Desktop: prima immagine pulita fornita dall’utente, senza testi raster. Smartphone: inquadratura dedicata con parete laterale, vetrata intera e vista più aperta sulla pergola, ricavata dalla scena desktop con imagegen integrato. Tablet: precedente versione verticale senza testi o loghi incorporati. La variante con più parete resta conservata tra gli esperimenti e non viene più caricata. Il titolo resta HTML, con il blu ufficiale LGE e il corsivo condiviso; WhatsApp apre `https://wa.me/393346008313`.

Precedente revisione mobile del 29 ottobre, superata dalla composizione del 30 ottobre: la fotografia determina l’altezza della hero con la propria proporzione naturale, senza ingrandimenti o tagli tramite cover. Il bordo superiore si raccorda al fondo caldo con 60 px di respiro; divano, pavimento e pergola restano nella scena. Il testo è più compatto e WhatsApp usa un pulsante nel blu ufficiale, leggibile anche sopra la vetrata. Desktop e tablet restano invariati. I titoli delle card sono H3 sotto l’H2 «Le nostre soluzioni»; tutte le card sotto la hero sono differite. Il resto della homepage e le pagine interne non cambiano. Fonti, prompt e dimensioni: `references/hero-pt2-scene.json`; originali e derivati di lavoro in `references/hero-pt2-supplied/`.


### Titolo con entrata a fuoco — 30 ottobre 2026

Nel solo PT2 la macchina da scrivere è sostituita da frasi complete: ingresso a fuoco in 1,2 secondi, lettura per 3,2 secondi e uscita sfocata in 0,85 secondi, con una pausa di 0,1 secondi tra le frasi. «Il design che» compare una volta con un leggero effetto di messa a fuoco e poi resta fisso. Nessun cursore; spazio riservato dalla frase più lunga anche su mobile. La timeline GSAP si sospende fuori vista e quando la scheda è nascosta, riprende dallo stesso punto e viene rimossa al cambio pagina. Con movimento ridotto resta visibile la prima frase senza animazione. Foto, CTA e sezioni non cambiano.


### Hero mobile a schermo intero — 30 ottobre 2026

La hero su smartphone occupa `100svh`: immagine, titolo e WhatsApp sono visibili nella prima schermata. La nuova inquadratura mostra la vetrata intera sul lato destro e colloca il testo sulla parete verticale di sinistra, con meno soffitto. Dopo il primo riscontro dell’utente viene scelta una prospettiva più aperta per dare più respiro alla vetrata e rendere più leggibile la pergola esterna. Nessuna deformazione CSS della foto. Il testo usa dimensioni adatte alla colonna laterale e resta animato con il focus approvato. Fonti, prompt completi, originali e WebP ottimizzati sono elencati in `references/hero-mobile-room.json`. Desktop, tablet e primo sito non sono modificati.
