    /*************************************FUNZIONE SUL BOTTONE PROCEED DELLA PAGINA PRINCIPALE**************************************/

    const buttonProceed = document.getElementById("buttonProceed");
    const checkbox = document.querySelector(".checkbox");
    
    function goToBenchmark(){
        if (checkbox.checked) {
            window.location.href = "benchmark.html";
        } else {
            alert("Please check the checkbox before proceeding.");
        }
    };
    /*************************************FUNZIONI PER BENCHMARK**************************************/

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

//inizializzazione variabili per le varie funzioni del quiz(+ array di sopra)
const canvasContainer = document.getElementById("container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const numberQuestion = document.getElementById("number-question");

let currentQuestionIndex = 0;
let score = 0;

/*inizializzazione variabili che mi servono per il timer */
const canvas = document.getElementById('countdownCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 55;//raggio del timer
const lineWidth = 15;
let timerInterval = null;
let elapsedTime = 0;
let remainingTime = 60;




function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  drawEmptyCircle(); // Chiamiamo la funzione per disegnare il cerchio vuoto
  resetTimer(); // Assicuriamoci che il timer sia resettato all'avvio del quiz
  startTimer(); // Avviamo il timer per la nuova domanda
}


// Funzione per visualizzare una domanda
function showQuestion() {
 resetState(); // Resettiamo lo stato prima di mostrare una nuova domanda

  let currentQuestion = questions[currentQuestionIndex];//Viene ottenuta la domanda corrente dal array questions utilizzando l'indice currentQuestionIndex.
  let questionNo = currentQuestionIndex + 1;//ci serve per la visualizzazione di sotto per capire a che domanda stiamo(è +1 altrimenti partirebbe da 0)
  questionElement.innerHTML = currentQuestion.question;//nell'h2 dove deve uscire il testo della domanda, vado a scrivercelo dentro 
  numberQuestion.innerHTML = "QUESTION " + questionNo + " <span class='question-count'> / " + questions.length + "</span>";//qua è la visualizzazione su quale domanda ci troviamo,tipo question 1/10 ecc ecc

  currentQuestion.incorrect_answers.push(currentQuestion.correct_answer);//aggiungiamo temporaneamente anche la risposta corretta nell'array delle risposte errate
                                                                         //perchè abbiamo bisogno di fare lo shaffle e d mischiare tutto 
  shuffleArray(currentQuestion.incorrect_answers);

  currentQuestion.incorrect_answers.forEach(answer => {//Viene creato un pulsante per ciascuna risposta nell'array incorrect_answers(dove c'è temporaneamente anche la risposta corretta)
    const button = document.createElement("button");
    button.innerHTML = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button));
    answerButtons.appendChild(button);
  });

  resetTimer(); // Resettiamo il timer prima di avviarlo per la nuova domanda
  startTimer(); // Avviamo il timer per la nuova domanda
  updateCircle(); // Aggiorniamo subito il cerchio vuoto
}


// Funzione per ripristinare lo stato
function resetState() { //Questo loop while continuerà finché ci sono figli all'interno di answerButtons. Quando non ci sono più figli, la condizione diventa falsa e il loop termina.
  while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
  }
}

let isAnsweredCorrectly = false;//si dichiara questa variabile come false 

function selectAnswer(selectedBtn) {//La funzione selectAnswer prende un argomento selectedBtn, che rappresenta il pulsante di risposta selezionato dall'utente.
  const isCorrect = selectedBtn.innerHTML === questions[currentQuestionIndex].correct_answer;
//confronta il testo contenuto nel pulsante selezionato (selectedBtn.innerHTML) con la risposta corretta dell'attuale domanda (questions[currentQuestionIndex].correct_answer). 
//Se corrispondono, la variabile isCorrect viene impostata su true, altrimenti su false.

  // Rimuove la classe di selezione da tutti i pulsanti delle risposte
  const allButtons = document.querySelectorAll('.btn');
  allButtons.forEach(button => {
      button.classList.remove('selected');
  });

  // Aggiunge la classe di selezione solo al pulsante selezionato
  selectedBtn.classList.add("selected");

  // Imposta il flag se la risposta è corretta
  isAnsweredCorrectly = isCorrect;
}

