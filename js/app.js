// Quiz Application
// by Zack Bostian 2018

// FEATURES TO ADD:

// Real questions and answers.
// Refactoring.
// Add a play again option at the end of the quiz.
// Style the result page at the end as well.


// Inability to go backwards if a question has been answered. DONE
// Inability to move ahead without choosing an answer. DONE
// Styling. DONE
// Custom CSS radio buttons. DONE.

// Quiz Game

var util = {
  uuid: function() {
    var random;
    var uuid = '';

    for (var i = 0; i < 16; i++) {
      random = Math.random() * 16 | 0;
      if (i === 4 || i === 8 || i === 12) {
        uuid += '-';
      }
      uuid += random.toString(16);
    }
    return uuid;
  }
}

var App = {
  index: 0,
  usersScore: 0,
  quizQuestions:
  [
    {
      question: 'This is Question 1',
      answers: [1,2,3,4],
      id: util.uuid(),
      correctAnswer: 1,
    },
    {
      question: 'This is Question 2',
      answers: [5,6,7,8],
      id: util.uuid(),
      correctAnswer: 6,
    },
    {
      question: 'This is Question 3',
      answers: [9,10,11,12],
      id: util.uuid(),
      correctAnswer: 11,
    }
  ],

  init: function() {
    var answers = this.quizQuestions[this.index].answers;
    var question = this.quizQuestions[this.index].question;
    this.createQuestion(question);
    this.createAnswers(answers);
    setupEventListeners.eventListeners();
  },

  quizSlide(e) {
    var questionElement = document.getElementById('question');
    var answersElement = document.getElementById('answers');
    var radioButtons = Array.from(document.querySelectorAll('.radio-button'));

    if (e.target.id === 'next') {
      // if next button is hit AND it's the last question
      // then get the results
      if (this.index === this.quizQuestions.length - 1) {
        this.getResult();
      } else {
        for (var i = 0; i < radioButtons.length; i++) {
          if (radioButtons[i].checked) {
            this.index++;
          }
        }
      }
    }

    console.log(this.index);



//     if (e.target.id === 'previous') {
//       this.index--;
//       if (this.index < 0 || this.index === 0) {
//         this.index = 0;
//       }
//     }

    var question = this.quizQuestions[this.index].question;
    var answers = this.quizQuestions[this.index].answers;
    questionElement.textContent = question;
    answersElement.textContent = '';
    this.createAnswers(answers);
    this.determineAnswer(e);
  },


  createQuestion: function(question) {
    var questionElement = document.getElementById('question');
    questionElement.textContent = question;
  },

  createAnswers: function(answers) {
    var answersElement = document.getElementById('answers');

    for (var i = 0; i < answers.length; i++) {

      var answerWrapper = document.createElement('div');
      var answerItem = document.createElement('li');
      var radioButton = document.createElement('input');
      var label = document.createElement('label');
      var checkedElement = document.createElement('div');

      //custom CSS radio buttons
      // append radio button and label element to list element

      // checked portion of custome css button
      checkedElement.classList.add('check');

      // label element
      label.textContent = answers[i];
      label.setAttribute('for', answers[i]);

      // radiobutton element
      radioButton.setAttribute('type', 'radio');
      radioButton.setAttribute('name', 'answer');
      radioButton.setAttribute('for', 'answer');
      radioButton.setAttribute('id', answers[i]);
      radioButton.classList.add('radio-button');

      // li element
      // answerItem.textContent = answers[i];
      answerItem.classList.add('answer-wrapper__answer');

      answerItem.appendChild(radioButton);
      answerItem.appendChild(label);
      answerItem.appendChild(checkedElement);

      // li element wrapper
      answerWrapper.classList.add('answer-wrapper');
      // answerWrapper.appendChild(radioButton);
      answerWrapper.appendChild(answerItem);

      // ul element
      answersElement.appendChild(answerWrapper);
    }
  },

  // If userAnswer === correctAnswer
  // userScore + 1
  // else
  // userScore + 0;

  // If user answers question
  // User cannot go to previous question.

  determineAnswer: function(e) {
    // var radioButtons = Array.from(document.querySelectorAll('.radio-button'));

    var userAnswer = parseInt(e.target.nextSibling.textContent);
    if (isNaN(userAnswer)) {
      userAnswer = 0;
    }
    // console.log('user answer ' + userAnswer);
    // console.log('correct answer ' + this.quizQuestions[this.index].correctAnswer);
    // console.log('current index ' + this.index);
    if (userAnswer === this.quizQuestions[this.index].correctAnswer) {
      this.usersScore++;
    }

  },

  // calculate results of the quiz
  // correctAnswer/quizQuestions.length * 100 + '%'

  getResult: function() {
    var quizApp = document.getElementById('quizapp');
    var result = (100 * (this.usersScore / this.quizQuestions.length)) + '%';
    quizApp.textContent = result;
  }

}

var setupEventListeners = {
  eventListeners: function() {
    var quizApp = document.getElementById('quizapp');
    quizApp.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        App.quizSlide(e);
      }
    });

    quizApp.addEventListener('click', function(e) {
      if (e.target.className === 'radio-button') {
        App.determineAnswer(e);
      }
    })
  }
}

App.init();
