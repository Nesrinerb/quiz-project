import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/servecis/quiz.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css'],
})
export class ListQuizComponent implements OnInit {
  quizsArray: any[] = [];
  constructor(private quizService: QuizService, private _router: Router) {}

  ngOnInit() {
    this.getCreatedQuiz();
  }
  getCreatedQuiz() {
    this.quizService.getCreatedQuiz().subscribe(
      (response) => {
        this.quizsArray = response;
        console.log(response);
      },
      (error) => console.error('error', error)
    );
  }
  removeQuiz(id: number) {
    this.quizService.removeQuiz(id).subscribe(
      (response) =>
        (this.quizsArray = this.quizsArray.filter((_) => _.id != id)),
      (error) => console.error('error', error)
    );
  }
  changeQuiz(id: number) {
    this._router.navigate(['quiz/update-quiz', id]);
  }
  CreatQuiz() {
    this._router.navigate(['quiz/create-quiz']);
  }
}
