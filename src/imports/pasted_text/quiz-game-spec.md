Crea una web app interattiva e realmente funzionante per condurre dal vivo un quiz sul palco durante il Life Design Festival.

Non creare una presentazione statica e non limitarti a collegare una serie di schermate. Costruisci un’esperienza interattiva completa, con logica di gioco, stati, animazioni, timer, aiuti, progressione dei livelli e salvataggio locale.

L’esperienza deve essere utilizzabile direttamente tramite un unico link, senza login e senza backend, e deve essere progettata per la proiezione su uno schermo gigante in formato 16:9.

NOME DEL GIOCO

“Lascia il segno”

Sottotitolo:

“Il design quiz del Life Design Festival”

Claim di apertura:

“Quanto ne sai davvero di design, comunicazione visiva e cultura digitale?”

CONCEPT

Il quiz prende ispirazione dalla tensione e dalla chiarezza dei grandi quiz televisivi, ma deve avere un’identità originale, contemporanea, editoriale e coerente con il Life Design Festival.

Partecipa una singola persona oppure un piccolo team.

Per raggiungere la modalità finale, il partecipante deve rispondere correttamente a tre domande consecutive, una per ciascun livello.

Dopo la terza risposta corretta viene sbloccata la domanda finale “Design Super Hero”.

Se il partecipante risponde correttamente alla domanda Design Super Hero, vince un gadget o un premio messo a disposizione dal PUG!.

La domanda finale deve essere percepita come una prova suprema, ma deve rimanere ragionabile e accessibile. Non deve basarsi su una nozione estremamente tecnica, oscura o impossibile da conoscere.

FORMATO DELLA PARTITA

Ogni partita è composta al massimo da:

- Domanda 1: livello “Occhio allenato”.
- Domanda 2: livello “Mente progettuale”.
- Domanda 3: livello “Design Hero”.
- Domanda finale: modalità “Design Super Hero”.

Ogni domanda presenta quattro risposte: A, B, C e D.

Le prime tre domande diventano progressivamente più impegnative, ma devono restare adatte a un pubblico tecnico di designer, comunicatori, creativi e professionisti digitali.

La domanda Design Super Hero deve avere quattro risposte credibili e vicine tra loro. La difficoltà deve derivare dal ragionamento e dalla capacità di distinguere dettagli progettuali, non da una nozione inutilmente specialistica.

LOGICA DI PROGRESSIONE

La progressione deve funzionare così:

1. Il partecipante risponde correttamente alla prima domanda.
2. Mostra un breve momento di avanzamento:
   “OCCHIO ALLENATO — LIVELLO SUPERATO”.
3. Il layout evolve leggermente e viene caricata la seconda domanda.
4. Dopo la seconda risposta corretta mostra:
   “MENTE PROGETTUALE — LIVELLO SUPERATO”.
5. La grafica aumenta leggermente di intensità e viene caricata la terza domanda.
6. Dopo la terza risposta corretta mostra:
   “SEI UN DESIGN HERO”.
7. A questo punto avvia una transizione speciale e sblocca la modalità Design Super Hero.
8. Mostra la domanda finale.
9. Se la risposta finale è corretta, mostra la schermata di vittoria e il premio.
10. Se è errata, mostra comunque una conclusione positiva e rivela la risposta corretta.

Se il partecipante sbaglia una delle prime tre domande, la scalata termina.

Mostra:

“QUESTA TRACCIA SI INTERROMPE QUI”

Subito dopo rivela la risposta corretta con una spiegazione breve.

Aggiungi un pulsante “Chiudi la partita” e un pulsante riservato al presentatore “Concedi una seconda possibilità”.

La seconda possibilità deve essere un’opzione manuale e non la regola predefinita.

IDENTITÀ VISIVA

Prendi ispirazione dall’identità visiva di lifedesignfestival.it.

Palette principale:

- Avorio caldo: #F4EFE6
- Antracite: #262626
- Grigio caldo: #D4CEC4
- Rosa acceso: #FF75BF
- Viola elettrico: #7476F6
- Arancio: #E05738
- Bianco: #FFFFFF

Tipografia:

- Usa “Aquawax Fx” per titoli, numeri giganti e momenti spettacolari, se disponibile.
- Usa “Automat Grotesk” per domande, risposte, etichette e interfaccia, se disponibile.
- Se i font originali non sono disponibili, utilizza Bricolage Grotesque per i titoli e Space Grotesk per l’interfaccia.
- Non usare Inter come font principale.

