document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".quiz-start-button");
  if (startButton !== null) {
    startButton.addEventListener("click", function () {
      const quizStart = document.querySelector(".quiz-start");
      const quizAnswerWrapper = document.querySelector(".quiz-answer-wrapper");
      if (quizStart && quizAnswerWrapper) {
        quizStart.style.display = "none";
        quizAnswerWrapper.style.display = "block";
      }
    });
  } else {
    console.error("Elemento .quiz-start-button non trovato nel DOM.");
  }
});
