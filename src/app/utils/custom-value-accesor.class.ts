import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
} from "@angular/forms";
import {
  AfterViewInit,
  Directive,
  forwardRef,
  Injector,
  Provider,
} from "@angular/core";

@Directive()
export abstract class CustomValueAccessor<T>
  implements ControlValueAccessor, AfterViewInit
{
  private _value!: T;
  disabled = false;
  changes: Array<(value: T) => void> = [];
  touches: Array<() => void> = [];
  control!: FormControl;
  transformGetValue!: (value: T) => any;
  transformSetValue!: (value: any) => T;

  constructor(protected readonly injector: Injector) {}

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    if (this._value !== value) {
      this._value = value;
      this.changes.forEach((fn) =>
        fn(this.transformGetValue ? this.transformGetValue(value) : value)
      );
    }
  }

  static getProviderConfig(useExisting: any): Provider {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => useExisting),
      multi: true,
    };
  }

  static getFormControl(ngControl: NgControl): FormControl | null {
    return ngControl ? (ngControl.control as FormControl) : null;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const ngControl = this.injector.get(NgControl, null);
      // @ts-ignore
      this.control = CustomValueAccessor.getFormControl(ngControl);
    });
  }

  writeValue(value: T): void {
    this._value = this.transformSetValue
      ? this.transformSetValue(value)
      : value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.changes.push(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.touches.push(fn);
  }

  touch(): void {
    this.touches.forEach((fn) => fn());
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
