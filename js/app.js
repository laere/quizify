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
      question: 'What color are aircraft black boxes?',
      answers: ['Black', 'Bright Orange', 'Pink', 'Grey'],
      id: util.uuid(),
      correctAnswer: 'Bright Orange',
    },
    {
      question: 'What kind of animal is the jackrabbit?',
      answers: ['Dog', 'Rodent', 'Reptile', 'Hare'],
      id: util.uuid(),
      correctAnswer: 'Hare',
    },
    {
      question: 'What do honey bees collect?',
      answers: ['Nectar', 'Honey', 'Coins', 'Taxes'],
      id: util.uuid(),
      correctAnswer: 'Nectar',
    },
    {
      question: 'How many months have 28 days in them?',
      answers: ['3', '10', '12', '5'],
      id: util.uuid(),
      correctAnswer: '12',
    },
      {
      question: 'What was Walt Disney afraid of?',
      answers: ['Rabbits', 'Lions', 'Snakes', 'Mice'],
      id: util.uuid(),
      correctAnswer: 'Mice',
    },
     {
      question: 'What is a crossbreed between a zebra and a donkey called?',
      answers: ['Zonkey', 'Donbra', 'Zeky', 'Zebkey'],
      id: util.uuid(),
      correctAnswer: 'Zonkey',
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
      if (this.index >= this.quizQuestions.length - 1) {
        this.getResult();
        return;
      } else {
        for (var i = 0; i < radioButtons.length; i++) {
          if (radioButtons[i].checked) {
            this.index++;
          }
        }
      }
    }



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

    var userAnswer = e.target.nextSibling.textContent;

    // console.log('user answer ' + userAnswer);
    // console.log('correct answer ' + this.quizQuestions[this.index].correctAnswer);
    // console.log('current index ' + this.index);

    if (userAnswer === this.quizQuestions[this.index].correctAnswer) {
      console.log('user answer ' + userAnswer);
      this.usersScore++;
    }

  },

  // calculate results of the quiz
  // correctAnswer/quizQuestions.length * 100 + '%'

  getResult: function() {
    var quizApp = document.getElementById('quizapp');
    var result = (100 * (this.usersScore / this.quizQuestions.length)) + '%';
    quizApp.textContent = result;
  },

  countdown: function(number) {
    //30 second countdown timer
    // If no answer then move to the next question.
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
