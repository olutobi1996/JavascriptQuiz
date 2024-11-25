let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


/* These are the const Quiz Questions
 will will remain the same throughout,
 This section of code was also adapted from a
 quiz video online i have referenced in my README.MD
*/
const quizArray = [
    {
        question: "what football team won the world cup in 1966?",
        answers: [
            {text: "England", correct: true},
            {text: "Germany", correct: false},
            {text: "Brazil", correct: false},
            {text: "France", correct: false},
        ],
    },
    {
        question: "How many coloured rings in the Olympic Flag?",
        answers: [
            {text: "2", correct: false},
            {text: "6", correct: false},
            {text: "4", correct: false},
            {text: "5", correct: true},
        ],
    },
    {
        question: "Who directed the film pulp fiction?",
        answers: [
            {text: "Daniel Day Lewis", correct: false},
            {text: "Quentin Taratino", correct: true},
            {text: "Steven Speilberg", correct: false},
            {text: "Martin Scorses", correct: false},
        ],
    },
    {
        question:
            "In the film Lion King Mufasa dies from being trampled on by a pack of?",
        answers: [
            {text: "sheep", correct: false},
            {text: "hyenas", correct: false},
            {text: "wildebeests", correct: true},
            {text: "bears", correct: false},
        ],
    },
    {
        question: "Who wrote the novel of mice and men?",
        answers: [
            {text: "Virginia Woolf", correct: false},
            {text: "Elaine Anderson", correct: false},
            {text: "William Faulkner", correct: false},
            {text: "John Steinbeck", correct: true},
        ],
    },
    {
        question: "What is the name of the fourth book in the Harry Potter Series?",
        answers: [
            {text: "Harry Potter and the Goblet of Fire", correct: true},
            {text: "Harry Potter and the Deathly Hallows", correct: false},
            {text: "Harry Potter and Philosophers Stone", correct: false},
            {text: "Harry Potter and Half Blood Prince", correct: false},
        ],
    },
    {
        question: "What year did world war II end?",
        answers: [
            {text: "1950", correct: false},
            {text: "1945", correct: true},
            {text: "1960", correct: false},
            {text: "1940", correct: false},
        ],
    },
    {
        question: "Where did sushi originate?",
        answers: [
            {text: "China", correct: false},
            {text: "Fiji", correct: false},
            {text: "South Korea", correct: false},
            {text: "Japan", correct: true},
        ],
    },
  ];

  restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
  });

  nextBtn.addEventListener("click", (displayNext = () =>{
    questionCount += 1;

    if(questionCount == quizArray.length){
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your Score Is " +
        scoreCount + " out of " + questionCount;
    }
    else{
        countOfQuestion.innerHTML = questionCount + 1 +
        " of " + quizArray.length + "Question";

        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
  })
);


const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) =>{
    let quizCards = document.querySelector(".container-mid");

    quizCards.forEach((card)=>{
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);

    for (let i of quizArray){
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">
            ${i.options[0]}
        </button>
        <button class="option-div" onclick="checker(this)">
            ${i.options[1]}
        </button>
        <button class="option-div" onclick="checker(this)">
            ${i.options[2]}
        </button>
        <button class="option-div" onclick="checker(this)">
            ${i.options[3]}
        </button>
        `;

        quizContainer.appendChild(div);
    }
}

function checker(userOption){
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName
    ("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if(userSolution === quizArray[questionCount].correct){
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((Element) => {
            if ((Element.innerText = quizArray[questionCount].correct)){
                Element.classList.add("correct");
            }
        });
    }
}