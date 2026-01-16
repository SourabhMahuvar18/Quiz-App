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

  resultPlace.classList.remove("hidden");
  // inserted the pargraph of result inside the resultplace div
  resultPlace.insertAdjacentHTML(
    "afterbegin",
    `<p class="text-xl font-bold">
      Final Score: ${score} / ${questionsData.length}
    </p>`
  );

  nextBtn.disabled = true;
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