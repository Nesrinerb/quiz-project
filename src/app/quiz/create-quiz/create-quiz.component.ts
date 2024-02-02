import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizService } from 'src/app/servecis/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent implements OnInit {
  quiz?: FormGroup;
  constructor(private quizService: QuizService, private _router: Router) {}
  ngOnInit() {
    this.quiz = new FormGroup({
      title: new FormControl('', Validators.required),
      questionList: new FormArray([]),
    });
  }

  get title() {
    return this.quiz?.get('title') as FormControl;
  }

  get questionList() {
    return this.quiz?.get('questionList') as FormArray;
  }

  addQuestion() {
    this.questionList.push(
      new FormGroup({
        question: new FormControl(''),
        questionAnswers: new FormArray([]),
      })
    );
  }
  removeQuestion(i: any) {
    this.questionList.removeAt(i);
  }

  questionAnswers(i: any) {
    return this.questionList.at(i).get('questionAnswers') as FormArray;
  }

  addAnswer(i: any) {
    this.questionAnswers(i).push(
      new FormGroup({
        answer: new FormControl('', Validators.required),
        correct: new FormControl(false, Validators.required),
      })
    );
  }
  removeAnswer(i: any, j: any) {
    this.questionAnswers(i).removeAt(j);
  }

  sendQuizData() {
    this.quizService.sendQuiz(this.quiz?.value).subscribe(
      (response) => {
        console.log('success', response);
        this._router.navigate(['quiz/list-quiz']);
      },
      (error) => console.error('error', error)
    );
  }
}
