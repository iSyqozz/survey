


import { Component } from '@angular/core';
import { question_props } from 'src/types';

const question_list: Array<question_props> = [
  {
    question: "What is the capital of France?",
    a1: "Paris",
    a2: "London",
    a3: "Berlin",
    a4: "Madrid",
  },
  {
    question: "Which planet is known as the Red Planet?",
    a1: "Mars",
    a2: "Jupiter",
    a3: "Venus",
    a4: "Saturn",
  },
  {
    question: "What is the largest mammal?",
    a1: "Blue whale",
    a2: "Elephant",
    a3: "Giraffe",
    a4: "Hippopotamus",
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    a1: "Albert Einstein",
    a2: "Isaac Newton",
    a3: "Galileo Galilei",
    a4: "Nikola Tesla",
  },
  {
    question: "What is the chemical symbol for gold?",
    a1: "Au",
    a2: "Ag",
    a3: "Gd",
    a4: "Go",
  },
  {
    question: "Which gas do plants use for photosynthesis?",
    a1: "Carbon dioxide",
    a2: "Oxygen",
    a3: "Nitrogen",
    a4: "Hydrogen",
  },
  {
    question: "What is the largest organ in the human body?",
    a1: "Skin",
    a2: "Liver",
    a3: "Heart",
    a4: "Brain",
  },
  {
    question: "Which famous playwright wrote 'Romeo and Juliet'?",
    a1: "William Shakespeare",
    a2: "George Bernard Shaw",
    a3: "Oscar Wilde",
    a4: "Jane Austen",
  },
  {
    question: "What is the tallest mountain in the world?",
    a1: "Mount Everest",
    a2: "K2",
    a3: "Makalu",
    a4: "Kilimanjaro",
  },
  {
    question: "Which gas is responsible for the Earth's ozone layer?",
    a1: "Oxygen",
    a2: "Nitrogen",
    a3: "Carbon dioxide",
    a4: "Ozone",
  },
];


//regex matching

// First Name
const firstNameRegex: RegExp = /^[A-Za-z]+$/;

// Last Name
const lastNameRegex: RegExp = /^[A-Za-z]+$/;

// Age
const ageRegex: RegExp = /^\d{1,3}$/;

// Phone Number
const phoneNumberRegex: RegExp = /^\d{8}$/;

// Email
const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



const example_endpoint = `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=20`


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz';

  //page title
  pageTitle = 'Register';

  AnswersButton = 'next';
  //questions and answers 
  cq = 0;
  questions = question_list;
  question = this.questions[this.cq].question
  a1 = this.questions[this.cq].a1
  a2 = this.questions[this.cq].a2
  a3 = this.questions[this.cq].a3
  a4 = this.questions[this.cq].a4

  //answered questions
  submittedAnswers: Array<string> = [];
  currChoice = '';
  time = 30000;

  //user data
  firstName = ''
  lastName = ''
  age = ''
  phone = ''
  email = ''

  //conditional rendering
  saved = false
  warning = false
  warningMessage = 'Choose an Answer!'

  res:Array<any> = []

  //starting and resetting timer
  set_timer() {
    const id = setInterval(() => {
      if (this.time === 0) {
        this.submittedAnswers.push(this.currChoice)
        this.currChoice = '';
        this.time = 30000;
        this.set_question()
        console.log(this.submittedAnswers)
      } else {
        this.time -= 1000;
      }
    }, 1000);
  }

  isClose() {

    if (this.time <= 5000) {
      this.warning = true;
      this.warningMessage = 'Time is running Out!';
      setTimeout(() => {
        this.warning = false
      }, 5000);
    }

    return (
      this.time <= 5000 ? true : false
    )
  }

  // question traversal
  set_question() {
    if (this.cq === this.questions.length - 1) {
      this.get_score()

    } else {
      this.cq += 1
      this.question = this.questions[this.cq].question
      this.a1 = this.questions[this.cq].a1
      this.a2 = this.questions[this.cq].a2
      this.a3 = this.questions[this.cq].a3
      this.a4 = this.questions[this.cq].a4
    }
  }

  //setting answer
  set_answer(ansr: string) {
    this.currChoice = ansr;
  }

  highlight(ansr: string) {
    return (this.currChoice === ansr)
  }


  //sumbitting_answer
  submit_answer() {

    if (this.currChoice === '') {
      this.warning = true
      this.warningMessage = 'Choose an Answer!';
      setTimeout(() => {
        this.warning = false
      }, 3000);
      return
    }

    this.warning = false

    if (this.cq === question_list.length - 1) {
      this.AnswersButton = 'submit'
    }

    this.submittedAnswers.push(this.currChoice)
    this.currChoice = '';
    this.time = 30000;
    this.set_question();
    console.log(this.submittedAnswers);
  }


  //validate one input
  validate_input(type: string) {
    if (type === 'first') {
      return this.firstName === '' ? true : firstNameRegex.test(this.firstName)
    } else if (type === 'last') {
      return this.lastName === '' ? true : lastNameRegex.test(this.lastName)
    } else if (type === 'age') {
      return this.age === '' ? true : ageRegex.test(this.age)
    } else if (type === 'number') {
      return this.phone === '' ? true : phoneNumberRegex.test(this.phone)
    } else if (type === 'email') {
      return this.email === '' ? true : emailRegex.test(this.email)
    } else {
      return false
    }
  }


  //form inputs validation
  validate_form() {

    const res1 = firstNameRegex.test(this.firstName);
    const res2 = lastNameRegex.test(this.lastName);
    const res3 = ageRegex.test(this.age);
    const res4 = phoneNumberRegex.test(this.phone);
    const res5 = emailRegex.test(this.email);

    if (res1 && res2 && res3 && res4 && res5) {
      this.saved = true
      this.pageTitle = 'Quiz'
      this.set_timer()
    }
    else {
      alert('Invalid or Missing Form Data')
    }

  }


  //getting score
  async get_score() {

     const data = await fetch(example_endpoint,{
      method:'GET'
     });

     this.res = await data.json();
     console.log(this.res)
  }
}
