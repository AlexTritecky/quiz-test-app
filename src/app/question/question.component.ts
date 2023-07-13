import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TrackByUtils } from "../utils/track-by.utils";
import { Question } from "../models/question.interface";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent {
  trackByUtils: typeof TrackByUtils = TrackByUtils;

  @Input({ required: true })
  question!: Question;
  @Input()
  correctAnswer?: string;
  @Input()
  userAnswer?: string;
  @Input() isExtraQuestionUsed: boolean = false;

  @Output()
  change = new EventEmitter<string>();
  @Output()
  changeQuestion = new EventEmitter<Question>();

  currentSelection!: string;

  getButtonClass(answer: string): string {
    const isSelected = !this.userAnswer && this.currentSelection === answer;
    const isCorrect =
      this.userAnswer === this.correctAnswer && this.userAnswer === answer;
    return isSelected ? "tertiary" : isCorrect ? "secondary" : "primary";
  }

  buttonClicked(answer: string): void {
    this.currentSelection = answer;
    this.change.emit(answer);
  }
}
