document.addEventListener("DOMContentLoaded", function() {
  let domande = [];
  let domandeSelezionate = [];
  let currentIndex = 0;
  let score = 0;

  // Carica JSON delle domande
  fetch('https://raw.githubusercontent.com/ilastraz/ABI-quiz/refs/heads/main/domande.json?token=GHSAT0AAAAAACXRKUSEZJMRMZV4Y73QTLVCZZCVPVQ')
    .then(response => response.json())
    .then(data => {
      domande = data;
      startQuiz();
    });

  // Inizializza Swiper
  const swiper = new Swiper('.swiper-container-quiz', {
    navigation: {
      nextEl: '.swiper-button-next-quiz',
      prevEl: '.swiper-button-prev-quiz',
    },
    allowTouchMove: false, // Per far avanzare solo con la logica del quiz
  });

  // Seleziona 5 domande casualmente
  function startQuiz() {
    domandeSelezionate = domande.sort(() => 0.5 - Math.random()).slice(0, 5);
    mostraDomanda();
  }

  // Mostra la domanda corrente
  function mostraDomanda() {
    if (currentIndex < domandeSelezionate.length) {
      const domandaCorrente = domandeSelezionate[currentIndex];
      document.querySelector(".domanda").textContent = domandaCorrente.domanda;
      const opzioni = document.querySelectorAll(".opzione");

      opzioni.forEach((opzione, index) => {
        opzione.textContent = domandaCorrente.risposte[index];
        opzione.dataset.index = index;
        opzione.classList.remove("giusta", "sbagliata");
      });
    } else {
      mostraRisultato();
    }
  }

  // Gestisce il click su una risposta
  document.querySelectorAll(".opzione").forEach(opzione => {
    opzione.addEventListener("click", function() {
      const domandaCorrente = domandeSelezionate[currentIndex];
      const rispostaSelezionata = parseInt(this.dataset.index);

      if (rispostaSelezionata === domandaCorrente.giusta) {
        this.classList.add("giusta");
        score++;
      } else {
        this.classList.add("sbagliata");
        document.querySelector(`.opzione[data-index="${domandaCorrente.giusta}"]`).classList.add("giusta");
      }

      // Passa alla prossima domanda con Swiper dopo 2 secondi
      setTimeout(() => {
        currentIndex++;
        if (currentIndex < domandeSelezionate.length) {
          swiper.slideNext();
          mostraDomanda();
        } else {
          mostraRisultato();
        }
      }, 2000);
    });
  });

  // Mostra il risultato finale
  function mostraRisultato() {
    document.querySelector(".risultato").textContent = `Bravo, ne hai indovinate ${score} su 5!`;
    document.querySelector(".risultato").classList.remove("hidden");
  }

  // Bottone per ripetere il quiz
  document.querySelector(".ripeti-quiz").addEventListener("click", function() {
    currentIndex = 0;
    score = 0;
    swiper.slideTo(0);
    document.querySelector(".risultato").classList.add("hidden");
    startQuiz();
  });
});
