"use strict";

const API =
  "https://raw.githubusercontent.com/sergesarapov/Quiz-a-la-kinopoisk/online/quiz.json";

class Quiz {
  constructor(api, container = ".quiz") {
    this.title = "";
    this.img = "";
    this.lead = "";
    this.questions = [];
    this.totalQuestions = 0;
    this.results = [];
    this.currentQuestion = 1;
    this.correctAnswers = 0;
    this.container = document.querySelector(`${container}`);
    this._fetch(api);
  }

  _fetch(api) {
    return fetch(api)
      .then((response) => response.json())
      .then((response) => {
        this.title = response.title;
        this.img = response.img;
        this.lead = response.lead;
        this.questions = response.questions;
        this.totalQuestions = response.questions.length;
        this.results = response.results;
      })
      .then(() => {
        this._render(this.questions[0]);
        this._init();
      })
      .catch((error) => {
        console.log(error);
      });
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
      new Quiz(API);
    });
  }
}

new Quiz(API);
