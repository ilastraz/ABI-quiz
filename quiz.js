document.addEventListener("DOMContentLoaded", function () {
    let domande = [];
    let domandeSelezionate = [];
    let currentIndex = 0;
  
    // Carica JSON delle domande
    fetch('https://raw.githubusercontent.com/ilastraz/ABI-quiz/refs/heads/main/domande.json?token=GHSAT0AAAAAACXRKUSEPGICKIQ6ZOTCBCJIZZCWHTA')
      .then(response => response.json())
      .then(data => {
        domande = data;
        startQuiz();
      });
  
    // Inizializza Swiper
    const swiper = new Swiper('.swiper-container', {
      allowTouchMove: false, // Impedisce lo scorrimento manuale per passare solo con la logica del quiz
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
          opzione.dataset.index = index; // Assegna l'indice della risposta all'attributo data-index
          opzione.classList.remove("giusta", "sbagliata"); // Rimuove le classi giusta/sbagliata
        });
      }
    }
  
    // Gestisce il click su una risposta
    document.querySelectorAll(".opzione").forEach(opzione => {
      opzione.addEventListener("click", function () {
        const domandaCorrente = domandeSelezionate[currentIndex];
        const rispostaSelezionata = parseInt(this.dataset.index);
  
        if (rispostaSelezionata === domandaCorrente.giusta) {
          this.classList.add("giusta");
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
          }
        }, 2000);
      });
    });
  });
  