// MODAL
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const closeModal = document.getElementById("closeModal");

const creditiInizialiSquadre = {
  "AC Orazkhelia": 0,
  "Aston Villain": 0,
  "Bayer Leverkubo": 7,
  "FC Kame House": 0,
  "GiocatoriSempreCaxxuti": 11,
  "One Pisa": 18,
  "Real Madrink": 2,
  "Woolferhampton": 3,
  "Yara FC": 16,
  "Ovo al tegamino": 9
};

// Oggetto che contiene i dati di ogni squadra
const squadreData = {};

// Prendo tutte le squadre cliccabili
const squadre = document.querySelectorAll(".nomeSquadra");
squadre.forEach(squadra => {
  squadra.addEventListener("click", () => {
    const nomeSquadra = squadra.textContent;
    modalTitle.textContent = nomeSquadra;

    // Inizializza la squadra se non esiste
    if (!squadreData[nomeSquadra]) {
      squadreData[nomeSquadra] = {
        portieri: [],
        difensori: [],
        centrocampisti: [],
        attaccanti: [],
        creditiIniziali: creditiInizialiSquadre[nomeSquadra]
      };
    }

    // Pulisci e aggiorna le liste nel modal
    ["portieri", "difensori", "centrocampisti", "attaccanti"].forEach(ruolo => {
      const lista = modal.querySelector(`.lista-${ruolo}`);
      lista.innerHTML = ""; // svuota la lista
      // Aggiungi i giocatori già presenti in questa squadra
      squadreData[nomeSquadra][ruolo].forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.nome} (${player.crediti})`;
        lista.appendChild(li);
      });
    });

    modal.classList.remove("hidden");
  });
});

// Chiudi modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Aggiunge il giocatore
const bottoniAggiungi = document.querySelectorAll(".addPlayer");
bottoniAggiungi.forEach(bottone => {
  bottone.addEventListener("click", () => {
    const ruoloDiv = bottone.closest(".ruolo");
    const nomePlayerInput = ruoloDiv.querySelector('input[type="text"]');
    const creditiPlayerInput = ruoloDiv.querySelector('input[type="number"]');
    const listaPlayer = ruoloDiv.querySelector(".lista");

    if (nomePlayerInput.value === "" || creditiPlayerInput.value === "") {
      alert("Compila entrambi i campi");
      return;
    }

    const nomePlayer = nomePlayerInput.value;
    const creditiPlayer = creditiPlayerInput.value;

    // Trova il nome della squadra attuale
    const nomeSquadra = modalTitle.textContent;

    // Trova il ruolo
    let ruolo = "";
    if (listaPlayer.classList.contains("lista-portieri")) ruolo = "portieri";
    if (listaPlayer.classList.contains("lista-difensori")) ruolo = "difensori";
    if (listaPlayer.classList.contains("lista-centrocampisti")) ruolo = "centrocampisti";
    if (listaPlayer.classList.contains("lista-attaccanti")) ruolo = "attaccanti";

    // Aggiungi al DOM
    const li = document.createElement("li");
    li.textContent = `${nomePlayer} (${creditiPlayer})`;
    listaPlayer.appendChild(li);

    // Salva nell'oggetto squadra
    squadreData[nomeSquadra][ruolo].push({ nome: nomePlayer, crediti: creditiPlayer });
    
    // Aggiorna i crediti nella tabella HTML
    aggiornaCreditiHTML(nomeSquadra);

    // Aggiorna gli svincolati nella tabella HTML
    aggiornaSvincolatiHTML(nomeSquadra);

    // Pulisci input
    nomePlayerInput.value = "";
    creditiPlayerInput.value = "";
  });
});

function calcolaCreditiSquadra(nomeSquadra) {
  if (!squadreData[nomeSquadra]) return 0;

  let totale = squadreData[nomeSquadra].creditiIniziali;

  // Cicla su tutti i ruoli
  ["portieri", "difensori", "centrocampisti", "attaccanti"].forEach(ruolo => {
    squadreData[nomeSquadra][ruolo].forEach(player => {
      totale += Math.ceil(Number(player.crediti)/2); // somma dei crediti
    });
  });

  return totale;
}

function aggiornaCreditiHTML(nomeSquadra) {
  // Trova l'elemento .numeroCrediti corrispondente
  const tutteLeSquadre = document.querySelectorAll(".nomeSquadra");
  tutteLeSquadre.forEach((squadraElem, index) => {
    if (squadraElem.textContent === nomeSquadra) {
      const numeroCreditiElem = document.querySelectorAll(".numeroCrediti")[index];
      numeroCreditiElem.textContent = calcolaCreditiSquadra(nomeSquadra);
    }
  });
}

function contatoreRuoli(nomeSquadra) {
  if (!squadreData[nomeSquadra]) return null; // squadra non esiste

  // Oggetto che conterrà il numero di giocatori per ruolo
  const conteggio = {
    portieri: 0,
    difensori: 0,
    centrocampisti: 0,
    attaccanti: 0
  };

  // Cicla su tutti i ruoli e conta i giocatori
  ["portieri", "difensori", "centrocampisti", "attaccanti"].forEach(ruolo => {
    conteggio[ruolo] = squadreData[nomeSquadra][ruolo].length;
  });

  return conteggio;
}

function aggiornaSvincolatiHTML(nomeSquadra) {
  const tutteLeSquadre = document.querySelectorAll(".nomeSquadra");
  
  tutteLeSquadre.forEach((squadraElem, index) => {
    if (squadraElem.textContent === nomeSquadra) {
      // numeroSvincolati è il terzo div dopo nomeSquadra
      const svincolatiElem = document.querySelectorAll(".numeroSvincolati")[index];
      const conteggio = contatoreRuoli(nomeSquadra);

      // Aggiorna il testo in formato P-D-C-A
      svincolatiElem.textContent = `${conteggio.portieri}-${conteggio.difensori}-${conteggio.centrocampisti}-${conteggio.attaccanti}`;
    }
  });
}


const defaultPlayers = {
  "AC Orazkhelia": [
    { nome: "Bravo*", crediti: 1, ruolo: "attaccanti" }
  ],
  "Aston Villain": [],
  "Bayer Leverkubo": [],
  "GiocatoriSempreCaxxuti": [],
  "FC Kame House": [

    { nome: "Martinelli T.*", crediti: 1, ruolo: "portieri" },
    { nome: "Guendouzi*", crediti: 1, ruolo: "centrocampisti" },
    { nome: "Castellanos*", crediti: 141, ruolo: "attaccanti" },
    { nome: "Dzeko*", crediti: 2, ruolo: "attaccanti" }
  ],
  "One Pisa": [
      {nome: "stanciu*", crediti: 9, ruolo: "centrocampisti"},
      {nome: "Lucca*", crediti: 10, ruolo: "attaccanti"}
    ],
  "Real Madrink": [
    { nome: "Lang*", crediti: 1, ruolo: "attaccanti" }
],
    "Woolferhampton": [
        {nome: "Lovik*", crediti: 1, ruolo: "difensori"},
        {nome: "Vazquez*", crediti: 11, ruolo: "centrocampisti"}
    ],
    "Yara FC":[
        {nome: "Bailey*", crediti: 11, ruolo: "centrocampisti"}
    ],
    "Ovo al tegamino":[
        {nome: "Carboni V.*", crediti: 6, ruolo:"centrocampisti"}
    ]
};

function inserisciDefaultPlayers() {
    btnDefault.style.display="none";
  for (const nomeSquadra in defaultPlayers) {
    // Inizializza la squadra se non esiste ancora
    if (!squadreData[nomeSquadra]) {
      squadreData[nomeSquadra] = {
        portieri: [],
        difensori: [],
        centrocampisti: [],
        attaccanti: [],
        creditiIniziali: creditiInizialiSquadre[nomeSquadra] || 0
      };
    }

    // Aggiungi tutti i giocatori predefiniti
    defaultPlayers[nomeSquadra].forEach(player => {
      squadreData[nomeSquadra][player.ruolo].push({
        nome: player.nome,
        crediti: player.crediti
      });
    });

    // Aggiorna il DOM
    aggiornaCreditiHTML(nomeSquadra);
    aggiornaSvincolatiHTML(nomeSquadra);
  }
}

const btnDefault = document.getElementById("defaultPlayers");
btnDefault.addEventListener("click", inserisciDefaultPlayers);