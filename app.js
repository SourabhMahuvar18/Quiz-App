const scoreGifs = {
  high: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",     // celebration
  medium: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", // funny okay
  low: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",   // funny fail
};

const questionsData = [
  {
    question: "What is the output of `console.log(typeof NaN)` in JavaScript?",
    correctAnswer: "number",
    options: ["NaN", "undefined", "number", "object"],
  },
  {
    question: "Which of the following best describes a closure in JavaScript?",
    correctAnswer: "A function that retains access to its lexical scope",
    options: [
      "A function that runs only once",
      "A function that retains access to its lexical scope",
      "A function without parameters",
      "A function that returns another function",
    ],
  },
  {
    question: "Which JavaScript feature allows handling asynchronous operations more cleanly than callbacks?",
    correctAnswer: "Promises",
    options: ["Events", "Promises", "Closures", "Generators"],
  },
  
  {
    question: "Which keyword is used to prevent object properties from being modified?",
    correctAnswer: "Object.freeze()",
    options: ["Object.lock()", "Object.prevent()", "Object.freeze()", "Object.seal()"],
  },
  {
    question: "What is the difference between `map()` and `forEach()` in JavaScript?",
    correctAnswer: "map() returns a new array, forEach() does not",
    options: [
      "forEach() is faster than map()",
      "map() modifies the original array",
      "map() returns a new array, forEach() does not",
      "They are identical",
    ],
  },
  {
    question: "Which of the following is true about `async/await`?",
    correctAnswer: "It is syntactic sugar over Promises",
    options: [
      "It replaces Promises completely",
      "It is syntactic sugar over Promises",
      "It only works in Node.js",
      "It blocks the event loop",
    ],
  },
  {
    question: "What will `JSON.stringify({a: undefined, b: function(){}, c: Symbol('id')})` return?",
    correctAnswer: '{"c":null}',
    options: [
      '{"a":null,"b":null,"c":null}',
      '{"c":null}',
      '{"a":undefined,"b":function(){}, "c":"Symbol(id)"}',
      "{}",
    ],
  },
  {
    question: "Which data structure is best suited for implementing LRU cache?",
    correctAnswer: "HashMap + Doubly Linked List",
    options: [
      "Array",
      "Stack",
      "HashMap + Doubly Linked List",
      "Queue",
    ],
  },
  {
    question: "What is the time complexity of searching in a balanced binary search tree?",
    correctAnswer: "O(log n)",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
  },
];

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function confettiEffect() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");

    confetti.className =
      "fixed w-2 h-2 bg-green-500 opacity-80 z-50";

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confetti);

    confetti.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(100vh)" }
      ],
      {
        duration: 1000 + Math.random() * 500,
        easing: "ease-out"
      }
    );

    setTimeout(() => confetti.remove(), 1500);
  }
}



const questionPlace = document.querySelector("#question");
const optionPlace = document.querySelector("#options");
const nextBtn = document.querySelector("#nextBtn");
const resultPlace = document.querySelector("#result");
const restartBtn = document.querySelector("#restartBtn");

let currentQuestionIdx = 0;
let score = 0;

// Load question function
function InitQuestions() {
  if (currentQuestionIdx >= questionsData.length) {
    showResult();
    return;
  }
  nextBtn.disabled = true;
  optionPlace.innerHTML = "";
  const questionObj = questionsData[currentQuestionIdx];

  // Shuffle options for the displayed question
  const shuffledOptions = shuffleArray([...questionObj.options]);

  // Find new correct index
  const correctIndex = shuffledOptions.indexOf(
    questionObj.correctAnswer
  );

  // Storing right index dynamically
  questionObj.answer = correctIndex;

  questionPlace.textContent = questionObj.question;

  shuffledOptions.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;

    button.className =
      "w-full border p-2 rounded hover:bg-gray-100";

    button.addEventListener("click", () =>
      handleAnswer(button, index)
    );

    optionPlace.appendChild(button);
  });
}


// Handle answer click function handler 
function handleAnswer(button, selectedIndex) {
  const questionObj = questionsData[currentQuestionIdx];
  const buttons = optionPlace.querySelectorAll("button");

  // Disable all options after one click
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === questionObj.answer) {
    // Correct answer clicked
    button.classList.add("bg-green-500", "text-white");
    score++;
    confettiEffect(); //celebration effect trigger
  } else {
    // Wrong answer clicked
    button.classList.add("bg-red-500", "text-white");

    // Show correct answer
    buttons[questionObj.answer].classList.add(
      "bg-green-500",
      "text-white"
    );
  }

  // Allow moving to next question
  nextBtn.disabled = false;
}


// Next button click handling 
nextBtn.addEventListener("click", () => {
  currentQuestionIdx++;
  InitQuestions();
});

// Show result
function showResult() {
  questionPlace.textContent = "Quiz Completed!";
  optionPlace.innerHTML = "";
  nextBtn.disabled = true;

  resultPlace.classList.remove("hidden");

  const percentage =
    (score / questionsData.length) * 100;

  let gifSrc = "";

  if (percentage >= 80) {
    gifSrc = scoreGifs.high;
  } else if (percentage >= 40) {
    gifSrc = scoreGifs.medium;
  } else {
    gifSrc = scoreGifs.low;
  }

  const gifContainer = document.getElementById("gifContainer");
  gifContainer.innerHTML = `
    <img 
      src="${gifSrc}" 
      alt="Result GIF"
      class="mx-auto rounded-lg w-64"
    />
    <p class="text-xl font-bold mt-4">
      Your Score: ${score} / ${questionsData.length}
    </p>
  `;
}


// Restart quiz after all question 
restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIdx = 0;
  resultPlace.classList.add("hidden");
  InitQuestions();
});

// Start quiz automatically upon loading the script file 
InitQuestions();


/*
  APP Flow will like
  InitQuestion() -> display questions -> handleAnswer() -> handle the correct ans & score -> handle nextButton ->initquestion() for next question
                                                                                  
    if all question displayed -> showResult() -> show final score inside html -> restartbutton to restart quiz                                                                            
 */   