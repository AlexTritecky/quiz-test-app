import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Results } from "../models/results.interface";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswersComponent {
  @Input()
  data!: Results;
}
