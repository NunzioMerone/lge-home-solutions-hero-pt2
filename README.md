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

GitHub Actions pubblica sul percorso dedicato alla seconda versione. `VITE_PUBLIC_PREVIEW=true` conserva `noindex, nofollow` anche durante i cambi pagina. HTML e ingressi statici hanno lo stesso stato. Nome del pacchetto, porte locali e percorso di pubblicazione distinguono la copia; codice visivo e asset restano identici.

La Privacy Policy mantiene `approved: false`. Il controllo viene eseguito e segnalato nel workflow, ma è consultivo soltanto per questa demo pubblica non indicizzata, autorizzata per confrontare le hero. Il progetto originale mantiene il proprio controllo di pubblicazione.

Il manifest `references/hero-pt2-copy-manifest.json` registra gli hash dei 500 file di codice e asset al momento della copia. Documentazione del progetto di partenza: `references/SOURCE_README.md`.


## Hero fotografica

Desktop: prima immagine pulita fornita dall’utente, senza testi raster. Smartphone: versione verticale ricavata dal terzo riferimento tramite lo strumento integrato imagegen, prima senza testi/loghi e poi con più parete chiara per abbassare e distanziare il testo. L’inquadratura originale pulita è usata sui tablet. Titolo e cursore restano HTML, con il blu ufficiale LGE e il corsivo condiviso; WhatsApp apre `https://wa.me/393346008313`.

Da mobile il blocco è più basso e ha margini maggiori tra gli elementi. La scena viene spostata leggermente verso il basso e sfumata sul bordo superiore, mantenendo il collegamento sulla parete chiara. I titoli delle card sono H3 sotto l’H2 «Le nostre soluzioni»; tutte le card sotto la hero sono differite. Il resto della homepage e le pagine interne non cambiano. Fonti, prompt e dimensioni: `references/hero-pt2-scene.json`; originali e derivati di lavoro in `references/hero-pt2-supplied/`.
