import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/servecis/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent {
  quizArray: any[] = [];
  quiz = new FormGroup({
    title: new FormControl(''),
    questionList: new FormArray([]),
  });

  id = 0;

  constructor(
    private quizService: QuizService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit() {
    this.id = parseInt(this._route.snapshot.paramMap.get('id') || '');

    this.quizService.getQuiz(this.id).subscribe(
      (response: any) => {
        this.quiz.patchValue(response);
        const questionListArray = this.quiz?.get('questionList') as FormArray;
        // this.questionList.clear();
        response.questionList.forEach((element: any) => {
          const questionsFormGroup = new FormGroup({
            question: new FormControl(element.question),
            questionAnswers: new FormArray([]),
          });
          const answersFormArray = questionsFormGroup.get(
            'questionAnswers'
          ) as FormArray;
          element.questionAnswers.forEach((answer: any) => {
            const answersFormGroup = new FormGroup({
              answer: new FormControl(answer.answer),
              correct: new FormControl(answer.correct),
            });
            answersFormArray.push(answersFormGroup);
          });
          questionListArray.push(questionsFormGroup);
        });
      },
      (error) => console.error('error', error)
    );
  }

  get title() {
    return this.quiz.get('title') as FormControl;
  }

  get questionList() {
    return this.quiz.get('questionList') as FormArray;
  }

  addQuestion() {
    this.questionList.push(
      new FormGroup({
        question: new FormControl(''),
        questionAnswers: new FormArray([]),
      })
    );
  }
  removeQuestion(i: number) {
    this.questionList.removeAt(i);
  }

  questionAnswers(i: number) {
    return this.questionList.at(i).get('questionAnswers') as FormArray;
  }

  addAnswer(i: number) {
    this.questionAnswers(i).push(
      new FormGroup({
        answer: new FormControl(''),
        correct: new FormControl(false),
      })
    );
  }
  removeAnswer(i: number, j: number) {
    this.questionAnswers(i).removeAt(j);
  }

  sendQuizData() {
    this.quizService.sendUpdatedQuiz(this.id, this.quiz.value).subscribe(
      (response) => {
        console.log('success', response);
        this._router.navigate(['quiz/list-quiz']);
      },
      (error) => console.error('error', error)
    );
  }
}
