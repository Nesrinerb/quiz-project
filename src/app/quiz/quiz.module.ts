import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { UpdateQuizComponent } from './update-quiz/update-quiz.component';
import { PassQuizComponent } from './pass-quiz/pass-quiz.component';
import { FilterPipe } from './filter.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';

@NgModule({
  declarations: [
    QuizComponent,
    UpdateQuizComponent,
    PassQuizComponent,
    FilterPipe,
    CreateQuizComponent,
    ListQuizComponent,
  ],
  imports: [CommonModule, QuizRoutingModule, ReactiveFormsModule, FormsModule],
})
export class QuizModule {}
