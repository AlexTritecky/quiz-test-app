import { Component, EventEmitter, inject, Input, Output } from "@angular/core";

import { QuizService } from "../quiz.service";
import { Router } from "@angular/router";
import { Question } from "../models/question.interface";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
})
export class QuizComponent {
  @Input() questions: Question[] | null = [];
  @Output() changeQuestion: EventEmitter<Question> =
    new EventEmitter<Question>();
  hideChangeButton: boolean = false;

  userAnswers: string[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  submit(): void {
    if (this.questions) {
      this.quizService.computeScore(this.questions, this.userAnswers);
      this.router.navigateByUrl("/result");
    }
  }
}
