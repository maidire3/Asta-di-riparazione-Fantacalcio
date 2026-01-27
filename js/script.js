// MODAL
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const closeModal = document.getElementById("closeModal");

const creditiInizialiSquadre = {
  "AC Orazkhelia": 0,
  "Aston Villain": 0,
  "Bayer Leverkubo": 7,
  "FC Kame House": 0,
  "GiocatoriSempreCazzuti": 11,
  "One Pisa": 18,
  "Real Madrink": 2,
  "Woolferhampton": 3,
  "Yara FC": 16,
  "Ovo al tegamino": 9
};

// Oggetto che contiene i dati di ogni squadra
const squadreData = {};

// --- FUNZIONE UTILE: crea <li> con pulsante rimuovi ---
function creaLiConRimuovi(player, ruolo, nomeSquadra) {
    const li = document.createElement("li");
    li.textContent = `${player.nome} (${player.crediti})`;

    // Pulsante piccolo X
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&times;"; // simbolo ×
    deleteBtn.classList.add("delete-btn"); // classe per stile

    deleteBtn.addEventListener("click", () => {
        li.remove();
        squadreData[nomeSquadra][ruolo] = squadreData[nomeSquadra][ruolo].filter(
            p => p.nome !== player.nome || p.crediti != player.crediti
        );
        aggiornaCreditiHTML(nomeSquadra);
        aggiornaSvincolatiHTML(nomeSquadra);
    });

    li.append(deleteBtn);
    return li;
}

// --- APERTURA MODAL SQUADRA ---
const squadre = document.querySelectorAll(".nomeSquadra");
squadre.forEach(squadra => {
  squadra.addEventListener("click", () => {
    const nomeSquadra = squadra.textContent;
    modalTitle.textContent = nomeSquadra;

    // Inizializza la squadra se non esiste
    if (!squadreData[nomeSquadra]) {
      squadreData[nomeSquadra] = {
        portieri: [], difensori: [], centrocampisti: [], attaccanti: [],
        creditiIniziali: creditiInizialiSquadre[nomeSquadra]
      };
    }

    // Pulisci e aggiorna le liste nel modal
    ["portieri", "difensori", "centrocampisti", "attaccanti"].forEach(ruolo => {
      const lista = modal.querySelector(`.lista-${ruolo}`);
      lista.innerHTML = ""; // svuota la lista

      squadreData[nomeSquadra][ruolo].forEach(player => {
        const li = creaLiConRimuovi(player, ruolo, nomeSquadra);
        lista.appendChild(li);
      });
    });

    modal.classList.remove("hidden");
  });
});

// --- CHIUDI MODAL ---
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// --- AGGIUNTA GIOCATORE ---
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

    const nomeSquadra = modalTitle.textContent;

    let ruolo = "";
    if (listaPlayer.classList.contains("lista-portieri")) ruolo = "portieri";
    if (listaPlayer.classList.contains("lista-difensori")) ruolo = "difensori";
    if (listaPlayer.classList.contains("lista-centrocampisti")) ruolo = "centrocampisti";
    if (listaPlayer.classList.contains("lista-attaccanti")) ruolo = "attaccanti";

    // Aggiungi al DOM con pulsante rimuovi
    const li = creaLiConRimuovi({nome: nomePlayer, crediti: creditiPlayer}, ruolo, nomeSquadra);
    listaPlayer.appendChild(li);

    // Salva nell'oggetto squadra
    squadreData[nomeSquadra][ruolo].push({ nome: nomePlayer, crediti: creditiPlayer });

    // Aggiorna crediti e svincolati
    aggiornaCreditiHTML(nomeSquadra);
    aggiornaSvincolatiHTML(nomeSquadra);

    // Pulisci input
    nomePlayerInput.value = "";
    creditiPlayerInput.value = "";
  });
});

// --- FUNZIONI DI CALCOLO ---
function calcolaCreditiSquadra(nomeSquadra) {
  if (!squadreData[nomeSquadra]) return 0;

  let totale = squadreData[nomeSquadra].creditiIniziali;

  ["portieri", "difensori", "centrocampisti", "attaccanti"].forEach(ruolo => {
    squadreData[nomeSquadra][ruolo].forEach(player => {
      totale += Math.ceil(Number(player.crediti)/2);
    });
  });

  return totale;
}

function aggiornaCreditiHTML(nomeSquadra) {
  const tutteLeSquadre = document.querySelectorAll(".nomeSquadra");
  tutteLeSquadre.forEach((squadraElem, index) => {
    if (squadraElem.textContent === nomeSquadra) {
      const numeroCreditiElem = document.querySelectorAll(".numeroCrediti")[index];
      numeroCreditiElem.textContent = calcolaCreditiSquadra(nomeSquadra);
    }
  });
}

