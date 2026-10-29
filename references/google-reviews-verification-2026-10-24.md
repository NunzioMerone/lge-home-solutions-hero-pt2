# Recensioni Google LGE

## Fonte verificata il 24 ottobre 2026

Scheda: **LGE HOME SOLUTIONS**, Via Roma 29, Monte di Procida. Valutazione pubblica: **5,0/5, 5 recensioni**.

[Apri le recensioni originali su Google Maps](https://www.google.com/maps/place/LGE+HOME+SOLUTIONS/@40.7940311,14.0532046,17z/data=!4m8!3m7!1s0x133b13b35654a357:0x440e66bcfc5c136a!8m2!3d40.7940311!4d14.0532046!9m1!1b1!16s%2Fg%2F12hlkhmp2).

La schermata pubblica è conservata in `google-reviews-2026-10-24.png`. I contenuti in `src/data/reviews.ts` sono una trascrizione manuale della scheda, nell'ordine visualizzato da Google: Carlo Sesti, Francesco Barbato, Giuseppe Manna, Sasi De Mari e Pasqualina Parascandola Ladonea. Il primo ha un commento testuale, il secondo mostra letteralmente «🔝 …», gli altri tre hanno soltanto la valutazione. Le date relative riproducono quanto mostrato alla data della verifica. Nessun commento è stato inventato, completato o trasformato in una citazione diversa.

Le iniziali colorate sono avatar di fallback dell'interfaccia, non fotografie degli utenti. Non sono presenti badge di recensione verificata. Il logo Google originale è scaricato da [Google Static](https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png) e ospitato in `public/img/reviews/google-g.png`.

## Collegamento attuale

Il riepilogo con il voto e le stelle apre la scheda reale, direttamente nella sezione recensioni. Su richiesta dell'utente sono stati eliminati i link testuali dalle schede, il collegamento inferiore, la nota sulla data di rilevazione e la dicitura per le recensioni senza commento. Data e provenienza restano nel dataset e in questa documentazione. La fonte è tipizzata `google-manual`; non ci sono chiamate API, scraping periodico, widget di terzi, chiavi o servizi a pagamento.

La sezione usa lo stesso fondo della hero, nomi leggermente più grandi e logo Google accostato al nome. I commenti oltre quattro righe sono troncati con puntini e si possono aprire e richiudere con «Leggi di più / Leggi di meno», anche da tastiera. Il riepilogo entra da destra con le altre animazioni della sezione; ogni recensione si alza leggermente al passaggio del puntatore. Il movimento ridotto disabilita questi spostamenti.

L'utente ha confermato di non avere una chiave Google Maps/Places. L'aggiornamento automatico **non è attivo**. Non è sufficiente aggiungere una chiave al progetto attuale: occorre implementare il caricamento ufficiale, la gestione degli errori e le attribuzioni prima di cambiare l'indicazione nell'interfaccia.

## Passaggio successivo per l'aggiornamento automatico

Per un'integrazione personalizzata coerente con questo layout, usare Google Maps JavaScript API con Places (New) e `Place.fetchFields`, richiedendo soltanto campi necessari a recensioni e riepilogo. Configurare prima il progetto Google Cloud del titolare, le API pertinenti e una chiave browser limitata ai domini autorizzati e alle API necessarie. Per la produzione Google richiede l'attivazione della fatturazione; definire budget e quote con il titolare prima dell'attivazione. Nessun account o costo è stato attivato durante questo intervento.

La risposta standard contiene fino a cinque recensioni ordinate per rilevanza: questo limite va comunicato nell'interfaccia. Mostrare le attribuzioni disponibili, i collegamenti agli autori e alle singole recensioni e il logo richiesto. Non conservare nel bundle una copia di risposte API per simulare un aggiornamento in tempo reale.

Documentazione ufficiale consultata:

- [Esempio Place Reviews](https://developers.google.com/maps/documentation/javascript/place-reviews).
- [Configurazione della chiave e fatturazione](https://developers.google.com/maps/documentation/javascript/get-api-key).
- [Attribuzioni e recensioni nella Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/policies).
- [Politiche Places e collegamenti alle fonti](https://developers.google.com/maps/documentation/places/web-service/policies).
