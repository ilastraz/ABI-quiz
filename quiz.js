document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".quiz-start-button");
  const quizStart = document.querySelector(".quiz-start");
  const quizAnswerWrapper = document.querySelector(".quiz-answer-wrapper");

  if (startButton) {
    startButton.addEventListener("click", function () {
      if (quizStart && quizAnswerWrapper) {
        quizStart.style.display = "none";
        quizAnswerWrapper.style.display = "block";
      }
    });
  }
});
