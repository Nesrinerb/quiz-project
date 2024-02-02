import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { PassQuizComponent } from './pass-quiz/pass-quiz.component';
import { UpdateQuizComponent } from './update-quiz/update-quiz.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';

const routes: Routes = [
  { path: 'pass-quiz', component: PassQuizComponent },
  { path: 'list-quiz', component: ListQuizComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'update-quiz/:id', component: UpdateQuizComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
