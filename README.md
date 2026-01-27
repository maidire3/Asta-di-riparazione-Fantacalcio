# Asta di Riparazione Fantacalcio

Piccola web app pensata per **simulare e tenere traccia dell’asta di riparazione del Fantacalcio**, con gestione dei crediti e degli svincolati per ogni squadra.

👉 **Demo online**  
Il progetto è utilizzabile direttamente da browser al link:  
https://maidire3.github.io/Asta-di-riparazione-Fantacalcio/

---

## 📋 Funzionalità principali

- Visualizzazione delle squadre partecipanti
- Calcolo automatico dei **crediti disponibili**
- Conteggio degli **svincolati per ruolo** (Portieri – Difensori – Centrocampisti – Attaccanti)
- Gestione manuale degli svincolati tramite una **modal**
- Inserimento rapido di set di giocatori “precaricati”

---

## 🧭 Come funziona l’interfaccia

### Griglia principale
Ogni riga rappresenta una squadra e mostra:
- **Nome squadra**
- **Crediti disponibili**
- **Svincolati (P-D-C-A)** → numero di svincolati per ruolo

Cliccando sul **nome della squadra** si apre una **modal** dove è possibile:
- aggiungere svincolati manualmente
- rimuoverli tramite la `X`
- vedere il riepilogo per ruolo

Ogni modifica aggiorna automaticamente:
- i crediti della squadra
- il conteggio degli svincolati

---

## 🎯 Calcolo dei crediti

Il totale dei crediti di una squadra è calcolato come: crediti iniziali + somma(ceil(crediti_giocatore / 2))


Questo simula la regola classica dell’asta di riparazione, in cui dalla vendita di un giocatore si recupera metà dei crediti (arrotondata per eccesso).

---

## 🔘 Pulsanti principali

### 🟦 Giocatori Venduti
Serve per **applicare alle squadre i crediti dei giocatori che sono già stati venduti** prima dell’utilizzo dell’app.

In pratica:
- rappresenta la situazione **post-asta**, con alcuni giocatori già svincolati
- aggiunge automaticamente questi giocatori alle rispettive squadre
- aggiorna crediti e svincolati di conseguenza

È pensato come **punto di partenza realistico**, così da non dover inserire manualmente giocatori già ceduti.

---

### 🟧 Secondo il K
Inserisce uno scenario alternativo di svincolati:

- rappresenta **le previsioni personali** su chi verrà svincolato
- include **anche i giocatori già venduti**
- permette di simulare rapidamente “come potrebbe andare” l’asta

Utile per fare ragionamenti e confronti prima dell’asta vera e propria.

---

### 🟩 Salva
⚠️ **Al momento NON è una funzione definitiva**

- serve solo per **debug**
- stampa in console (`console.log`) lo stato completo delle squadre in formato JSON
- utile per esportare o controllare i dati durante lo sviluppo

---

## 🧩 Struttura del codice

### HTML
- Struttura statica della pagina
- Griglia delle squadre
- Modal per la gestione dei ruoli
- Pulsanti di controllo

### JavaScript
- `squadreData`: stato centrale dell’app
- Gestione apertura/chiusura modal
- Inserimento e rimozione giocatori
- Calcolo automatico di crediti e svincolati
- Dataset `defaultPlayers` e `primoSave` per simulazioni rapide

### SCSS / CSS
- Layout responsive
- Modal centrata
- Pulsanti con hover
- Blocco dell’app in orientamento verticale su mobile
- Pulsante di rimozione con `X`

---

## 📱 Supporto mobile

L’app **funziona solo in orizzontale su mobile**.  
Se il dispositivo è in verticale viene mostrato un messaggio che invita a ruotare lo schermo.

---

## 🚧 Stato del progetto

Questo progetto è:
- sperimentale
- pensato per uso personale / di lega
- in continua evoluzione

Possibili sviluppi futuri:
- salvataggio persistente (localStorage / file)
- esportazione dati
- miglioramento UX su mobile
- gestione aste multiple

---

## ⚽ Note finali

L’obiettivo non è fare un gestionale “perfetto”, ma uno strumento **veloce, pratico e flessibile** per ragionare sull’asta di riparazione senza impazzire con carta e calcolatrice 😄


