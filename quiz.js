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
    const startButton = document.querySelector(".quiz-start-button");
    if (startButton) {
      startButton.addEventListener("click", function () {
        const quizStart = document.querySelector(".quiz-start");
        const quizAnswerWrapper = document.querySelector(".quiz-answer-wrapper");
        if (quizStart && quizAnswerWrapper) {
          quizStart.classList.remove("show");
          setTimeout(() => {
            quizStart.style.display = "none";
            quizAnswerWrapper.style.display = "block";
            quizAnswerWrapper.classList.add("show");
          }, 500); // Tempo necessario per completare la transizione
          startQuiz();
        }
      });
    }
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
      const quizAnswer = document.querySelector(".quiz-answer");
      if (quizAnswer) {
        quizAnswer.textContent = domandaCorrente.domanda;

        const opzioni = document.querySelectorAll(".quiz-option");
        opzioni.forEach((opzione, index) => {
          opzione.textContent = domandaCorrente.risposte[index];
          opzione.dataset.index = index;
          opzione.classList.remove("corretta", "sbagliata");
        });
      }
    } else {
      mostraRisultato();
    }
  }

  const opzioni = document.querySelectorAll(".quiz-option");
  if (opzioni) {
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
          mostraDomanda();
        }, 2000);
      });
    });
  }

  function mostraRisultato() {
    const quizAnswerWrapper = document.querySelector(".quiz-answer-wrapper");
    const quizEnd = document.querySelector(".quiz-end");

    if (quizAnswerWrapper && quizEnd) {
      quizAnswerWrapper.classList.remove("show");
      setTimeout(() => {
        quizAnswerWrapper.style.display = "none";
        quizEnd.style.display = "block";
        quizEnd.classList.add("show");

        // Mostra il punteggio
        const quizEndNumber = document.querySelector(".quiz-end-number");
        if (quizEndNumber) {
          quizEndNumber.textContent = score;
        }

        // Cambia il messaggio finale in base al punteggio
        const risultatoTesto = document.querySelector(".quiz-end-p");
        if (risultatoTesto) {
          if (score <= 1) {
            risultatoTesto.textContent = "Non è andata benissimo, ma puoi sempre riprovare!";
          } else if (score <= 3) {
            risultatoTesto.textContent = "Non male! Ma puoi migliorare!";
          } else {
            risultatoTesto.textContent = "Ottimo lavoro! Sei molto preparato!";
          }
        }
      }, 500);
    }
  }

  const restartButton = document.querySelector(".quiz-start-restart");
  if (restartButton) {
    restartButton.addEventListener("click", function () {
      const quizEnd = document.querySelector(".quiz-end");
      const quizStart = document.querySelector(".quiz-start");

      if (quizEnd && quizStart) {
        quizEnd.classList.remove("show");
        setTimeout(() => {
          quizEnd.style.display = "none";
          quizStart.style.display = "block";
          quizStart.classList.add("show");
        }, 500);
      }
    });
  }
});
