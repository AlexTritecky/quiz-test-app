import { Component, OnDestroy, OnInit } from "@angular/core";
import { Category, Difficulty, Question, SubCategory } from "../data.models";
import { Observable, Subject, first, map, takeUntil, tap } from "rxjs";
import { QuizService } from "../quiz.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TrackByUtils } from "../utils/track-by.utils";
import { ToastService } from "../toast.service";

@Component({
  selector: "app-quiz-maker",
  templateUrl: "./quiz-maker.component.html",
  styleUrls: ["./quiz-maker.component.css"],
})
export class QuizMakerComponent implements OnInit, OnDestroy {
  categories$: Observable<SubCategory[]>;
  questions$!: Observable<Question[]>;

  TrackByUtils: typeof TrackByUtils = TrackByUtils;

  quizQuestions!: Question[];
  bonusQuestion!: Question;

  quizForm: FormGroup;
  selectedCategoryHierarchy: SubCategory | undefined;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private categoryHierarchyList: SubCategory[] = [];

  constructor(
    protected quizService: QuizService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.categories$ = quizService.getAllCategories().pipe(
      map((items) => quizService.prepareSubCategories(items)),
      tap((items) => (this.categoryHierarchyList = items))
    );
    this.quizForm = this.initializeQuizForm();
  }

  ngOnInit(): void {
    this.quizForm.controls["category"].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.selectedCategoryHierarchy = this.categoryHierarchyList.find(
          (category) => category.id === +value
        );

        this.manageSubcategory();
      });
  }

  generateQuiz(): void {
    if (this.quizForm.invalid) {
      this.toastService.showToast({
        message: "Please enter correct data in inputs",
        type: "error",
      });
      return;
    }

    const { category, subcategory, difficulty } = this.quizForm.value;
    const id = subcategory || category;

    // Reset questions, set defaults
    this.quizQuestions = [];

    // avoiding extra call
    this.quizService
      .createQuiz(id, difficulty as Difficulty, 6)
      .pipe(first())
      .subscribe((items) => {
        const [firstQuestion, ...questions] = items;
        this.bonusQuestion = firstQuestion;

        this.quizQuestions = questions;
      });
  }
  //  replace question to our bonus question
  switchQuestion(question: Question): void {
    const index = this.quizQuestions.findIndex(
      (item) => item.question === question.question
    );

    this.quizQuestions[index] = this.bonusQuestion;
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
}
