import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Toast } from "../data.models";
import { ToastService } from "../toast.service";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.css"],
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  toastSubscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  removeToast(toast: Toast): void {
    this.toastService.removeToast(toast);
  }

  ngOnDestroy(): void {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }
}
