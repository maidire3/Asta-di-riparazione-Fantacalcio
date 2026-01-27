const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const closeModal = document.getElementById("closeModal");

// Prendo tutte le squadre cliccabili
const squadre = document.querySelectorAll(".nomeSquadra");

squadre.forEach(squadra => {
    squadra.addEventListener("click", () => {
        modalTitle.textContent = squadra.textContent;
        modal.classList.remove("hidden");
    });
});

// Chiudi schermata
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});