nextButton.addEventListener("click", () => {
  // Incrementa il punteggio solo se la risposta è stata data correttamente
  if (isAnsweredCorrectly) {
    score++;
    console.log(score);
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      showScore();
  }

  // Resettiamo il flag per la prossima domanda
  isAnsweredCorrectly = false;
});

function showScore() {
  // Calcola il punteggio totale
  const correctScore = score;
  console.log(correctScore);
  const totalQuestions = questions.length;
  const wrongScore = totalQuestions - correctScore;

  // Salva i risultati nel local storage
  localStorage.setItem('correctScore', correctScore);
  localStorage.setItem('wrongScore', wrongScore);
  localStorage.setItem('totalQuestions', totalQuestions);

  // Reindirizza alla pagina dei risultati
  window.location.href = "showScore.html";
}


function shuffleArray(array) {
  for (let i = 0 ; i<array.length;i++) {   
      const j = Math.floor(Math.random() * (i + 1)); //è +1 perchè il mathfloor lo riporta sempre all'intero più piccolo. se non metto il +1 non uscirebbe mai l'ultimo valore dell'array
      [array[i], array[j]] = [array[j], array[i]];//Gli elementi dell'array vengono scambiati utilizzando la sintassi di destrutturazione di array di JavaScript.
  }
}


// Avvia il quiz
startQuiz();



//********************************************js per timer**************************************************** */


// Funzione per disegnare il cerchio vuoto
function drawEmptyCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, 1.5 * Math.PI);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = '#9B1E8D';
  ctx.stroke();

  // Imposta le proprietà del testo
  ctx.fillStyle = '#ffffff'; // Colore del testo bianco
  ctx.font = 'bold 10px Arial'; // Imposta il font e la dimensione del testo
  ctx.textAlign = 'center'; // Allinea il testo al centro

  // Calcola la larghezza del testo rimanente
  const textWidth = ctx.measureText(remainingTime).width;

  // Controlla se il testo rimanente è all'interno del canvas
  if (centerX - textWidth / 2 >= 0 && centerX + textWidth / 2 <= canvas.width) {
    // Disegna il testo "seconds"
    ctx.fillText('SECONDS', centerX, centerY - 30); // Disegna il testo "seconds" sopra

    // Disegna il numero dei secondi rimanenti al centro
    ctx.font = 'bold 40px Arial'; // Cambia la dimensione e lo stile del font per il numero
    ctx.fillText(remainingTime, centerX, centerY + 10); // Disegna il numero al centro

    // Disegna il testo "remaining"
    ctx.font = 'bold 10px Arial'; // Ripristina la dimensione e lo stile del font per il testo rimanente
    ctx.fillText('REMAINING', centerX, centerY + 30); // Disegna il testo "remaining" sotto
  }
}

// Funzione per aggiornare l'animazione del cerchio vuoto
function updateCircle() {
  drawEmptyCircle();
  const progress = elapsedTime / 60000; // 60 secondi
  const endAngle = -0.5 * Math.PI + (2 * Math.PI * progress);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, endAngle);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = '#D3D3D9';
  ctx.stroke();
}

// Funzione per aggiornare il timer
function updateTimer() {
  remainingTime--;
}

// Funzione per reimpostare il timer
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  remainingTime = 60;
  timerInterval = null; // Imposta il riferimento dell'intervallo a null per indicare che il timer non è attivo
}


// Funzione per avviare il timer solo se non è già in esecuzione
function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(function () {
      elapsedTime += 1000;
      if (elapsedTime >= 60000) {
        clearInterval(timerInterval);
        nextButton.click(); // Passa automaticamente alla prossima domanda quando il tempo scade
        
      }
      updateCircle();
      updateTimer();
    }, 1000);
  }
}


/*****************************************fine benchmar***************************************************/


