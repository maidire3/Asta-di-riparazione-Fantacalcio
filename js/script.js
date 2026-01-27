// MODAL
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const closeModal = document.getElementById("closeModal");

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
        attaccanti: []
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

    // Pulisci input
    nomePlayerInput.value = "";
    creditiPlayerInput.value = "";
  });
});