Direzione artistica:

- Layout editoriale e sperimentale.
- Titoli molto grandi.
- Ampio spazio negativo.
- Linee sottili, archi, cerchi incompleti e segni grafici.
- Tracce che si estendono e cambiano a ogni livello.
- Piccoli rettangoli colorati che interrompono o attraversano le linee.
- Bordi sottili antracite.
- Composizioni asimmetriche ma molto leggibili.
- Nessun gradiente generico.
- Nessun glassmorphism.
- Nessuna estetica da gaming neon.
- Nessuna riproduzione dell’interfaccia blu di “Chi vuol essere milionario”.
- Evita fiamme realistiche, emoji, esplosioni e illustrazioni da videogame.

Usa variabili CSS per tutti i colori, spazi, raggi, dimensioni tipografiche e durate delle animazioni.

FORMATO E LEGGIBILITÀ

- Progetta prima per 1920×1080.
- Mantieni il rapporto 16:9.
- Adatta il layout a laptop e tablet.
- Ogni stato del gioco deve occupare una singola schermata.
- Non deve esserci scrolling durante la partita.
- Le domande devono essere leggibili da almeno 10–15 metri.
- Evita paragrafi lunghi.
- Mantieni sempre un contrasto elevato.
- Le risposte devono avere target cliccabili molto grandi.

SCHERMATA 1 — APERTURA

Mostra:

- Slot per il logo ufficiale del Life Design Festival.
- Titolo gigante “Lascia il segno”.
- Sottotitolo “Il design quiz”.
- Testo “Quattro livelli. Tre aiuti. Una domanda suprema.”
- Pulsante principale “Inizia il quiz”.
- Pulsante secondario “Impostazioni”.

Crea un’animazione iniziale in cui una linea attraversa lo schermo, compone alcune forme e infine rivela il titolo.

SCHERMATA 2 — IMPOSTAZIONI

Permetti al presentatore di configurare:

- Nome del partecipante o del team.
- Selezione manuale oppure casuale.
- Lista opzionale dei partecipanti.
- Timer: nessuno, 20, 30 o 45 secondi.
- Ordine casuale delle domande: attivo o disattivo.
- Modalità “Lascia il segno per sbloccare gli aiuti”: attiva o disattiva.
- Aiuti utilizzabili nella finale: attivi o disattivi.
- Nome del premio finale.

Usa come valore predefinito del premio:

“Gadget speciale offerto dal PUG!”

Se viene inserita una lista di nomi, aggiungi il pulsante “Estrai il concorrente”.

L’estrazione deve usare una breve animazione tipo roulette, con una durata massima di quattro secondi.

SCHERMATA 3 — REGOLE

Usa poco testo e una forte gerarchia visiva.

Testo principale:

“Una domanda. Quattro risposte. Una sola lascia il segno.”

Mostra la scalata:

- 01 — Occhio allenato
- 02 — Mente progettuale
- 03 — Design Hero
- 04 — Design Super Hero

Mostra i tre aiuti:

- 50:50
- Voce dal pubblico
- Chiedi al PUG!

Pulsante:

“Si gioca”

SCHERMATA DELLA DOMANDA

Mostra:

- Numero e livello della domanda.
- Categoria.
- Difficoltà.
- Domanda principale.
- Eventuale immagine o dettaglio visivo.
- Quattro risposte A, B, C e D.
- Timer.
- I tre aiuti disponibili.
- Una traccia grafica che rappresenta la progressione.

Le quattro risposte devono essere disposte in una griglia 2×2.

Ogni risposta deve avere gli stati:

- Default.
- Hover.
- Focus da tastiera.
- Selezionata.
- Confermata.
- Corretta.
- Errata.
- Eliminata dal 50:50.
- Disabilitata.

Quando viene selezionata una risposta, non mostrare immediatamente l’esito.

Mostra:

“È la tua risposta definitiva?”

Azioni:

- “Conferma”
- “Ci ripenso”

RISPOSTA CORRETTA

Quando la risposta è corretta:

- Evidenzia la risposta con viola #7476F6 o rosa #FF75BF.
- Mostra anche un’icona di conferma e la parola “CORRETTA”.
- Anima la traccia di progressione.
- Mostra una spiegazione di massimo tre righe.
- Avanza al livello successivo.

