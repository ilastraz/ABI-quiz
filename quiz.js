document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector('[data-button="start"]');
  const quizStart = document.querySelector(".quiz-start");
  const quizAnswerWrapper = document.querySelector(".quiz-answer-wrapper");

  if (startButton) {
    startButton.addEventListener("click", function () {
      if (quizStart && quizAnswerWrapper) {
        quizStart.style.display = "none";
        quizAnswerWrapper.style.display = "block";
      }
    });
  } else {
    console.error("Elemento con data-button=\"start\" non trovato nel DOM.");
  }
});
