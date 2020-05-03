"use strict";

const quiz = {
  title: "Насколько хорошо вы знаете народные пословицы?",
  img: "https://i.ytimg.com/vi/71xs__dp6ag/maxresdefault.jpg",
  lead:
    "В повседневной речи мы часто прибегаем к пословицам и поговоркам, уходящим своими корнями далеко в прошлое. Но так ли хорошо мы знаем их на самом деле?",
  questions: [
    {
      question: "Глаза на морком...",
      answerA: "месте",
      answerB: "лице",
      answerC: "лбу",
      answerD: "деле",
      correctAnswer: "A",
    },
    {
      question: "Говорят — хорош, а дела ни на ...",
      answerA: "рубль",
      answerB: "евро",
      answerC: "грош",
      answerD: "доллар",
      correctAnswer: "C",
    },
    {
      question: "Не то рыба, не то...",
      answerA: "птица",
      answerB: "самолет",
      answerC: "супермен",
      answerD: "НЛО",
      correctAnswer: "A",
    },
    {
      question: "Всяк Еремей про себя...",
      answerA: "говорит",
      answerB: "слушает",
      answerC: "думает",
      answerD: "разумей",
      correctAnswer: "D",
    },
    {
      question: "Не за бороду — за ум...",
      answerA: "дергают",
      answerB: "уважают",
      answerC: "жалуют",
      answerD: "респектуют",
      correctAnswer: "C",
    },
  ],
  results: [
    "Зато наверняка хорошо владеете современным сленгом",
    "Что-то слышали от бабушки",
    "А не филолог ли вы, часом?",
  ],
};

class Quiz {
  constructor(quiz, container = ".quiz") {
    this.title = quiz.title;
    this.img = quiz.img;
    this.lead = quiz.lead;
    this.questions = quiz.questions;
    this.totalQuestions = quiz.questions.length;
    this.results = quiz.results;
    this.currentQuestion = 1;
    this.correctAnswers = 0;
    this.container = document.querySelector(`${container}`);
    this._render(this.questions[0]);
    this._init();
  }

  _render(question) {
    let block = `
       <h1 class="quiz__title">${this.title}</h1>
      <img
        class="quiz__image"
        src="${this.img}"
        alt="quiz-image"
      />
      <p class="quiz__lead">${this.lead}</p>
      <section class="question">
        <p class="question__count"> ${this.currentQuestion} из ${this.totalQuestions}</p>
        <h2 class="question__title">${question.question}</h2>
        <div class="question__answer" data-id="a">
          <span class="order">A</span>${question.answerA}
        </div>
        <div class="question__answer" data-id="b">
          <span class="order">B</span>${question.answerB}
        </div>
        <div class="question__answer" data-id="c">
          <span class="order">C</span>${question.answerC}
        </div>
        <div class="question__answer" data-id="d">
          <span class="order">D</span>${question.answerD}
        </div>
      </section>
      `;
    this.container.innerHTML = block;
  }

  _init() {
    document.querySelector(".question").addEventListener("click", (event) => {
      let currentAnswer = event.target.dataset.id;

      if (
        currentAnswer == "a" ||
        currentAnswer == "b" ||
        currentAnswer == "c" ||
        currentAnswer == "d"
      ) {
        this._checkCorrectAnswer(currentAnswer);
        this._turnNext();
      }
    });
  }

  _turnNext() {
    if (this.currentQuestion >= this.questions.length) {
      this._showResult();
      return;
    }
    this.currentQuestion++;
    this._render(this.questions[this.currentQuestion - 1]);
    this._init();
  }

  _checkCorrectAnswer(answer) {
    if (
      answer ==
      this.questions[this.currentQuestion - 1].correctAnswer.toLowerCase()
    ) {
      this.correctAnswers++;
    }
  }
  _showResult() {
    let resultStatement;
    if (this.correctAnswers == 0) {
      resultStatement = this.results[0];
    }
    if (this.correctAnswers <= 4 && this.correctAnswers > 0) {
      resultStatement = this.results[1];
    }
    if (this.correctAnswers == 5) {
      resultStatement = this.results[2];
    }
    let block = `
      <div class="result">
        <img
          src="${this.img}"
          alt="result image"
        />
        <div class="result__text">
          <h1>${resultStatement}</h1>
          <p>Ваш результат: ${this.correctAnswers}</p>
          <p class="reload">Попробовать еще раз</p>
        </div>
      </div>
      `;
    document.querySelector("section").innerHTML = block;
    let reload = document.querySelector(".reload");
    reload.addEventListener("click", (event) => {
      new Quiz(quiz);
    });
  }
}

new Quiz(quiz);
