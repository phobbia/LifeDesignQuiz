import type { Question } from '../types';

/**
 * ─── Banca domande ───
 *
 * Criteri di scrittura (validi per ogni domanda aggiunta in futuro):
 *
 * 1. I tre distrattori devono essere PLAUSIBILI e di lunghezza paragonabile
 *    alla risposta corretta. Niente opzioni liquidatorie (“Niente”,
 *    “Non esiste”): riducono una domanda a quattro opzioni in una a due, e
 *    rendono la risposta indovinabile senza sapere nulla di design.
 * 2. Dove possibile i distrattori sono concetti VERI ma fuori posto (per
 *    esempio la legge di Fitts come distrattore della legge di Hick):
 *    sbagliare insegna qualcosa.
 * 3. La posizione della risposta corretta qui è irrilevante: il motore
 *    rimescola le quattro opzioni a ogni estrazione (vedi
 *    `getRandomQuestion`). È comunque variata anche nel sorgente, per
 *    leggibilità in fase di revisione.
 * 4. Gli id seguono il livello: 1xx → livello 1, 2xx → livello 2 e così via.
 *    `getRandomQuestion` ricava il livello dall'id quando ricicla un pool
 *    esaurito, quindi la convenzione va rispettata.
 * 5. Le domande con campioni visivi (`visual`, `answerVisuals`) citano le
 *    chiavi definite in `data/visuals.tsx`.
 */
