import {
  AbstractControl,
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
  
  changes: Array<(value: T) => void> = [];
  touches: Array<() => void> = [];
  control!: AbstractControl | null;
  transformGetValue!: (value: T) => any;
  transformSetValue!: (value: any) => T;

  constructor(protected readonly injector: Injector) {}

  // Gets the current value of the control.
  get value(): T {
    return this._value;
  }

  // Sets the value of the control.
  set value(value: T) {
    if (this._value !== value) {
      this._value = value;
      this.changes.forEach((fn) =>
        fn(this.transformGetValue ? this.transformGetValue(value) : value)
      );
    }
  }

  // Returns the provider configuration for this value accessor.
  static getProviderConfig(useExisting: any): Provider {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => useExisting),
      multi: true,
    };
  }

  // Gets the Angular form control that this value accessor is associated with.
  static getFormControl(ngControl: NgControl): AbstractControl | null {
    return ngControl ? ngControl.control : null;
  }

  ngAfterViewInit(): void {
    const ngControl = this.injector.get(NgControl, null);
    this.control = CustomValueAccessor.getFormControl(ngControl!);
  }

  //  Sets the value of the control.
  writeValue(value: T): void {
    this._value = this.transformSetValue
      ? this.transformSetValue(value)
      : value;
  }

  //  Registers a function to be called when the value of the control changes.
  registerOnChange(fn: (value: T) => void): void {
    this.changes.push(fn);
  }

  // Registers a function to be called when the control is touched.
  registerOnTouched(fn: () => void): void {
    this.touches.push(fn);
  }

  //  Called when the control is touched.
  touch(): void {
    this.touches.forEach((fn) => fn());
  }
}
