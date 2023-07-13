import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuizMakerComponent } from "./quiz-maker/quiz-maker.component";
import { QuizComponent } from "./quiz/quiz.component";
import { QuestionComponent } from "./question/question.component";
import { AnswersComponent } from "./answers/answers.component";
import { AutoFilterDropDownComponent } from "./auto-filter-drop-down/auto-filter-drop-down.component";
import { TextHighLightPipe } from "./utils/text-high-light.pipe";
import { FilterByPipe } from "./utils/filter-by.pipe";
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
    AutoFilterDropDownComponent,
    TextHighLightPipe,
    FilterByPipe,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