export const questions: Question[] = [
  // ══════════════════════════════════════════════════════════
  // LIVELLO 1 — Occhio allenato
  // ══════════════════════════════════════════════════════════
  {
    id: 101,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Qual è la differenza principale tra un logo e un marchio?",
    image: null,
    answers: [
      "Il marchio è la versione registrata del logo presso gli uffici brevetti",
      "Il logo è il segno grafico, il marchio è tutto il sistema di identità",
      "Il logo si usa sul digitale, il marchio sulla carta stampata",
      "Il marchio è la declinazione animata del logo per i video",
    ],
    correctAnswer: 1,
    explanation:
      "Il logo è la rappresentazione grafica: simbolo, logotipo o loro combinazione. Il marchio comprende anche nome, palette, tipografia, tono di voce e comportamenti: il logo ne è soltanto la punta visibile.",
  },
  {
    id: 102,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Quale insieme di regole non può mancare in un manuale di identità?",
    image: null,
    answers: [
      "Il listino prezzi aggiornato dei prodotti presenti a catalogo",
      "L'elenco dei fornitori di stampa autorizzati dall'azienda",
      "Spazio di rispetto, palette, tipografia e usi non consentiti",
      "La storia del fondatore e le tappe principali dell'azienda",
    ],
    correctAnswer: 2,
    explanation:
      "Un manuale serve a far applicare correttamente l'identità da chi non l'ha progettata: servono le regole operative, e soprattutto gli usi vietati, che sono la parte più spesso ignorata.",
  },
  {
    id: 103,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Cosa significa “brand consistency”?",
    image: null,
    answers: [
      "Mantenere gli stessi segni e lo stesso tono su tutti i punti di contatto",
      "Pubblicare contenuti con la stessa frequenza su tutti i canali",
      "Affidare ogni progetto sempre allo stesso studio di progettazione",
      "Usare un unico colore in tutte le applicazioni del marchio",
    ],
    correctAnswer: 0,
    explanation:
      "La coerenza riguarda il sistema, non la ripetizione identica: uno stesso marchio può declinarsi in modi diversi purché restino riconoscibili segni, tono e regole compositive.",
  },
  {
    id: 104,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Che ruolo ha la versione monocromatica di un marchio?",
    image: null,
    answers: [
      "È un ripiego da usare solo quando la stampa a colori costa troppo",
      "È una scelta tipica dei soli marchi del settore tecnologico",
      "È sconsigliata, perché indebolisce il riconoscimento del marchio",
      "È indispensabile: il marchio deve reggere anche senza colore",
    ],
    correctAnswer: 3,
    explanation:
      "Timbri, incisioni, serigrafie, fondi fotografici complessi: esistono decine di contesti senza colore. Se un marchio funziona solo a colori, il disegno di partenza è debole.",
  },
  {
    id: 105,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Cos'è il “brand voice”?",
    image: null,
    answers: [
      "Lo speaker scelto per gli spot radiofonici e televisivi",
      "Il tono di voce coerente con cui il marchio parla in ogni messaggio",
      "Il suono distintivo che accompagna il logo animato",
      "Il modo in cui il pubblico pronuncia il nome del marchio",
    ],
    correctAnswer: 1,
    explanation:
      "Il brand voice è la personalità linguistica del marchio: resta costante, mentre il tono si adatta al contesto. Lo stesso marchio è ironico in campagna e asciutto in un messaggio di errore, ma resta riconoscibile.",
  },
  {
    id: 106,
    stage: 1,
    type: 'standard',
    category: 'Teoria del colore',
    difficulty: 'Accessibile',
    question: "Quanti colori primari conviene definire in una palette di marca?",
    image: null,
    answers: [
      "Almeno dieci, per coprire ogni possibile applicazione",
      "Uno soltanto, perché due colori generano sempre confusione",
      "Pochi, di norma da uno a tre, per restare riconoscibili",
      "Dipende dal numero di prodotti presenti a catalogo",
    ],
    correctAnswer: 2,
    explanation:
      "Il riconoscimento cromatico si costruisce per sottrazione: pochi colori portanti, ripetuti con disciplina, più una palette di supporto per stati e gerarchie secondarie.",
  },
  {
    id: 107,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Cos'è un “brand archetype”?",
    image: null,
    answers: [
      "Un modello di personalità che orienta tono, segni e comportamenti",
      "Un file modello per costruire rapidamente le declinazioni del logo",
      "La prima versione storica del marchio, poi abbandonata",
      "Lo schema che regola le dimensioni minime di riproduzione",
    ],
    correctAnswer: 0,
    explanation:
      "Dagli archetipi di matrice junghiana (l'Eroe, il Saggio, il Ribelle, il Creatore) si ricava una personalità coerente che guida le scelte visive e verbali invece di lasciarle al gusto del momento.",
  },
  {
    id: 108,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Quale caratteristica rende un logo longevo?",
    image: null,
    answers: [
      "La ricchezza di dettagli, che lo rende difficile da imitare",
      "L'aderenza allo stile grafico del momento in cui nasce",
      "La semplicità e la versatilità, che lo rendono leggibile a ogni scala",
      "La saturazione elevata dei colori, che cattura l'attenzione",
    ],
    correctAnswer: 2,
    explanation:
      "Un marchio deve funzionare a sedici pixel come su una facciata. La semplicità è ciò che gli permette di attraversare i decenni senza sembrare datato: i dettagli invecchiano, le forme essenziali no.",
  },
  {
    id: 109,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "In un rebrand, cosa conviene conservare?",
    image: null,
    answers: [
      "Il nome, ripartendo da zero su tutto il resto del sistema",
      "Esattamente metà degli elementi dell'identità precedente",
      "Il logo, cambiando soltanto la palette e la tipografia",
      "Gli elementi che il pubblico riconosce e associa già al marchio",
    ],
    correctAnswer: 3,
    explanation:
      "Un rebrand che cancella tutto butta via anni di riconoscimento accumulato. Si individuano gli asset distintivi — un colore, una forma, un dettaglio — e si costruisce il nuovo attorno a quelli.",
  },
  {
    id: 110,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Quale fattore pesa di più sul riconoscimento di un marchio?",
    image: null,
    answers: [
      "La coerenza dei segni ripetuta nel tempo",
      "Il volume di investimento pubblicitario dell'ultimo anno",
      "Il numero di elementi grafici che compongono il logo",
      "Il posizionamento di prezzo rispetto ai concorrenti diretti",
    ],
    correctAnswer: 0,
    explanation:
      "La memoria visiva si costruisce per accumulo di ripetizioni coerenti. Un investimento forte ma discontinuo produce molta meno riconoscibilità di una presenza modesta e costante.",
  },
  {
    id: 111,
    stage: 1,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Accessibile',
    question: "Cos'è lo spazio di rispetto (clear space) di un marchio?",
    image: null,
    answers: [
      "Il margine bianco lasciato ai bordi di un documento stampato",
      "L'area minima libera da altri elementi che deve circondare il marchio",
      "Lo spazio riservato al marchio nella pagina pubblicitaria acquistata",
      "La distanza minima da cui il marchio resta ancora leggibile",
    ],
    correctAnswer: 1,
    explanation:
      "Il clear space si misura di solito in unità ricavate dal marchio stesso, per esempio l'altezza di una lettera del logotipo: così resta proporzionale a qualsiasi dimensione di riproduzione.",
  },
  {
    id: 112,
    stage: 1,
    type: 'standard',
    category: 'UX Design',
    difficulty: 'Accessibile',
    question: "Cosa afferma la legge di Fitts nel design delle interfacce?",
    image: null,
    answers: [
      "I testi centrati vengono letti più rapidamente di quelli allineati",
      "Le icone devono avere un significato universalmente comprensibile",
      "Il tempo per raggiungere un bersaglio dipende da distanza e dimensione",
      "Il colore è il primo elemento che guida l'attenzione dell'utente",
    ],
    correctAnswer: 2,
    explanation:
      "Più un elemento è grande e vicino al punto di partenza, più è rapido raggiungerlo. È il motivo per cui le azioni principali hanno pulsanti generosi e i bordi dello schermo sono posizioni privilegiate.",
  },
  {
    id: 113,
    stage: 1,
    type: 'standard',
    category: 'Iconografia',
    difficulty: 'Accessibile',
    question: "Che cosa distingue un pittogramma da un'icona di interfaccia?",
    image: null,
    answers: [
      "Il pittogramma comunica un concetto in modo stilizzato e universale",
      "Il pittogramma è stampato, l'icona esiste solo in ambito digitale",
      "Il pittogramma è sempre monocromatico, l'icona sempre a colori",
      "Il pittogramma ha dimensioni fisse, l'icona è ridimensionabile",
    ],
    correctAnswer: 0,
    explanation:
      "Il pittogramma punta alla comprensione senza testo e senza lingua: segnaletica, aeroporti, sicurezza. L'icona di interfaccia vive dentro un contesto che ne chiarisce il significato.",
  },

  // ─── Livello 1: domande visive ───
  {
    id: 150,
    stage: 1,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Accessibile',
    question: "Quale di queste quattro composizioni ha la crenatura corretta?",
    image: null,
    answers: ['Crenatura corretta', 'Coppie troppo aperte', 'Coppie troppo chiuse', 'Crenatura irregolare'],
    answerVisuals: ['kern-ok', 'kern-aperto', 'kern-stretto', 'kern-irregolare'],
    correctAnswer: 0,
    explanation:
      "Nelle coppie T-A e A-V le forme diagonali e orizzontali lasciano un vuoto ottico: vanno avvicinate. Le altre versioni aprono troppo, schiacciano le lettere o alternano spazi diversi, spezzando il ritmo della parola.",
  },
  {
    id: 151,
    stage: 1,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Accessibile',
    question: "Quale di queste righe è composta con un carattere monospaziato?",
    image: null,
    answers: ['La prima', 'La seconda', 'La terza', 'La quarta'],
    answerVisuals: ['mono-vero', 'mono-falso-body', 'mono-falso-display', 'mono-falso-medium'],
    correctAnswer: 0,
    explanation:
      "In un monospaziato ogni carattere occupa la stessa larghezza: la “i” e la “l” ricevono lo stesso spazio della “m” e della “w”. Guardando “wifi illimitato” la differenza salta subito all'occhio.",
  },

  // ══════════════════════════════════════════════════════════
  // LIVELLO 2 — Mente progettuale
  // ══════════════════════════════════════════════════════════
  {
    id: 201,
    stage: 2,
    type: 'standard',
    category: 'Cultura digitale',
    difficulty: 'Intermedia',
    question: "Cosa significa “responsive design”?",
    image: null,
    answers: [
      "Un'interfaccia che reagisce con animazioni al passaggio del mouse",
      "Un sito che carica le proprie pagine più in fretta della media",
      "Un progetto che si adatta alle richieste del committente in corsa",
      "Un layout che si riorganizza in base alla dimensione dello schermo",
    ],
    correctAnswer: 3,
    explanation:
      "Il responsive design combina griglie fluide, immagini flessibili e media query per adattare la stessa pagina a qualsiasi schermo. Non è un adattamento estetico: cambia la struttura.",
  },
  {
    id: 202,
    stage: 2,
    type: 'standard',
    category: 'UX Design',
    difficulty: 'Intermedia',
    question: "Quale principio è alla base dell'esperienza utente?",
    image: null,
    answers: [
      "Partire dai bisogni reali delle persone e progettare di conseguenza",
      "Sorprendere l'utente con soluzioni di interazione mai viste prima",
      "Adottare per primi ogni nuova tecnologia che diventa disponibile",
      "Ridurre al minimo il numero di schermate che compongono il prodotto",
    ],
    correctAnswer: 0,
    explanation:
      "L'esperienza utente nasce dalla ricerca, non dall'intuizione del progettista. Le soluzioni originali valgono solo se rispondono a un bisogno osservato: altrimenti sono attrito travestito da innovazione.",
  },
  {
    id: 203,
    stage: 2,
    type: 'standard',
    category: 'Cultura digitale',
    difficulty: 'Intermedia',
    question: "Cos'è l'“above the fold” di una pagina?",
    image: null,
    answers: [
      "L'intestazione fissa che resta in alto durante lo scorrimento",
      "La porzione di pagina visibile prima di iniziare a scorrere",
      "Il primo blocco di contenuto indicizzato dai motori di ricerca",
      "La sezione che si apre al clic su un menu a tendina",
    ],
    correctAnswer: 1,
    explanation:
      "Il termine viene dai quotidiani, che in edicola si vedevano piegati a metà: contava solo la parte sopra la piega. Sul web il confine cambia con ogni dispositivo, quindi va inteso come principio, non come misura.",
  },
  {
    id: 204,
    stage: 2,
    type: 'standard',
    category: 'Accessibilità',
    difficulty: 'Intermedia',
    question: "Quale accorgimento migliora davvero l'accessibilità di un sito?",
    image: null,
    answers: [
      "Un carattere di dimensione fissa, uguale su tutti i dispositivi",
      "Una versione alternativa del sito dedicata agli utenti con disabilità",
      "Un rapporto di contrasto sufficiente tra il testo e il suo sfondo",
      "Un'animazione che accompagna l'utente attraverso la pagina",
    ],
    correctAnswer: 2,
    explanation:
      "Il contrasto è il requisito che riguarda più persone: non solo chi ha problemi di vista, ma chiunque legga su uno schermo al sole. La versione separata “per disabili” è invece una cattiva pratica, perché isola e invecchia.",
  },
  {
    id: 205,
    stage: 2,
    type: 'standard',
    category: 'Cultura digitale',
    difficulty: 'Intermedia',
    question: "Quale griglia è diventata lo standard di fatto nel web?",
    image: null,
    answers: [
      "Sette colonne, come nei quotidiani a foglio grande",
      "Cinque colonne, per rispettare le proporzioni auree",
      "Quattro colonne, una per ciascuna dimensione di schermo",
      "Dodici colonne, perché si divide in due, tre, quattro e sei",
    ],
    correctAnswer: 3,
    explanation:
      "Dodici è il numero con più divisori utili in quell'intervallo: permette layout a metà, a terzi, a quarti e a sesti senza mai spezzare la griglia. Per questo è alla base della maggior parte dei framework.",
  },
  {
    id: 206,
    stage: 2,
    type: 'standard',
    category: 'Cultura digitale',
    difficulty: 'Intermedia',
    question: "Cosa indica la sigla CTA in un'interfaccia?",
    image: null,
    answers: [
      "Content Type Analysis: la classificazione dei contenuti del sito",
      "Call To Action: l'elemento che invita l'utente a compiere un'azione",
      "Click Through Average: la media dei clic ricevuti da una pagina",
      "Central Text Area: la colonna principale di un layout a griglia",
    ],
    correctAnswer: 1,
    explanation:
      "Una buona call to action descrive il risultato dell'azione, non il gesto: “Scarica il programma” funziona meglio di “Clicca qui”, perché dice all'utente dove sta andando.",
  },
  {
    id: 207,
    stage: 2,
    type: 'standard',
    category: 'Cultura digitale',
    difficulty: 'Intermedia',
    question: "Quali dati servono per valutare un sito oltre al suo aspetto?",
    image: null,
    answers: [
      "Numero di immagini, peso dei file e tavolozza cromatica impiegata",
      "Quantità di pagine pubblicate e frequenza degli aggiornamenti",
      "Frequenza di rimbalzo, tempo sulla pagina e tasso di conversione",
      "Numero di caratteri tipografici e di livelli di titolo utilizzati",
    ],
    correctAnswer: 2,
    explanation:
      "Sono le metriche che descrivono il comportamento reale delle persone. Un sito bellissimo con un rimbalzo del novanta per cento sta fallendo, e nessuna valutazione estetica lo rivelerebbe.",
  },
  {
    id: 208,
    stage: 2,
    type: 'standard',
    category: 'UX Design',
    difficulty: 'Intermedia',
    question: "A cosa serve un wireframe?",
    image: null,
    answers: [
      "A definire struttura, gerarchia e funzioni prima della veste grafica",
      "A mostrare al committente i colori definitivi del progetto",
      "A generare automaticamente il codice HTML della pagina",
      "A elencare le tecnologie con cui il sito sarà sviluppato",
    ],
    correctAnswer: 0,
    explanation:
      "Il wireframe toglie di mezzo colore e stile proprio per costringere a discutere ciò che conta: cosa c'è, dove sta, quanto pesa. Se la discussione finisce sui colori, il wireframe è troppo rifinito.",
  },
  {
    id: 209,
    stage: 2,
    type: 'standard',
    category: 'UX Design',
    difficulty: 'Intermedia',
    question: "Cosa afferma la legge di Hick?",
    image: null,
    answers: [
      "Più un bersaglio è grande e vicino, più rapidamente si raggiunge",
      "Le persone ricordano meglio il primo e l'ultimo elemento di un elenco",
      "Un compito interrotto resta in memoria più a lungo di uno concluso",
      "Più crescono le opzioni disponibili, più si allunga il tempo di scelta",
    ],
    correctAnswer: 3,
    explanation:
      "Le altre tre opzioni sono leggi vere ma diverse: quella di Fitts, l'effetto di posizione seriale e l'effetto Zeigarnik. La legge di Hick è il motivo per cui un menu con trenta voci paralizza più di uno con cinque.",
  },
  {
    id: 210,
    stage: 2,
    type: 'standard',
    category: 'Cultura digitale',
    difficulty: 'Intermedia',
    question: "Cosa vuol dire progettare “mobile first”?",
    image: null,
    answers: [
      "Realizzare un prodotto destinato esclusivamente ai telefoni",
      "Ottimizzare prima il sito desktop e poi ridurlo per il telefono",
      "Partire dallo schermo piccolo e ampliare verso quello grande",
      "Pubblicare prima l'applicazione e poi la versione per desktop",
    ],
    correctAnswer: 2,
    explanation:
      "Partire dal vincolo più stretto obbliga a decidere cosa è essenziale. Il percorso inverso — disegnare il desktop e poi comprimerlo — è un approccio diverso e storicamente meno efficace.",
  },
  {
    id: 211,
    stage: 2,
    type: 'standard',
    category: 'Accessibilità',
    difficulty: 'Intermedia',
    question: "Quale attributo di un'immagine conta per accessibilità e indicizzazione?",
    image: null,
    answers: [
      "L'attributo title, che mostra un suggerimento al passaggio del mouse",
      "L'attributo src, che indica il percorso del file da caricare",
      "L'attributo style, che ne definisce l'aspetto dentro la pagina",
      "L'attributo alt, che descrive a parole il contenuto dell'immagine",
    ],
    correctAnswer: 3,
    explanation:
      "Il testo alternativo è ciò che uno screen reader legge ad alta voce ed è anche ciò che i motori di ricerca interpretano. Va descritto il contenuto, non il file: “grafico delle vendite in crescita”, non “immagine1”.",
  },
  {
    id: 212,
    stage: 2,
    type: 'standard',
    category: 'Accessibilità',
    difficulty: 'Intermedia',
    question: "Cosa significa progettare in modo inclusivo?",
    image: null,
    answers: [
      "Tenere conto della varietà di abilità, contesti e situazioni d'uso",
      "Aggiungere funzioni dedicate agli utenti con disabilità permanenti",
      "Coinvolgere il committente in ogni fase della progettazione",
      "Offrire il prodotto tradotto in tutte le lingue principali",
    ],
    correctAnswer: 0,
    explanation:
      "Le limitazioni non sono solo permanenti: chi ha un braccio ingessato, chi tiene in braccio un bambino o chi usa il telefono al sole ha bisogni simili. Progettare per i casi estremi migliora il prodotto per tutti.",
  },
  {
    id: 213,
    stage: 2,
    type: 'standard',
    category: 'Ricerca UX',
    difficulty: 'Intermedia',
    question: "Cos'è una “user persona”?",
    image: null,
    answers: [
      "Un personaggio inventato per le campagne pubblicitarie del prodotto",
      "Il cliente tipo descritto a memoria dall'ufficio commerciale",
      "Il testimonial scelto per rappresentare il marchio sui canali",
      "Un profilo sintetico di utente costruito a partire da ricerche reali",
    ],
    correctAnswer: 3,
    explanation:
      "La persona è uno strumento di sintesi, non di fantasia: nasce da interviste e dati. Una persona inventata a tavolino serve solo a dare un volto rassicurante alle opinioni di chi l'ha scritta.",
  },
  {
    id: 214,
    stage: 2,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Intermedia',
    question: "Su cosa si costruisce una griglia di base (baseline grid)?",
    image: null,
    answers: [
      "Su un valore fisso di dodici pixel valido per qualsiasi progetto",
      "Su multipli dell'interlinea del testo corrente del progetto",
      "Sull'altezza delle maiuscole del carattere principale scelto",
      "Su una suddivisione in quattro punti tipografici per riga",
    ],
    correctAnswer: 1,
    explanation:
      "La griglia di base allinea il testo di colonne e pagine diverse sulle stesse linee di base. Il passo si ricava dall'interlinea del testo corrente: non esiste un valore universale.",
  },
  {
    id: 215,
    stage: 2,
    type: 'standard',
    category: 'Design System',
    difficulty: 'Intermedia',
    question: "Come è strutturato un design token ben progettato?",
    image: null,
    answers: [
      "Contiene il codice sorgente del componente a cui si riferisce",
      "Raccoglie i file vettoriali delle icone usate nel prodotto",
      "Elenca soltanto i colori e i caratteri approvati dal marchio",
      "Mappa valori primitivi su ruoli semantici riutilizzabili",
    ],
    correctAnswer: 3,
    explanation:
      "Il livello primitivo descrive il valore (viola-500), quello semantico ne descrive il ruolo (colore-azione-primaria). La separazione permette di cambiare tema o marchio senza toccare i componenti.",
  },
  {
    id: 216,
    stage: 2,
    type: 'standard',
    category: 'Accessibilità',
    difficulty: 'Intermedia',
    question: "Quale rapporto di contrasto minimo chiede il livello WCAG AA per il testo normale?",
    image: null,
    answers: ['2:1', '3:1', '4.5:1', '7:1'],
    correctAnswer: 2,
    explanation:
      "Il livello AA richiede 4.5:1 per il testo normale e 3:1 per il testo grande (oltre 18pt, o 14pt in grassetto). Il 7:1 è invece la soglia del livello AAA, più severo.",
  },
  {
    id: 217,
    stage: 2,
    type: 'standard',
    category: 'UX Design',
    difficulty: 'Intermedia',
    question: "Cos'è un “dark pattern”?",
    image: null,
    answers: [
      "Uno schema di interfaccia che induce l'utente ad azioni non volute",
      "Un tema scuro applicato all'intera interfaccia del prodotto",
      "Una tecnica di contrasto tipografico su fondi molto scuri",
      "Uno schema grafico pensato per l'uso notturno del dispositivo",
    ],
    correctAnswer: 0,
    explanation:
      "Disiscrizioni nascoste, caselle preselezionate, pulsanti di rifiuto resi illeggibili: sfruttano la psicologia contro l'utente. Riconoscerli è parte del mestiere, perché spesso vengono chiesti come “ottimizzazioni”.",
  },
  {
    id: 218,
    stage: 2,
    type: 'standard',
    category: 'Storia del graphic design',
    difficulty: 'Intermedia',
    question: "Quale scuola ha applicato al progetto il concetto di “Gesamtkunstwerk”?",
    image: null,
    answers: [
      'Hochschule für Gestaltung di Ulm',
      'Arts & Crafts Movement',
      'Bauhaus',
      'De Stijl',
    ],
    correctAnswer: 2,
    explanation:
      "Il Bauhaus (1919-1933) fondò la propria didattica sull'unità di arte, artigianato e industria: architettura, grafica, arredo e tessuto come parti di un'unica opera totale.",
  },

  // ─── Livello 2: domande visive ───
  {
    id: 250,
    stage: 2,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Intermedia',
    question: "Quale blocco di testo ha l'interlinea più adatta alla lettura?",
    image: null,
    answers: [
      'Interlinea equilibrata',
      'Interlinea troppo stretta',
      'Interlinea troppo larga',
      'Interlinea compressa',
    ],
    answerVisuals: ['lead-ok', 'lead-stretta', 'lead-larga', 'lead-compressa'],
    correctAnswer: 0,
    explanation:
      "Per un testo corrente l'interlinea efficace sta attorno a 1,4-1,5 volte il corpo. Sotto, le righe si impastano e l'occhio fatica a tornare a capo; sopra, il blocco si sfalda e le righe smettono di leggersi come un paragrafo unico.",
  },
  {
    id: 251,
    stage: 2,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Intermedia',
    question: "Qual è il difetto tipografico del blocco di testo qui sotto?",
    image: null,
    visual: 'giustificato-difettoso',
    answers: [
      "Crenatura sbagliata fra le lettere",
      "Giustificazione su una colonna troppo stretta",
      "Gerarchia tipografica del tutto assente",
      "Interlinea insufficiente per il corpo usato",
    ],
    correctAnswer: 1,
    explanation:
      "Giustificando su una misura troppo stretta il programma deve dilatare gli spazi fra le parole per far quadrare le righe: si aprono i cosiddetti “fiumi” bianchi verticali. Si risolve allargando la colonna, riducendo il corpo o passando all'allineamento a bandiera.",
  },

  // ══════════════════════════════════════════════════════════
  // LIVELLO 3 — Design Master
  // ══════════════════════════════════════════════════════════
  {
    id: 301,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "Cosa si intende per gerarchia visiva?",
    image: null,
    answers: [
      "La struttura delle cartelle in cui sono organizzati i file di lavoro",
      "L'ordine in cui l'occhio incontra gli elementi per peso, scala e posizione",
      "Il numero di livelli sovrapposti in un documento di progetto",
      "La sequenza temporale con cui compaiono gli elementi animati",
    ],
    correctAnswer: 1,
    explanation:
      "La gerarchia si costruisce con il contrasto: dimensione, peso, colore, spazio e posizione. Se tutto ha la stessa importanza, il lettore deve decidere da solo da dove cominciare — e spesso sceglie di andarsene.",
  },
  {
    id: 302,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "Cos'è lo spazio bianco, o spazio negativo?",
    image: null,
    answers: [
      "Il fondo della pagina non ancora riempito di contenuti",
      "Il margine tecnico richiesto dalla tipografia per il taglio",
      "Lo spazio lasciato intenzionalmente vuoto per dare ordine e respiro",
      "La porzione di pagina di colore bianco, a prescindere dal resto",
    ],
    correctAnswer: 2,
    explanation:
      "Lo spazio bianco non è spazio sprecato ma spazio che lavora: separa, raggruppa, assegna importanza. Può essere di qualunque colore, il nome indica il vuoto, non la tinta.",
  },
  {
    id: 303,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "A cosa serve la regola dei terzi?",
    image: null,
    answers: [
      "A collocare gli elementi forti sulle intersezioni di una griglia 3×3",
      "A dividere la pagina in tre fasce orizzontali di uguale altezza",
      "A limitare a tre i colori impiegati in una stessa composizione",
      "A ripartire il testo in tre blocchi di lunghezza paragonabile",
    ],
    correctAnswer: 0,
    explanation:
      "Collocare i soggetti sulle linee o sulle intersezioni produce composizioni più dinamiche del centraggio. È una semplificazione pratica di principi compositivi più antichi, non una legge.",
  },
  {
    id: 304,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "Cosa produce il contrasto in una composizione?",
    image: null,
    answers: [
      "L'accostamento di colori appartenenti alla stessa famiglia tonale",
      "La ripetizione regolare di forme identiche lungo la pagina",
      "L'allineamento di tutti gli elementi su un'unica griglia",
      "Una differenza marcata che rende un elemento dominante sugli altri",
    ],
    correctAnswer: 3,
    explanation:
      "Il contrasto non riguarda solo il colore: si ottiene con dimensione, peso, forma, direzione, texture. Serve a stabilire chi comanda nella composizione: senza, tutto galleggia allo stesso livello.",
  },
  {
    id: 305,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "Quale scuola di pensiero descrive il raggruppamento percettivo?",
    image: null,
    answers: [
      'Il funzionalismo del Bauhaus',
      'La psicologia della Gestalt',
      'Il metodo compositivo della Scuola svizzera',
      "Lo stile geometrico dell'Art Déco",
    ],
    correctAnswer: 1,
    explanation:
      "Prossimità, somiglianza, continuità, chiusura, figura-sfondo: i principi della Gestalt descrivono come il cervello organizza automaticamente gli stimoli in insiemi. Sono la base di ogni scelta di raggruppamento.",
  },
  {
    id: 306,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "Cos'è il punto focale di una composizione?",
    image: null,
    answers: [
      "Il punto di fuga verso cui convergono le linee prospettiche",
      "L'elemento collocato esattamente al centro geometrico della pagina",
      "L'elemento su cui lo sguardo si posa per primo",
      "L'elemento di dimensione maggiore presente nel progetto",
    ],
    correctAnswer: 2,
    explanation:
      "Il punto focale si costruisce con il contrasto, non con la posizione o la dimensione assoluta: un piccolo elemento rosso in un campo grigio comanda più di un grande blocco neutro.",
  },
  {
    id: 307,
    stage: 3,
    type: 'standard',
    category: 'Teoria del colore',
    difficulty: 'Avanzata',
    question: "Quale colore la cultura occidentale associa più spesso a energia e urgenza?",
    image: null,
    answers: ['Il blu', 'Il verde', 'Il grigio', 'Il rosso'],
    correctAnswer: 3,
    explanation:
      "Segnali di stop, saldi, allarmi: il rosso è il colore dell'attivazione. Vale però per una parte del mondo soltanto: in altre culture porta significati di festa o di fortuna.",
  },
  {
    id: 308,
    stage: 3,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Avanzata',
    question: "Cos'è la crenatura (kerning)?",
    image: null,
    answers: [
      "La correzione dello spazio tra due lettere specifiche",
      "La spaziatura uniforme applicata a un'intera parola o riga",
      "La distanza verticale tra due righe consecutive di testo",
      "L'altezza delle minuscole rispetto a quella delle maiuscole",
    ],
    correctAnswer: 0,
    explanation:
      "La crenatura agisce sulla singola coppia (le classiche AV, TA, LT); il tracking agisce in modo uniforme su tutta la stringa. Confonderli è l'errore più comune di chi inizia.",
  },
  {
    id: 309,
    stage: 3,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Avanzata',
    question: "Cos'è l'interlinea (leading)?",
    image: null,
    answers: [
      "Lo spazio lasciato prima del primo capoverso di un blocco",
      "Il margine superiore della gabbia di impaginazione",
      "La distanza verticale tra le linee di base di due righe",
      "L'incremento di spazio tra le parole in una riga giustificata",
    ],
    correctAnswer: 2,
    explanation:
      "Il termine inglese viene dalle lamine di piombo (lead) che i compositori inserivano fra le righe per distanziarle. Da qui la pronuncia “ledding”, che non ha nulla a che vedere con leading nel senso di guidare.",
  },
  {
    id: 310,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "Cosa guida lo sguardo dentro una composizione?",
    image: null,
    answers: [
      "Il contrasto, la scala e la direzione delle forme",
      "La cornice che delimita il perimetro esterno del formato",
      "L'ordine di lettura da sinistra a destra, sempre e comunque",
      "Esclusivamente la posizione del blocco di testo più lungo",
    ],
    correctAnswer: 0,
    explanation:
      "L'occhio segue i salti di contrasto e le direzioni suggerite dalle forme. L'abitudine di lettura conta, ma una composizione forte può ribaltarla: è proprio quello che fa un buon manifesto.",
  },
  {
    id: 311,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "Cos'è l'equilibrio asimmetrico?",
    image: null,
    answers: [
      "Una composizione in cui le due metà sono perfettamente speculari",
      "Un equilibrio ottenuto con elementi diversi di peso visivo paragonabile",
      "Un disallineamento rispetto alla griglia adottata nel progetto",
      "Una disposizione volutamente priva di qualsiasi criterio compositivo",
    ],
    correctAnswer: 1,
    explanation:
      "Un elemento piccolo e molto contrastato può bilanciare una grande massa chiara. È un equilibrio più dinamico di quello simmetrico, ma richiede di saper valutare il peso ottico, non solo l'ingombro.",
  },
  {
    id: 312,
    stage: 3,
    type: 'standard',
    category: 'Comunicazione visiva',
    difficulty: 'Avanzata',
    question: "Cosa comunica una griglia regolare?",
    image: null,
    answers: [
      "Rigidità, perché limita la libertà compositiva del progettista",
      "Casualità, perché gli elementi cadono dove capita nella pagina",
      "Movimento, perché accompagna l'occhio lungo le diagonali",
      "Ordine e razionalità, e crea continuità fra le pagine",
    ],
    correctAnswer: 3,
    explanation:
      "La griglia è un accordo, non una gabbia: stabilisce un ritmo che tiene insieme pagine diverse. Le eccezioni funzionano proprio perché esiste una regola da infrangere.",
  },
  {
    id: 313,
    stage: 3,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Avanzata',
    question: "Cosa distingue un asse “optical size” da una semplice variazione di peso?",
    image: null,
    answers: [
      "Le proporzioni del disegno cambiano per ottimizzare la lettura a corpi diversi",
      "Il carattere adatta automaticamente il colore alla luminosità dello schermo",
      "È una definizione commerciale usata dalle fonderie senza effetti reali",
      "Modifica solo la spaziatura, lasciando invariato il disegno delle lettere",
    ],
    correctAnswer: 0,
    explanation:
      "Ai corpi piccoli servono forme più aperte, contrasto ridotto e spaziatura ampia; ai corpi da titolo il contrario. L'asse optical size ricrea quello che i punzonisti facevano incidendo ogni corpo separatamente.",
  },
  {
    id: 314,
    stage: 3,
    type: 'standard',
    category: 'Design System',
    difficulty: 'Avanzata',
    question: "Cos'è l'“atomic design” proposto da Brad Frost?",
    image: null,
    answers: [
      "Una convenzione per assegnare i nomi ai file di progetto",
      "Una gerarchia in cinque livelli: atomi, molecole, organismi, modelli, pagine",
      "Un metodo per ridurre al minimo il peso dei componenti",
      "Un'estensione per costruire componenti dentro gli strumenti di design",
    ],
    correctAnswer: 1,
    explanation:
      "La metafora chimica descrive una composizione per livelli di complessità crescente: gli atomi sono gli elementi indivisibili (un'etichetta, un campo), le pagine sono il risultato finale popolato di contenuti reali.",
  },
  {
    id: 315,
    stage: 3,
    type: 'standard',
    category: 'Storia del graphic design',
    difficulty: 'Avanzata',
    question: "Quale critica ricevette la mappa della metropolitana di New York disegnata da Vignelli nel 1972?",
    image: null,
    answers: [
      "Utilizzava troppi colori per distinguere le diverse linee",
      "Adottava caratteri illeggibili alle dimensioni di affissione",
      "Era elegante e chiara ma geograficamente inesatta",
      "Risultava troppo simile alla mappa della metropolitana di Londra",
    ],
    correctAnswer: 2,
    explanation:
      "Vignelli privilegiò la chiarezza del diagramma sulla fedeltà geografica: chi usciva dalla stazione non riusciva a orientarsi in superficie. Fu ritirata nel 1979 ed è oggi un pezzo da museo.",
  },
  {
    id: 316,
    stage: 3,
    type: 'standard',
    category: 'Branding',
    difficulty: 'Avanzata',
    question: "Cosa si intende per “brand equity”?",
    image: null,
    answers: [
      "Il valore contabile degli archivi grafici di proprietà dell'azienda",
      "Il numero complessivo di persone che seguono il marchio sui canali",
      "L'investimento cumulato in comunicazione dalla nascita del marchio",
      "Il valore percepito che permette al marchio di reggere un prezzo più alto",
    ],
    correctAnswer: 3,
    explanation:
      "È il valore aggiunto che il nome conferisce a un prodotto rispetto a un equivalente anonimo: notorietà, qualità percepita, associazioni e fedeltà. Si costruisce in anni e si può bruciare in una settimana.",
  },

  // ─── Livello 3: domanda visiva ───
  {
    id: 350,
    stage: 3,
    type: 'standard',
    category: 'Tipografia',
    difficulty: 'Avanzata',
    question: "Quale di questi quattro impaginati costruisce una gerarchia tipografica corretta?",
    image: null,
    answers: ['Gerarchia corretta', 'Gerarchia piatta', 'Gerarchia invertita', 'Tutto in evidenza'],
    answerVisuals: ['gerarchia-ok', 'gerarchia-piatta', 'gerarchia-invertita', 'gerarchia-rumorosa'],
    correctAnswer: 0,
    explanation:
      "La gerarchia nasce dal contrasto: occhiello piccolo e spaziato, titolo dominante, testo di servizio discreto. Se tutto ha lo stesso peso non c'è ordine di lettura; se tutto urla, l'effetto è identico a non evidenziare nulla.",
  },

  // ══════════════════════════════════════════════════════════
  // LIVELLO 4 — Super Hero Designer
  // ══════════════════════════════════════════════════════════
  {
    id: 401,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Cos'è un design system?",
    image: null,
    answers: [
      "Il manuale di identità visiva dell'azienda applicato al digitale",
      "Un insieme coerente di componenti, token e regole riutilizzabili",
      "Una raccolta ordinata di schermate già disegnate e approvate",
      "Un programma di grafica specializzato nei progetti di interfaccia",
    ],
    correctAnswer: 1,
    explanation:
      "Un design system non è una libreria di schermate né un manuale statico: è un prodotto vivo, con componenti funzionanti, regole scritte e qualcuno che se ne prende la responsabilità nel tempo.",
    reasoningHint: "Pensa a cosa lo distingue da una semplice raccolta di materiali già pronti.",
  },
  {
    id: 402,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Su cosa si fonda un design system efficace?",
    image: null,
    answers: [
      "Sul numero di componenti disponibili nella libreria condivisa",
      "Sulla scelta dello strumento con cui viene costruito e mantenuto",
      "Su token centralizzati per colore, tipografia e spaziatura",
      "Sulla quantità di varianti cromatiche previste per ogni elemento",
    ],
    correctAnswer: 2,
    explanation:
      "I token sono il livello più profondo: definiscono i valori una volta sola e li propagano ovunque. Senza di loro un design system è solo una collezione di componenti che divergeranno nel tempo.",
    reasoningHint: "Cerca il livello più profondo, quello da cui dipendono tutti gli altri.",
  },
  {
    id: 403,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Cos'è un componente in un design system?",
    image: null,
    answers: [
      "Un gruppo di livelli salvato per comodità dentro il file di lavoro",
      "Una regola di stile scritta nel foglio di stile del prodotto",
      "Un elemento decorativo da applicare alle schermate del progetto",
      "Un blocco riutilizzabile con stati, varianti e documentazione",
    ],
    correctAnswer: 3,
    explanation:
      "Un componente senza stati e senza documentazione è solo un disegno riutilizzato. Quello che lo rende un componente è il contratto: cosa fa, in quali condizioni, con quali varianti.",
    reasoningHint: "La differenza sta in ciò che accompagna il disegno, non nel disegno stesso.",
  },
  {
    id: 404,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "A cosa serve un design token?",
    image: null,
    answers: [
      "A definire un valore una volta sola e propagarlo in tutto il prodotto",
      "A tracciare quante volte ciascun componente viene effettivamente usato",
      "A identificare l'autore di ogni elemento presente nella libreria",
      "A proteggere i file di progetto da modifiche non autorizzate",
    ],
    correctAnswer: 0,
    explanation:
      "Cambiare il viola di marca in un punto solo e vederlo aggiornarsi su applicazione, sito e documentazione: è questo che i token rendono possibile, ed è il motivo per cui vengono prima dei componenti.",
    reasoningHint: "Immagina di dover cambiare un colore di marca su dieci prodotti diversi.",
  },
  {
    id: 405,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Cos'è una variante di un componente?",
    image: null,
    answers: [
      "Una copia del componente scollegata dalla libreria di origine",
      "Una versione precedente conservata nello storico del documento",
      "Una versione alternativa dello stesso componente, per stile o funzione",
      "Un componente simile realizzato da un altro membro della squadra",
    ],
    correctAnswer: 2,
    explanation:
      "Primario e secondario, compatto ed esteso, con icona e senza: le varianti vivono dentro lo stesso componente e ne condividono il comportamento. Una copia scollegata è invece l'inizio del debito di design.",
    reasoningHint: "Attenzione alla differenza fra una variante e una copia scollegata.",
  },
  {
    id: 406,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Quali stati deve prevedere un componente interattivo?",
    image: null,
    answers: [
      "Soltanto lo stato predefinito e quello disabilitato",
      "Uno stato diverso per ciascuna pagina in cui il componente compare",
      "Soltanto gli stati visibili al passaggio del puntatore",
      "Predefinito, sopra, premuto, in focus, disabilitato e in caricamento",
    ],
    correctAnswer: 3,
    explanation:
      "Lo stato di focus è quello dimenticato più spesso, ed è l'unico che rende il componente utilizzabile da tastiera: senza, chi non usa il mouse non sa dove si trova.",
    reasoningHint: "Chiediti quale stato serve a chi naviga senza mouse.",
  },
  {
    id: 407,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Perché un design system rende scalabile il lavoro?",
    image: null,
    answers: [
      "Perché riduce il numero di persone necessarie a seguire il progetto",
      "Perché standardizza componenti e schemi ricorrenti del prodotto",
      "Perché impedisce di introdurre nuovi elementi grafici non previsti",
      "Perché accorpa tutti i materiali in un unico documento condiviso",
    ],
    correctAnswer: 1,
    explanation:
      "Standardizzando ciò che si ripete si libera tempo per i problemi nuovi. Un design system non vieta le eccezioni: rende esplicito quando si sta facendo un'eccezione, e perché.",
    reasoningHint: "Non riguarda il risparmio di persone, ma dove si concentra il loro tempo.",
  },
  {
    id: 408,
    stage: 4,
    type: 'superhero',
    category: 'Accessibilità',
    difficulty: 'Suprema',
    question: "Cosa comporta l'accessibilità dentro un design system?",
    image: null,
    answers: [
      "Aggiungere una verifica di accessibilità alla fine di ogni progetto",
      "Predisporre una versione alternativa per gli utenti ipovedenti",
      "Che i componenti nascano già conformi alle linee guida WCAG",
      "Rinunciare al colore e lavorare prevalentemente in bianco e nero",
    ],
    correctAnswer: 2,
    explanation:
      "È il vantaggio più sottovalutato di un design system: se contrasto, aree di tocco, focus e semantica sono corretti nel componente, ogni prodotto che lo usa eredita l'accessibilità senza doverci pensare.",
    reasoningHint: "Il punto è il momento in cui l'accessibilità entra nel processo.",
  },
  {
    id: 409,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Cosa contiene la documentazione di un design system?",
    image: null,
    answers: [
      "La cronologia delle versioni rilasciate dalla squadra di progetto",
      "Le immagini di anteprima di tutte le schermate realizzate",
      "Il manuale di identità visiva dell'azienda in formato digitale",
      "Componenti, token, casi d'uso e indicazioni su quando non usarli",
    ],
    correctAnswer: 3,
    explanation:
      "La parte che distingue una buona documentazione è il “quando non usarlo”: senza criteri di scelta, chi consulta il sistema prende il componente che somiglia di più, non quello giusto.",
    reasoningHint: "Pensa a cosa serve davvero a chi deve scegliere fra due componenti simili.",
  },
  {
    id: 410,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "A cosa serve una libreria di componenti condivisa?",
    image: null,
    answers: [
      "A sincronizzare gli stessi componenti fra file e persone diverse",
      "A conservare una copia di sicurezza dei progetti già conclusi",
      "A ridurre il peso dei documenti di lavoro della squadra",
      "A impedire modifiche ai progetti che sono stati approvati",
    ],
    correctAnswer: 0,
    explanation:
      "Il valore sta nella propagazione: si corregge il componente all'origine e la correzione arriva a tutti i file collegati. È anche il suo rischio, e per questo servono regole di pubblicazione.",
    reasoningHint: "Il beneficio e il pericolo sono la stessa cosa vista da due lati.",
  },
  {
    id: 411,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Cosa distingue un design system maturo da uno appena nato?",
    image: null,
    answers: [
      "Il numero di componenti presenti nella libreria condivisa",
      "La quantità di prodotti diversi in cui viene utilizzato",
      "La qualità estetica delle schermate di esempio pubblicate",
      "Governance, proprietà definita e un processo di evoluzione",
    ],
    correctAnswer: 3,
    explanation:
      "La maturità è organizzativa prima che grafica: chi decide, come si propone una modifica, come si comunica una versione. Un sistema bellissimo senza proprietario muore al primo cambio di squadra.",
    reasoningHint: "La risposta riguarda le persone e il processo, non i file.",
  },
  {
    id: 412,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "Cos'è il “debito di design”?",
    image: null,
    answers: [
      "Il costo delle licenze degli strumenti utilizzati dalla squadra",
      "L'accumulo di soluzioni provvisorie che pesa sulla manutenzione",
      "Il tempo impiegato a documentare le scelte progettuali compiute",
      "Il numero di richieste di modifica ancora in attesa di risposta",
    ],
    correctAnswer: 1,
    explanation:
      "Come il debito tecnico, si contrae consapevolmente per andare più veloci e si paga con gli interessi: ogni scorciatoia non ripagata rende la successiva più costosa.",
    reasoningHint: "Il nome è preso in prestito da un concetto dello sviluppo software.",
  },
  {
    id: 413,
    stage: 4,
    type: 'superhero',
    category: 'Design System',
    difficulty: 'Suprema',
    question: "In Material Design, cosa introduce M3 rispetto a M2 sul fronte del colore?",
    image: null,
    answers: [
      "Una tavolozza fissa più satura, con un numero maggiore di tonalità",
      "Un sistema cromatico riservato ai soli dispositivi indossabili",
      "L'abbandono del colore in favore di superfici neutre e ombre",
      "Il dynamic color: una palette generata dallo sfondo del dispositivo",
    ],
    correctAnswer: 3,
    explanation:
      "Material You genera automaticamente una palette coerente estraendo i colori dall'immagine di sfondo scelta dall'utente: il sistema si adatta alla persona, non il contrario.",
    reasoningHint: "La novità riguarda da dove vengono i colori, non quali colori sono.",
  },
  {
    id: 414,
    stage: 4,
    type: 'superhero',
    category: 'Ricerca UX',
    difficulty: 'Suprema',
    question: "Quale metodo di ricerca osserva gli utenti senza condizionarne il comportamento?",
    image: null,
    answers: [
      "L'osservazione sul campo dei comportamenti in contesto reale",
      "Il gruppo di discussione condotto da un moderatore esperto",
      "Il questionario quantitativo somministrato a un ampio campione",
      "L'intervista strutturata con domande definite in anticipo",
    ],
    correctAnswer: 0,
    explanation:
      "Chiedere alle persone cosa fanno e guardarle mentre lo fanno dà risultati diversi: nel gruppo di discussione pesa il giudizio degli altri, nell'intervista la voglia di dare la risposta giusta.",
    reasoningHint: "Distingui i metodi in cui la persona sa di essere interrogata.",
  },
  {
    id: 415,
    stage: 4,
    type: 'superhero',
    category: 'Accessibilità',
    difficulty: 'Suprema',
    question: "Cosa distingue il livello WCAG AAA dal livello AA?",
    image: null,
    answers: [
      "L'obbligo di conformità per i soli siti della pubblica amministrazione",
      "La sostituzione del livello AA, considerato ormai superato",
      "Requisiti più severi, a partire dai rapporti di contrasto richiesti",
      "L'estensione dei requisiti alle sole applicazioni per dispositivi mobili",
    ],
    correctAnswer: 2,
    explanation:
      "AAA alza il contrasto richiesto da 4.5:1 a 7:1 e irrigidisce altri criteri. Le stesse WCAG avvertono che la conformità AAA totale non è raggiungibile per ogni tipo di contenuto: il riferimento pratico resta AA.",
    reasoningHint: "I livelli sono cumulativi: AAA non sostituisce AA, ci si aggiunge.",
  },
  {
    id: 416,
    stage: 4,
    type: 'superhero',
    category: 'Branding',
    difficulty: 'Suprema',
    question: "In un rebrand, quale elemento è più delicato dal punto di vista psicologico?",
    image: null,
    answers: [
      "Il numero di colori presenti nella nuova tavolozza di marca",
      "Il carattere tipografico scelto per disegnare il logotipo",
      "Le proporzioni del segno rispetto alla versione precedente",
      "La familiarità emotiva costruita con il pubblico negli anni",
    ],
    correctAnswer: 3,
    explanation:
      "Il pubblico non giudica il nuovo marchio sul suo valore grafico, ma sulla perdita di qualcosa che riconosceva. È il motivo per cui i rebrand riusciti cambiano molto conservando pochi segnali forti.",
    reasoningHint: "La reazione negativa a un rebrand raramente riguarda l'estetica.",
  },
  {
    id: 417,
    stage: 4,
    type: 'superhero',
    category: 'UX Design',
    difficulty: 'Suprema',
    question: "Cos'è il “progressive disclosure”?",
    image: null,
    answers: [
      "Rendere visibili tutte le funzioni già dalla prima schermata",
      "Rivelare i contenuti con un'animazione all'apertura della pagina",
      "Mostrare le opzioni un poco alla volta, quando servono davvero",
      "Rimuovere in modo definitivo le funzioni utilizzate di rado",
    ],
    correctAnswer: 2,
    explanation:
      "Serve a tenere semplice il percorso comune senza amputare le funzioni avanzate: restano disponibili, ma non occupano lo spazio e l'attenzione di chi non le cerca.",
    reasoningHint: "Non riguarda l'animazione, ma il momento in cui un'opzione compare.",
  },
  {
    id: 418,
    stage: 4,
    type: 'superhero',
    category: 'Teoria del colore',
    difficulty: 'Suprema',
    question: "Progettando per un pubblico internazionale, quale aspetto del colore viene trascurato più spesso?",
    image: null,
    answers: [
      "La differenza di calibrazione fra gli schermi dei dispositivi",
      "Il significato simbolico che cambia da una cultura all'altra",
      "La resa del colore sui diversi profili di stampa professionale",
      "Il numero di sfumature che l'occhio riesce a distinguere",
    ],
    correctAnswer: 1,
    explanation:
      "Il bianco è il colore del lutto in parte dell'Asia orientale, il rosso porta fortuna in Cina, il verde ha valore religioso in molti paesi islamici. Le altre tre opzioni sono problemi tecnici, non culturali.",
    reasoningHint: "Tre opzioni parlano di tecnologia, una sola di persone.",
  },
  {
    id: 419,
    stage: 4,
    type: 'superhero',
    category: 'Cultura digitale',
    difficulty: 'Suprema',
    question: "Qual è il limite concettuale dell'approccio “mobile first”?",
    image: null,
    answers: [
      "Produrre desktop che sono solo ingrandimenti della versione ridotta",
      "Rendere di fatto impossibile progettare per schermi molto grandi",
      "Escludere del tutto i tablet dal perimetro della progettazione",
      "Richiedere il doppio del lavoro rispetto ad altri approcci",
    ],
    correctAnswer: 0,
    explanation:
      "Partire dal vincolo aiuta a stabilire le priorità, ma lo schermo grande non è uno schermo piccolo ingrandito: offre confronto simultaneo, viste affiancate, densità informativa. Se non si sfrutta, si è dimezzato il desktop.",
    reasoningHint: "Il limite non sta nel metodo, ma in come viene applicato al passo successivo.",
  },
  {
    id: 420,
    stage: 4,
    type: 'superhero',
    category: 'Cultura del progetto',
    difficulty: 'Suprema',
    question: "Cosa afferma il principio di Dieter Rams “il buon design è il meno design possibile”?",
    image: null,
    answers: [
      "Che il progetto deve costare il meno possibile a chi lo produce",
      "Che le forme vanno sempre ridotte a figure geometriche elementari",
      "Che il buon design si concentra sull'essenziale e toglie il superfluo",
      "Che la funzione conta più dell'estetica in qualunque progetto",
    ],
    correctAnswer: 2,
    explanation:
      "È l'ultimo dei dieci principi di Rams: «Weniger, aber besser», meno ma meglio. Non è un invito al minimalismo come stile, ma a eliminare ciò che non serve perché resti evidente ciò che serve.",
    reasoningHint: "Attenzione: parla di quantità di progetto, non di costi né di stile.",
  },
  {
    id: 421,
    stage: 4,
    type: 'superhero',
    category: 'Tipografia',
    difficulty: 'Suprema',
    question: "Quale termine indica l'altezza delle minuscole prive di ascendenti e discendenti?",
    image: null,
    answers: ['Altezza delle maiuscole', 'Altezza della x', 'Linea delle ascendenti', 'Linea mediana'],
    correctAnswer: 1,
    explanation:
      "Si misura sulla “x” perché è una lettera senza sporgenze né curve che sfondano la linea. Un'altezza della x generosa rende un carattere più leggibile ai corpi piccoli, a parità di dimensione dichiarata.",
    reasoningHint: "Il nome deriva dalla lettera usata storicamente come riferimento.",
  },
  {
    id: 422,
    stage: 4,
    type: 'superhero',
    category: 'Storia del graphic design',
    difficulty: 'Suprema',
    question: "Con quale nome fu pubblicato nel 1957 il carattere che oggi conosciamo come Helvetica?",
    image: null,
    answers: ['Neue Grotesk', 'Swiss Grotesk', 'Helvetia Type', 'Neue Haas Grotesk'],
    correctAnswer: 3,
    explanation:
      "Disegnato da Max Miedinger con Eduard Hoffmann per la fonderia Haas, si chiamava Neue Haas Grotesk. Il nome Helvetica arrivò nel 1960, dal latino Helvetia, per renderlo più esportabile sui mercati esteri.",
    reasoningHint: "Il nome originale citava la fonderia svizzera che lo produsse.",
  },
  {
    id: 423,
    stage: 4,
    type: 'superhero',
    category: 'Accessibilità',
    difficulty: 'Suprema',
    question: "Quale principio WCAG riguarda la navigabilità da tastiera e le trappole per il focus?",
    image: null,
    answers: ['Percepibile', 'Utilizzabile', 'Comprensibile', 'Robusto'],
    correctAnswer: 1,
    explanation:
      "I quattro principi sono percepibile, utilizzabile, comprensibile e robusto. Utilizzabile copre tutto ciò che riguarda l'interazione: tastiera, tempi sufficienti, assenza di contenuti che possano provocare crisi epilettiche.",
    reasoningHint: "Il nome del principio descrive l'azione di far funzionare qualcosa.",
  },
  {
    id: 424,
    stage: 4,
    type: 'superhero',
    category: 'Teoria del colore',
    difficulty: 'Suprema',
    question: "Nel modello HSL, cosa accade aumentando solo la L e lasciando invariate H e S?",
    image: null,
    answers: [
      "La tinta scivola progressivamente verso il colore complementare",
      "Il colore tende al bianco mantenendo la stessa tinta",
      "La saturazione cresce in proporzione all'aumento di luminosità",
      "Il colore diventa progressivamente più trasparente",
    ],
    correctAnswer: 1,
    explanation:
      "A L=100% si ottiene bianco puro, a L=0% nero. La tinta resta la stessa, ma la saturazione percepita cala perché il colore si diluisce: è la differenza fra il valore dichiarato e ciò che l'occhio registra.",
    reasoningHint: "Immagina di aggiungere bianco a una tinta pura, un poco alla volta.",
  },
  {
    id: 425,
    stage: 4,
    type: 'superhero',
    category: 'Comunicazione visiva',
    difficulty: 'Suprema',
    question: "Cosa descrive il principio della figura e sfondo nella psicologia della Gestalt?",
    image: null,
    answers: [
      "Il criterio con cui si scelgono i colori di fondo di una composizione",
      "La tendenza a percepire come gruppo gli elementi fra loro simili",
      "La tecnica per costruire ombre che sembrino realistiche",
      "La tendenza a separare automaticamente un elemento dal suo contesto",
    ],
    correctAnswer: 3,
    explanation:
      "Il vaso di Rubin è l'esempio classico: la stessa immagine si legge come vaso o come due profili, mai come entrambi nello stesso istante. Il cervello deve decidere cosa è figura e cosa è sfondo.",
    reasoningHint: "Pensa al disegno in cui si vedono due volti oppure un vaso.",
  },
];

