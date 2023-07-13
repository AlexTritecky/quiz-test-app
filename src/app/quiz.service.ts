import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ApiQuestion } from "./models/api-question.interface";
import { Category, SubCategory } from "./models/category.interface";
import { Difficulty } from "./models/difficulty.type";
import { Question } from "./models/question.interface";
import { Results } from "./models/results.interface";

@Injectable({
  providedIn: "root",
})
export class QuizService {
  private API_URL = "https://opentdb.com/";
  private latestResults!: Results;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<{ trivia_categories: Category[] }>(this.API_URL + "api_category.php")
      .pipe(map((res) => res.trivia_categories));
  }

  createQuiz(
    categoryId: string,
    difficulty: Difficulty,
    perPage: number = 5
  ): Observable<Question[]> {
    return this.http
      .get<{ results: ApiQuestion[] }>(
        `${
          this.API_URL
        }/api.php?amount=${perPage}&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple`
      )
      .pipe(
        map((res) => {
          const quiz: Question[] = res.results.map((q) => ({
            ...q,
            all_answers: [...q.incorrect_answers, q.correct_answer].sort(() =>
              Math.random() > 0.5 ? 1 : -1
            ),
          }));
          return quiz;
        })
      );
  }

  computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index]) score++;
    });
    this.latestResults = { questions, answers, score };
  }

  getLatestResults(): Results {
    return this.latestResults;
  }

  prepareSubCategories(rawCategories: Category[]): SubCategory[] {
    return rawCategories.reduce(
      (accumulator: SubCategory[], currentCategory) => {
        const processedCategory = { ...currentCategory, subcategories: [] };

        if (currentCategory.name.includes(":")) {
          const [mainCategoryName, subCategoryName] =
            currentCategory.name.split(":");
          const existingMainCategoryIndex = accumulator.findIndex(
            (category) => category.name === mainCategoryName
          );
          const newSubCategory = {
            id: processedCategory.id,
            name: subCategoryName.trim(),
          };

          if (existingMainCategoryIndex !== -1) {
            accumulator[existingMainCategoryIndex].subcategories.push(
              newSubCategory
            );
          } else {
            accumulator.push({
              ...processedCategory,
              name: mainCategoryName,
              subcategories: [newSubCategory],
            });
          }

          return accumulator;
        }

        return [...accumulator, processedCategory];
      },
      []
    );
  }
}
