document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector('[data-button="start"]');
  const quizStart = document.querySelector(".quiz-start");
  const quizAnswerWrapper = document.querySelector(".quiz-answer-wrapper");
  const quizAnswer = document.querySelector(".quiz-answer");
  const quizEnd = document.querySelector(".quiz-end");
  const quizEndNumber = document.querySelector(".quiz-end-number");
  const quizEndText = document.querySelector(".quiz-end-p");
  const restartButton = document.querySelector('[data-button="restart"]');
  const opzioni = document.querySelectorAll(".quiz-option");

  let domande = [];
  let domandeSelezionate = [];
  let currentIndex = 0;
  let score = 0;

  // Carica JSON delle domande dall'URL specificato
  fetch('https://raw.githubusercontent.com/ilastraz/ABI-quiz/refs/heads/main/domande.json')
    .then(response => response.json())
    .then(data => {
      domande = data;
    });

  // Inizia il quiz
  if (startButton) {
    startButton.addEventListener("click", function () {
      if (quizStart && quizAnswerWrapper) {
        quizStart.style.display = "none";
        quizAnswerWrapper.style.display = "flex";

        startQuiz();
      }
    });
  } else {
    console.error("Elemento con data-button=\"start\" non trovato nel DOM.");
  }

  if (restartButton) {
    restartButton.addEventListener("click", function () {
      if (quizEnd && quizStart) {
        quizEnd.style.display = "none";
        quizStart.style.display = "block";
      }
    });
  } else {
    console.error("Elemento con data-button=\"restart\" non trovato nel DOM.");
  }

  function startQuiz() {
    // Seleziona 5 domande casuali dal totale
    domandeSelezionate = domande.sort(() => 0.5 - Math.random()).slice(0, 5);
    currentIndex = 0;
    score = 0;

    mostraDomanda();
  }

  function mostraDomanda() {
    if (currentIndex < domandeSelezionate.length) {
      const domandaCorrente = domandeSelezionate[currentIndex];
      quizAnswer.textContent = domandaCorrente.domanda;

      opzioni.forEach((opzione, index) => {
        opzione.textContent = domandaCorrente.risposte[index];
        opzione.dataset.index = index;
        opzione.classList.remove("corretta", "sbagliata");
        opzione.style.transition = "background-color 0.5s ease, transform 0.5s ease";
      });
    } else {
      mostraRisultato();
    }
  }

  opzioni.forEach(opzione => {
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
        quizAnswerWrapper.style.opacity = 0;
        setTimeout(() => {
          mostraDomanda();
          quizAnswerWrapper.style.opacity = 1;
        }, 500); // Attesa per la transizione di scomparsa
      }, 1000); // 1 secondo di attesa prima di cambiare domanda
    });
  });

  function mostraRisultato() {
    // Mostra il riepilogo del quiz
    quizAnswerWrapper.style.display = "none";
    if (quizEnd) {
      quizEnd.style.display = "block";
      if (quizEndNumber) {
        quizEndNumber.textContent = score;
      }
      if (quizEndText) {
        if (score < 2) {
          quizEndText.textContent = "Non è un gran punteggio, ma niente paura. Segui i nostri consigli per imparare a difenderti dalle truffe.";
        } else if (score <= 3) {
          quizEndText.textContent = "Non male, sei sulla buona strada. Con i nostri consigli sarai pronto a difenderti da ogni tentativo di truffa!";
        } else if (score >= 4) {
          quizEndText.textContent = "Complimenti, sei informato! Continua a tenerti aggiornato: le truffe hanno mille volti e la sicurezza non è mai troppa.";
        }
      }
    }
    console.log("Quiz terminato. Punteggio:", score);
    // Puoi implementare una schermata di risultato qui
  }
});