function contatoreRuoli(nomeSquadra) {
  if (!squadreData[nomeSquadra]) return null;

  const conteggio = { portieri: 0, difensori: 0, centrocampisti: 0, attaccanti: 0 };
  ["portieri", "difensori", "centrocampisti", "attaccanti"].forEach(ruolo => {
    conteggio[ruolo] = squadreData[nomeSquadra][ruolo].length;
  });
  return conteggio;
}

function aggiornaSvincolatiHTML(nomeSquadra) {
  const tutteLeSquadre = document.querySelectorAll(".nomeSquadra");
  tutteLeSquadre.forEach((squadraElem, index) => {
    if (squadraElem.textContent === nomeSquadra) {
      const svincolatiElem = document.querySelectorAll(".numeroSvincolati")[index];
      const conteggio = contatoreRuoli(nomeSquadra);
      svincolatiElem.textContent = `${conteggio.portieri}-${conteggio.difensori}-${conteggio.centrocampisti}-${conteggio.attaccanti}`;
    }
  });
}

// --- DEFAULT PLAYERS ---
const defaultPlayers = {
  "AC Orazkhelia": [{ nome: "Bravo*", crediti: 1, ruolo: "attaccanti" }],
  "Aston Villain": [],
  "Bayer Leverkubo": [],
  "FC Kame House": [
    { nome: "Martinelli T.*", crediti: 1, ruolo: "portieri" },
    { nome: "Guendouzi*", crediti: 1, ruolo: "centrocampisti" },
    { nome: "Castellanos*", crediti: 141, ruolo: "attaccanti" },
    { nome: "Dzeko*", crediti: 2, ruolo: "attaccanti" }
  ],
  "GiocatoriSempreCazzuti": [],
  "One Pisa": [
    {nome: "stanciu*", crediti: 9, ruolo: "centrocampisti"},
    {nome: "Lucca*", crediti: 10, ruolo: "attaccanti"}
  ],
  "Real Madrink": [{ nome: "Lang*", crediti: 1, ruolo: "attaccanti" }],
  "Woolferhampton": [
    {nome: "Lovik*", crediti: 1, ruolo: "difensori"},
    {nome: "Vazquez*", crediti: 11, ruolo: "centrocampisti"}
  ],
  "Yara FC": [{nome: "Bailey*", crediti: 11, ruolo: "centrocampisti"}],
  "Ovo al tegamino": [{nome: "Carboni V.*", crediti: 6, ruolo:"centrocampisti"}]
};

