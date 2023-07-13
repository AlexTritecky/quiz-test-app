import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Toast } from "./models/toast.interface";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toastsSubject: BehaviorSubject<Toast[]> = new BehaviorSubject<
    Toast[]
  >([]);
  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  showToast(toast: Toast): void {
    const currentValue = this.toastsSubject.value;
    this.toastsSubject.next([...currentValue, toast]);
  }

  removeToast(toast: Toast): void {
    const currentValue = this.toastsSubject.value;
    this.toastsSubject.next(currentValue.filter((t) => t !== toast));
  }
}