Il passaggio di livello deve durare circa due secondi e deve creare attesa senza rallentare eccessivamente il ritmo.

RISPOSTA ERRATA

Quando la risposta è errata:

- Evidenzia la scelta in arancio #E05738.
- Mostra un’icona e la parola “ERRATA”.
- Evidenzia successivamente la risposta corretta in viola.
- Mostra una spiegazione di massimo tre righe.
- Non utilizzare animazioni o messaggi umilianti.

PROGRESSIONE VISIVA DEI LIVELLI

L’interfaccia deve evolvere gradualmente.

Livello 1 — Occhio allenato:

- Fondo avorio.
- Traccia sottile antracite.
- Un solo accento viola.
- Composizione pulita e calma.

Livello 2 — Mente progettuale:

- Aggiungi un secondo livello di linee.
- Introduci piccoli elementi rosa.
- Aumenta leggermente il movimento.
- La traccia diventa più complessa.

Livello 3 — Design Hero:

- Usa maggiormente viola, rosa e arancio.
- Aggiungi archi e segmenti che convergono verso la domanda.
- La grafica comunica che il traguardo è vicino.
- Mantieni però il fondo avorio e la leggibilità.

SBLOCCO DELLA MODALITÀ DESIGN SUPER HERO

Dopo la terza risposta corretta non mostrare immediatamente la domanda finale.

Crea un’interstitial teatrale di 4–5 secondi.

Sequenza:

1. Tutti gli elementi dell’interfaccia si fermano.
2. La traccia di progressione raggiunge il centro dello schermo.
3. Il fondo avorio si spegne gradualmente e diventa antracite.
4. La traccia cambia colore e diventa incandescente.
5. Linee rosa, arancio e viola salgono dalla parte inferiore dello schermo.
6. Le linee convergono e costruiscono un emblema astratto.
7. Appare il testo gigante:
   “DESIGN SUPER HERO”
8. Mostra:
   “Hai superato la scalata.”
9. Mostra:
   “Ora puoi lasciare una traccia indelebile.”
10. Mostra il premio in palio.
11. Pulsante:
    “Affronta la domanda suprema”

Non utilizzare fiamme realistiche.

L’effetto deve ricordare calore, energia e accensione attraverso:

- Linee ondulate.
- Tracce luminose.
- Distorsioni leggere.
- Piccole vibrazioni tipografiche.
- Segmenti che accelerano.
- Contorni sovrapposti.
- Pulsazioni cromatiche.

Chiama internamente questo trattamento grafico:

“Traccia incandescente”

MODALITÀ DESIGN SUPER HERO

Questa modalità deve distinguersi chiaramente da tutte le altre.

Aspetto:

- Fondo antracite #262626.
- Testi avorio #F4EFE6.
- Accenti rosa, viola e arancio.
- Cornice della domanda formata da linee animate.
- Grande etichetta “DOMANDA SUPREMA”.
- Emblema Design Super Hero sempre visibile.
- Timer più teatrale.
- Traccia incandescente animata nella parte bassa dello schermo.
- Movimento continuo ma discreto.
- Nessuna animazione deve compromettere la lettura.

Prima di mostrare le risposte, presenta la domanda da sola per circa due secondi.

Successivamente fai comparire le quattro risposte una alla volta, con intervalli molto brevi.

Non modificare casualmente l’ordine delle risposte dopo che sono apparse.

Mostra il premio in palio in modo discreto:

“IN PALIO — [nome del premio]”

La domanda deve sembrare molto difficile, ma essere risolvibile attraverso conoscenza generale del design, osservazione o ragionamento.

Le opzioni errate devono essere plausibili, ma non volutamente ingannevoli.

AIUTI

Ogni aiuto può essere usato una sola volta durante l’intera partita.

Gli aiuti non utilizzati nelle prime tre domande possono essere portati nella modalità Design Super Hero, se questa opzione è attiva nelle impostazioni.

Dopo l’utilizzo, l’aiuto deve apparire attraversato da una linea e non deve essere più cliccabile.

AIUTO 1 — 50:50

- Elimina due risposte errate.
- Mantieni la risposta corretta e una risposta errata.
- Metti il timer in pausa durante l’animazione.
- Attraversa le risposte eliminate con una traccia animata.
- Riavvia il timer al termine.