export function getQuestionsByLevel(level: 1 | 2 | 3): Question[] {
  return questions.filter(q => q.stage === level);
}

export function getSuperHeroQuestions(): Question[] {
  return questions.filter(q => q.stage === 4);
}

/**
 * Estrae una domanda del livello richiesto.
 *
 * `randomOrder` governa solo l'ordine delle DOMANDE (impostazione omonima).
 * L'ordine delle RISPOSTE è sempre mescolato, così la corretta non cade mai
 * sistematicamente sulla stessa lettera.
 */
export function getRandomQuestion(
  level: 1 | 2 | 3 | 4,
  usedIds: number[],
  randomOrder = true,
): Question | null {
  const pool = questions.filter(q => q.stage === level && !usedIds.includes(q.id));
  if (pool.length === 0) return null;
  const q = randomOrder ? pool[Math.floor(Math.random() * pool.length)] : pool[0];

  // Si mescola una permutazione di indici, non gli array: testi e campioni
  // visivi restano così allineati fra loro, e l'indice della risposta
  // corretta si ricava dalla permutazione invece che cercando il testo
  // (che con due risposte identiche darebbe l'indice sbagliato).
  const order: (0 | 1 | 2 | 3)[] = [0, 1, 2, 3];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const answers = order.map(i => q.answers[i]) as [string, string, string, string];
  const answerVisuals = q.answerVisuals
    ? (order.map(i => q.answerVisuals![i]) as [string, string, string, string])
    : undefined;
  const correctAnswer = order.indexOf(q.correctAnswer) as 0 | 1 | 2 | 3;

  return { ...q, answers, answerVisuals, correctAnswer };
}
