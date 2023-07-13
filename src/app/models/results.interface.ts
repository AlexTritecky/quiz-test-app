import { Question } from "./question.interface";

export interface Results {
  questions: Question[];
  answers: string[];
  score: number;
}