AIUTO 2 — VOCE DAL PUBBLICO

- Metti in pausa il timer.
- Mostra “Scegli una voce dal pubblico”.
- Mostra un countdown di 20 secondi.
- Il presentatore sceglie fisicamente una persona.
- Non raccogliere voti digitali.
- Al termine mostra “Torna alla domanda”.

AIUTO 3 — CHIEDI AL PUG!

- Metti in pausa il timer.
- Mostra:
  “Uno speaker o un membro del PUG può darti un solo indizio.”
- Mostra:
  “Non può pronunciare direttamente una delle quattro risposte.”
- Avvia un countdown di 20 secondi.
- Usa una grande lettera “P” circondata da linee animate.
- Al termine mostra:
  “L’indizio è stato lasciato.”

MODALITÀ OPZIONALE “LASCIA IL SEGNO”

Se questa modalità è disattivata, gli aiuti possono essere utilizzati direttamente.

Se è attivata, prima di utilizzare un aiuto il partecipante deve superare una micro-sfida creativa di 10 secondi.

Estrai casualmente una sfida:

- “Mima uno swipe, un pinch o un drag e fallo indovinare.”
- “Nomina tre font sans-serif.”
- “Disegna nell’aria un’icona riconoscibile.”
- “Descrivi un brand famoso senza dire il suo nome.”
- “Indica tre elementi sul palco dello stesso colore.”
- “Spiega la differenza tra logo e brand in una frase.”
- “Nomina tre principi di buona usabilità.”
- “Trasforma un oggetto sul palco in un pittogramma con le mani.”

Mostra:

- “PRIMA, LASCIA IL SEGNO”
- Testo della sfida.
- Countdown di 10 secondi.
- Pulsante “Sfida completata”.
- Pulsante secondario “Salta”.

La verifica è manuale e viene effettuata dal presentatore.

Non utilizzare microfono, videocamera, riconoscimento vocale o sistemi automatici.

Dopo la conferma mostra:

“AIUTO SBLOCCATO”

DOMANDA DESIGN SUPER HERO CORRETTA

Crea un momento di vittoria della durata di circa sei secondi.

Sequenza:

1. Il timer si ferma.
2. La risposta corretta diventa avorio con bordo rosa e viola.
3. L’emblema Design Super Hero si completa.
4. La traccia incandescente attraversa tutto lo schermo.
5. Il fondo torna brevemente avorio con un flash morbido.
6. Mostra:
   “HAI LASCIATO UNA TRACCIA INDELEBILE”
7. Mostra:
   “[nome partecipante o team] è un DESIGN SUPER HERO”
8. Mostra:
   “HAI VINTO”
9. Mostra il nome del premio.
10. Aggiungi il pulsante “Celebra la vittoria”.

Crea una composizione celebrativa fatta di linee, archi e blocchi colorati.

Non usare coriandoli tradizionali.

DOMANDA DESIGN SUPER HERO ERRATA

Mostra prima la risposta scelta e successivamente quella corretta.

Testo principale:

“ANCHE GLI HERO RIDISEGNANO LA ROTTA”

Testo secondario:

“Sei arrivato fino alla domanda suprema.”

Mostra una spiegazione breve della risposta.

Mantieni un tono positivo e celebrativo.

Non mostrare “Game Over”.

SCHERMATA FINALE

Mostra:

- Nome del partecipante o del team.
- Livello raggiunto.
- Numero di risposte corrette.
- Aiuti utilizzati.
- Premio vinto oppure “Premio sfiorato”.
- Breve riepilogo delle risposte.

Frasi finali:

Se vince:

“Una traccia impossibile da ignorare.”

Se raggiunge la finale ma non vince:

“La traccia c’è. Il prossimo segno sarà quello decisivo.”

Se termina prima:

“Ogni grande progetto comincia da una prima traccia.”

Azioni:

- “Nuova partita”
- “Rivedi le risposte”
- “Torna alla home”

CONTROLLI DA PALCO

Il presentatore deve poter controllare il gioco principalmente da tastiera.

Scorciatoie:

- 1, 2, 3, 4: seleziona A, B, C o D.
- Invio: conferma o prosegue.
- Escape: annulla o chiude un overlay.
- F: usa 50:50.
- A: usa Voce dal pubblico.
- P: usa Chiedi al PUG.
- Spazio: pausa o riavvia il timer.
- Freccia destra: prosegue.
- Freccia sinistra: torna indietro.
- H: mostra o nasconde le scorciatoie.
- R: apre la richiesta di reset.

