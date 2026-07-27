document.addEventListener("DOMContentLoaded", function () {
  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.innerText = "☀️";
      } else {
        themeToggle.innerText = "🌙";
      }

      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
          themeToggle.innerText = "☀️";
          localStorage.setItem("theme", "dark");
        } else {
          themeToggle.innerText = "🌙";
          localStorage.setItem("theme", "light");
        }
      });
    }
  }

  // Quiz data: each object contains question, options and correct answer
  const questions = [
    {
      question: "Which language runs in the browser?",
      answers: ["Python", "Java", "JavaScript", "C++"],
      correct: "JavaScript",
    },
    {
      question: "What does CSS stand for?",
      answers: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets",
      ],
      correct: "Cascading Style Sheets",
    },
    {
      question: "Which company developed React?",
      answers: ["Google", "Microsoft", "Meta", "Apple"],
      correct: "Meta",
    },
  ];
  function initQuiz() {
    const quizContainer = document.querySelector(".quiz-container");
    if (quizContainer) {
      // DOM elements
      const answersContainer = document.getElementById("answers");
      const questionTitle = document.getElementById("question");
      const scoreEl = document.getElementById("score");
      const nextBtn = document.getElementById("nextBtn");
      const questionNumber = document.getElementById("questionNumber");

      // Quiz state
      let currentQuestionIndex = 0;
      let score = 0;
      let answered = false;

      // Display final result and create restart button
      const showResult = () => {
        answersContainer.innerHTML = "";

        questionTitle.innerText = `Quiz finished! Your score: ${score}/${questions.length}`;

        nextBtn.style.display = "none";

        // Create restart button dynamically
        const restartBtn = document.createElement("button");
        restartBtn.innerText = "Restart Quiz";

        restartBtn.addEventListener("click", restartQuiz);

        answersContainer.append(restartBtn);
      };

      // Reset quiz state and start again
      const restartQuiz = () => {
        currentQuestionIndex = 0;
        score = 0;

        scoreEl.innerText = `Score: ${score}`;

        nextBtn.style.display = "";
        nextBtn.disabled = true;

        showQuestion();
      };

      // Render current question and answers
      const showQuestion = () => {
        answered = false;

        const currentQuestion = questions[currentQuestionIndex];

        nextBtn.disabled = true;

        // Update question counter
        questionNumber.innerText = `Question ${currentQuestionIndex + 1} / ${questions.length}`;

        questionTitle.innerText = currentQuestion.question;

        // Clear previous answers
        answersContainer.innerHTML = "";

        // Generate answer buttons
        currentQuestion.answers.forEach((answer) => {
          const button = document.createElement("button");

          button.innerText = answer;

          answersContainer.append(button);

          // Handle user's answer selection
          button.addEventListener("click", function () {
            if (answered) return;

            answered = true;

            const answerButtons = answersContainer.querySelectorAll("button");

            // Check if answer is correct
            if (answer === currentQuestion.correct) {
              score++;
              button.classList.add("correct");
            } else {
              button.classList.add("wrong");

              // Highlight correct answer
              answerButtons.forEach((correctAnswer) => {
                if (correctAnswer.innerText === currentQuestion.correct) {
                  correctAnswer.classList.add("correct");
                }
              });
            }

            scoreEl.innerText = `Score: ${score}`;

            // Disable all answers after selection
            answerButtons.forEach((btn) => {
              btn.disabled = true;
            });

            // Move to next question or show result
            if (currentQuestionIndex < questions.length - 1) {
              nextBtn.disabled = false;
            } else {
              nextBtn.style.display = "none";
              questionTitle.innerText = "Calculating result...";
              setTimeout(showResult, 3000);
            }
          });
        });
      };

      // Go to next question
      nextBtn.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          showQuestion();
        }
      });

      // Start quiz
      showQuestion();
    }
  }

  initThemeToggle();
  initQuiz();
});
