import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject, first, map, takeUntil, tap } from "rxjs";
import { QuizService } from "../quiz.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "../toast.service";
import { SubCategory } from "../models/category.interface";
import { Difficulty } from "../models/difficulty.type";
import { Question } from "../models/question.interface";

@Component({
  selector: "app-quiz-maker",
  templateUrl: "./quiz-maker.component.html",
  styleUrls: ["./quiz-maker.component.css"],
})
export class QuizMakerComponent implements OnInit, OnDestroy {
  categories$: Observable<SubCategory[]>;
  questions$!: Observable<Question[]>;

  quizQuestions!: Question[];
  bonusQuestion!: Question;

  quizForm: FormGroup;
  selectedCategoryHierarchy!: SubCategory;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private categoryHierarchyList: SubCategory[] = [];

  constructor(
    protected quizService: QuizService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.categories$ = quizService.getAllCategories().pipe(
      map((items) => quizService.prepareSubCategories(items)),
      tap((items) => (this.categoryHierarchyList = items)),
      takeUntil(this.destroy$)
    );
    this.quizForm = this.initializeQuizForm();
  }

  ngOnInit(): void {
    this.quizForm.controls["category"].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.setSelectedCategoryHierarchy(+value);
        this.manageSubcategory();
      });
  }

  generateQuiz(): void {
    if (this.quizForm.invalid) {
      this.showInvalidFormError();
      return;
    }
    const { category, subcategory, difficulty } = this.quizForm.value;
    const id = subcategory || category;

    // Reset questions, set defaults
    this.quizQuestions = [];
    this.quizService
      .createQuiz(id, difficulty as Difficulty, 6)
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((items) => {
        const [firstQuestion, ...questions] = items;
        this.bonusQuestion = firstQuestion;

        this.quizQuestions = questions;
      });
  }

  switchQuestion(question: Question): void {
    const index = this.quizQuestions.findIndex(
      (item) => item.question === question.question
    );

    if (index !== -1) {
      this.quizService
        .createQuiz(
          this.quizForm.value.category,
          this.quizForm.value.difficulty
        )
        .pipe(first(), takeUntil(this.destroy$))
        .subscribe((newQuestions) => {
          const newQuestion = newQuestions[0];

          // Replace the selected question with the new one
          this.quizQuestions.splice(index, 1, newQuestion);
          // Update the bonus question with the new first question
          this.bonusQuestion = newQuestions[0];
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private manageSubcategory(): void {
    if (this.selectedCategoryHierarchy?.subcategories.length) {
      this.quizForm.addControl(
        "subcategory",
        this.formBuilder.control(null, Validators.required)
      );
    } else {
      this.quizForm.removeControl("subcategory");
    }

    this.quizForm.updateValueAndValidity();
  }

  private initializeQuizForm(): FormGroup {
    return this.formBuilder.group({
      category: [null, Validators.required],
      difficulty: [null, Validators.required],
    });
  }

  private setSelectedCategoryHierarchy(categoryId: number): void {
    this.selectedCategoryHierarchy = this.categoryHierarchyList.find(
      (category) => category.id === categoryId
    ) as SubCategory;
  }

  private showInvalidFormError(): void {
    const errorMessage = "Please enter correct data in inputs";
    this.toastService.showToast({ message: errorMessage, type: "error" });

    setTimeout(() => {
      this.toastService.removeToast({ message: errorMessage, type: "error" });
    }, 3000);
  }
}