Non eseguire il reset premendo una sola volta R. Mostra sempre una conferma.

Aggiungi anche controlli cliccabili grandi, ma visivamente discreti.

DATI DELLE DOMANDE

Salva tutte le domande in un array JavaScript semplice da modificare.

Usa questa struttura:

{
id: 1,
stage: 1,
type: "standard",
category: "Typography",
difficulty: "Accessibile",
question: "Quale termine indica lo spazio tra due specifiche lettere?",
image: null,
answers: [
"Interlinea",
"Kerning",
"Tracking",
"Baseline"
],
correctAnswer: 1,
explanation: "Il kerning regola lo spazio tra due lettere specifiche."
}

Per le domande finali usa:

{
id: 101,
stage: 4,
type: "superhero",
category: "Visual Design",
difficulty: "Suprema",
question: "Testo della domanda finale",
image: null,
answers: [
"Risposta A",
"Risposta B",
"Risposta C",
"Risposta D"
],
correctAnswer: 0,
explanation: "Spiegazione breve e chiara.",
reasoningHint: "Principio progettuale necessario per arrivare alla risposta."
}

Crea un question bank dimostrativo con:

- Almeno 6 domande per il livello 1.
- Almeno 6 domande per il livello 2.
- Almeno 6 domande per il livello 3.
- Almeno 6 domande Design Super Hero.

Argomenti:

- Tipografia.
- Branding.
- UX e UI.
- Accessibilità.
- Teoria del colore.
- Storia del graphic design.
- Iconografia.
- Design system.
- Comunicazione visiva.
- Cultura digitale.

Mescola domande testuali e visive.

Le domande Design Super Hero devono:

- Essere difficili ma raggiungibili.
- Premiare il ragionamento.
- Evitare date o nomi estremamente oscuri.
- Evitare trabocchetti linguistici.
- Avere una sola risposta inequivocabilmente corretta.
- Includere una spiegazione verificabile.
- Avere quattro alternative plausibili.

PERSISTENZA

Salva in localStorage:

- Nome del partecipante o team.
- Livello corrente.
- Domande già utilizzate.
- Risposte date.
- Aiuti utilizzati.
- Timer.
- Modalità scelta.
- Premio impostato.
- Stato della partita.

Se la pagina viene ricaricata accidentalmente, mostra:

“C’è una partita in corso”

Azioni:

- “Riprendi”
- “Ricomincia”

Non cancellare automaticamente la partita.

ACCESSIBILITÀ E QUALITÀ

- Contrasto minimo WCAG AA.
- Non comunicare corretto o errato soltanto attraverso il colore.
- Focus da tastiera sempre visibile.
- Supporta “prefers-reduced-motion”.
- Usa testi grandi.
- Usa pulsanti ampi.
- Impedisci doppi click.
- Impedisci conferme accidentali.
- Metti in pausa il timer quando è aperto un overlay.
- Nessun login.
- Nessun backend.
- Nessuna API esterna.
- Nessun microfono.
- Nessuna videocamera.
- Nessuno scrolling durante il gioco.
- Non mostrare mai la risposta corretta prima della conferma.
- Tutto deve funzionare tramite un unico link.

RISULTATO ATTESO

Genera una web app giocabile dall’inizio alla fine e non un semplice mockup.

Implementa e verifica:

- Home.
- Impostazioni.
- Estrazione casuale.
- Regole.
- Tre livelli standard.
- Progressione dopo ogni risposta corretta.
- Fine della scalata dopo una risposta errata.
- Seconda possibilità manuale.
- Tutti e tre gli aiuti.
- Sfide opzionali per sbloccare gli aiuti.
- Timer.
- Scorciatoie da tastiera.
- Sblocco Design Super Hero.
- Transizione “Traccia incandescente”.
- Domanda suprema.
- Vittoria con premio.
- Finale positiva in caso di errore.
- Persistenza locale.
- Reset con conferma.
- Responsive design.
- Accessibilità.
- Assenza di contenuti tagliati in 16:9.

Prima di terminare, simula almeno una partita completa vinta e una partita terminata con una risposta errata. Correggi ogni stato incompleto o non funzionante.