// Df Players del primo SAVE
const primoSave = {
  "AC Orazkhelia": [
    {
      "nome": "Turati",
      "crediti": "1",
      "ruolo": "portieri"
    },
    {
      "nome": "Gatti",
      "crediti": "7",
      "ruolo": "difensori"
    },
    {
      "nome": "Zhegrova",
      "crediti": "34",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Collocolo",
      "crediti": "3",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Bravo*",
      "crediti": 1,
      "ruolo": "attaccanti"
    },
    {
      "nome": "Ngonge",
      "crediti": "11",
      "ruolo": "attaccanti"
    }
  ],
  "Aston Villain": [
    {
      "nome": "Martinez Jo",
      "crediti": "1",
      "ruolo": "portieri"
    },
    {
      "nome": "Tavares",
      "crediti": "30",
      "ruolo": "difensori"
    },
    {
      "nome": "Nicolussi Caviglia",
      "crediti": "1",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Gimenez",
      "crediti": "30",
      "ruolo": "attaccanti"
    },
    {
      "nome": "Vlahovic",
      "crediti": "40",
      "ruolo": "attaccanti"
    }
  ],
  "Bayer Leverkubo": [
    {
      "nome": "Biraghi",
      "crediti": "5",
      "ruolo": "difensori"
    },
    {
      "nome": "Dele-Bashiru",
      "crediti": "11",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Folorunsho",
      "crediti": "8",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Belotti",
      "crediti": "18",
      "ruolo": "attaccanti"
    },
    {
      "nome": "Soulemana",
      "crediti": "1",
      "ruolo": "attaccanti"
    }
  ],
  "FC Kame House": [
    {
      "nome": "Martinelli T.*",
      "crediti": 1,
      "ruolo": "portieri"
    },
    {
      "nome": "Angelino",
      "crediti": "32",
      "ruolo": "difensori"
    },
    {
      "nome": "Guendouzi*",
      "crediti": 1,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Castellanos*",
      "crediti": 141,
      "ruolo": "attaccanti"
    },
    {
      "nome": "Dzeko*",
      "crediti": 2,
      "ruolo": "attaccanti"
    }
  ],
    "GiocatoriSempreCazzuti": [
    {
      "nome": "Floriani Mussolini",
      "crediti": "4",
      "ruolo": "difensori"
    },
    {
      "nome": "Sohm",
      "crediti": "4",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Camarda",
      "crediti": "12",
      "ruolo": "attaccanti"
    },
    {
      "nome": "Cutrone",
      "crediti": "1",
      "ruolo": "attaccanti"
    }
  ],
  "One Pisa": [
    {
      "nome": "Siegrist",
      "crediti": "1",
      "ruolo": "portieri"
    },
    {
      "nome": "Olivera",
      "crediti": "2",
      "ruolo": "difensori"
    },
    {
      "nome": "stanciu*",
      "crediti": 9,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Maldini",
      "crediti": "6",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Lucca*",
      "crediti": 10,
      "ruolo": "attaccanti"
    },
    {
      "nome": "Ferguson",
      "crediti": "125",
      "ruolo": "attaccanti"
    }
  ],
  "Real Madrink": [
    {
      "nome": "Kossonou",
      "crediti": "2",
      "ruolo": "difensori"
    },
    {
      "nome": "Helgason",
      "crediti": "1",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Venturino",
      "crediti": "1",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Stengs",
      "crediti": "6",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Lang*",
      "crediti": 1,
      "ruolo": "attaccanti"
    },
    {
      "nome": "Dovbyk",
      "crediti": "36",
      "ruolo": "attaccanti"
    }
  ],
  "Woolferhampton": [
    {
      "nome": "Lovik*",
      "crediti": 1,
      "ruolo": "difensori"
    },
    {
      "nome": "Vazquez*",
      "crediti": 11,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "El Aynaoui",
      "crediti": "3",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Gronbaek",
      "crediti": "7",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Neres",
      "crediti": "6",
      "ruolo": "centrocampisti"
    }
  ],
  "Yara FC": [
    {
      "nome": "Israel",
      "crediti": "13",
      "ruolo": "portieri"
    },
    {
      "nome": "Cuadrado",
      "crediti": "1",
      "ruolo": "difensori"
    },
    {
      "nome": "Bailey*",
      "crediti": 11,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "De Bruyne",
      "crediti": "90",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Nzola",
      "crediti": "13",
      "ruolo": "attaccanti"
    },
    {
      "nome": "Diao",
      "crediti": "1",
      "ruolo": "attaccanti"
    }
  ],
  "Ovo al tegamino": [
    {
      "nome": "Mandas*",
      "crediti": "6",
      "ruolo": "portieri"
    },
    {
      "nome": "Carboni V.*",
      "crediti": 6,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Fazzini",
      "crediti": "1",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Bernardeschi",
      "crediti": "2",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Pedro",
      "crediti": "1",
      "ruolo": "attaccanti"
    }
  ],
}

function inserisciDefaultPlayers(giocatoriDiDefault) {
  btnDefault.classList.add("hidden");
  btnPrimoSalvataggio.classList.add("hidden");
  for (const nomeSquadra in giocatoriDiDefault) {
    if (!squadreData[nomeSquadra]) {
      squadreData[nomeSquadra] = {
        portieri: [], difensori: [], centrocampisti: [], attaccanti: [],
        creditiIniziali: creditiInizialiSquadre[nomeSquadra] || 0
      };
    }

    giocatoriDiDefault[nomeSquadra].forEach(player => {
      squadreData[nomeSquadra][player.ruolo].push({
        nome: player.nome, crediti: player.crediti
      });
    });

    aggiornaCreditiHTML(nomeSquadra);
    aggiornaSvincolatiHTML(nomeSquadra);
  }
}

// --- PULSANTI ---
const btnDefault = document.getElementById("defaultPlayers");
btnDefault.addEventListener("click", () => {
  inserisciDefaultPlayers(defaultPlayers);
});


const btnSave = document.getElementById("salvataggio");
btnSave.addEventListener("click", salvaGiocatori);

function salvaGiocatori() {
  const output = {};
  for (const nomeSquadra in squadreData) {
    output[nomeSquadra] = [];
    ["portieri","difensori","centrocampisti","attaccanti"].forEach(ruolo => {
      squadreData[nomeSquadra][ruolo].forEach(player => {
        output[nomeSquadra].push({ nome: player.nome, crediti: player.crediti, ruolo });
      });
    });
  }
  console.log(JSON.stringify(output, null, 2));
}

const btnPrimoSalvataggio = document.getElementById("saveOne");
btnPrimoSalvataggio.addEventListener("click", () => {
  inserisciDefaultPlayers(primoSave);
});


// --- CHECK ORIENTATION ---
function checkOrientation() {
  const rotateMessage = document.getElementById("rotateDeviceMessage");
  if (window.innerHeight > window.innerWidth) {
    rotateMessage.style.display = "flex";
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector(".grid").style.display = "none";
    document.getElementById("defaultPlayers").style.display = "none";
  } else {
    rotateMessage.style.display = "none";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".grid").style.display = "grid";
    document.getElementById("defaultPlayers").style.display = "block";
  }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
