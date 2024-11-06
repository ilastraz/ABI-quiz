document.addEventListener("DOMContentLoaded", function () {
  let domande = [];
  let domandeSelezionate = [];
  let currentIndex = 0;
  let score = 0;

  // Carica JSON delle domande dall'URL specificato
  fetch('https://raw.githubusercontent.com/ilastraz/ABI-quiz/refs/heads/main/domande.json')
    .then(response => response.json())
    .then(data => {
      domande = data;
      initializeQuiz();
    });

  function initializeQuiz() {
    document.querySelector(".quiz-start-button").addEventListener("click", function () {
      document.querySelector(".quiz-start").classList.remove("show");
      setTimeout(() => {
        document.querySelector(".quiz-start").style.display = "none";
        document.querySelector(".quiz-answer-wrapper").style.display = "block";
        document.querySelector(".quiz-answer-wrapper").classList.add("show");
      }, 500); // Tempo necessario per completare la transizione
      startQuiz();
    });
  }

  function startQuiz() {
    // Seleziona 5 domande casualmente
    domandeSelezionate = domande.sort(() => 0.5 - Math.random()).slice(0, 5);
    currentIndex = 0;
    score = 0;
    mostraDomanda();
  }

  function mostraDomanda() {
    if (currentIndex < domandeSelezionate.length) {
      const domandaCorrente = domandeSelezionate[currentIndex];
      document.querySelector(".quiz-answer").textContent = domandaCorrente.domanda;

      const opzioni = document.querySelectorAll(".quiz-option");
      opzioni.forEach((opzione, index) => {
        opzione.textContent = domandaCorrente.risposte[index];
        opzione.dataset.index = index;
        opzione.classList.remove("corretta", "sbagliata");
      });
    } else {
      mostraRisultato();
    }
  }

  document.querySelectorAll(".quiz-option").forEach(opzione => {
    opzione.addEventListener("click", function () {
      const domandaCorrente = domandeSelezionate[currentIndex];
      const rispostaSelezionata = parseInt(this.dataset.index);

      if (rispostaSelezionata === domandaCorrente.giusta) {
        this.classList.add("corretta");
        score++;
      } else {
        this.classList.add("sbagliata");
        document.querySelector(`.quiz-option[data-index="${domandaCorrente.giusta}"]`).classList.add("corretta");
      }

      setTimeout(() => {
        currentIndex++;
        mostraDomanda();
      }, 2000);
    });
  });

  function mostraRisultato() {
    document.querySelector(".quiz-answer-wrapper").classList.remove("show");
    setTimeout(() => {
      document.querySelector(".quiz-answer-wrapper").style.display = "none";
      document.querySelector(".quiz-end").style.display = "block";
      document.querySelector(".quiz-end").classList.add("show");

      // Mostra il punteggio
      document.querySelector(".quiz-end-number").textContent = score;

      // Cambia il messaggio finale in base al punteggio
      const risultatoTesto = document.querySelector(".quiz-end-p");
      if (score <= 1) {
        risultatoTesto.textContent = "Non è andata benissimo, ma puoi sempre riprovare!";
      } else if (score <= 3) {
        risultatoTesto.textContent = "Non male! Ma puoi migliorare!";
      } else {
        risultatoTesto.textContent = "Ottimo lavoro! Sei molto preparato!";
      }
    }, 500);
  }

  document.querySelector(".quiz-start-restart").addEventListener("click", function () {
    document.querySelector(".quiz-end").classList.remove("show");
    setTimeout(() => {
      document.querySelector(".quiz-end").style.display = "none";
      document.querySelector(".quiz-start").style.display = "block";
      document.querySelector(".quiz-start").classList.add("show");
    }, 500);
  });
});
