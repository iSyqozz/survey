import { Component, OnInit, OnDestroy } from '@angular/core';
import axios from 'axios';
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'quiz';

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



  ngOnInit(): void {
    // Start the timer when the component loads
    this.set_timer();
  }

  ngOnDestroy(): void {
    // Clean up resources if needed
  }

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
    console.log(this.currChoice);
  }

  highlight(ansr: string) {
    return (this.currChoice === ansr)
  }


  //sumbitting_answer
  submit_answer() {
    this.submittedAnswers.push(this.currChoice)
    this.currChoice = '';
    this.time = 30000;
    this.set_question()
    console.log(this.submittedAnswers)
  }

  //getting score
  async get_score() {

  }
}
