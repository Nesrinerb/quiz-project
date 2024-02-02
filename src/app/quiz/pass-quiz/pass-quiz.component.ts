import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuizService } from 'src/app/servecis/quiz.service';

@Component({
  selector: 'app-pass-quiz',
  templateUrl: './pass-quiz.component.html',
  styleUrls: ['./pass-quiz.component.css'],
})
export class PassQuizComponent implements OnInit {
  questionList: any = [];
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 60;
  correctAnswer = 0;
  incorrectAnswer = 0;
  interval$: any;
  progress = '0';
  isQuizCompleted = false;

  constructor(private _quizService: QuizService) {}
  ngOnInit(): void {
    this.getQuestions();
    this.startCounter();
  }
  getQuestions() {
    this._quizService.getQuestion().subscribe(
      (response) => {
        this.questionList = response.questions;
        console.log(this.questionList);
      },
      (error) => console.error('erro', error)
    );
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQNum: number, option: any) {
    if (currentQNum === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.currentQuestion++;
      this.correctAnswer++;
      this.getProgressPercent();
    } else {
      this.currentQuestion++;
      this.incorrectAnswer++;
      this.getProgressPercent();
    }
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 6000000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    console.log(this.progress);
    return this.progress;
  }
}
