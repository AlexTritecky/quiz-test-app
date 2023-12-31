import { Component, Input, OnInit } from "@angular/core";
import { CustomValueAccessor } from "../utils/custom-value-accesor.class";
import { FormControl } from "@angular/forms";
import { TrackByUtils } from "../utils/track-by.utils";
import { SubCategory, Category } from "../models/category.interface";

@Component({
  selector: "app-auto-filter-drop-down",
  templateUrl: "./auto-filter-drop-down.component.html",
  styleUrls: ["./auto-filter-drop-down.component.css"],
  providers: [
    CustomValueAccessor.getProviderConfig(AutoFilterDropDownComponent),
  ],
})
export class AutoFilterDropDownComponent
  extends CustomValueAccessor<string>
  implements OnInit
{
  @Input({ required: true }) dataOptions!: Array<SubCategory | Category>;
  @Input() placeholderText: string = "Select";
  @Input() optionValue: string = "id";
  @Input() optionLabel: string = "name";

  searchControl = new FormControl<string | null>("");
  displayResults = false;

  trackByUtils = TrackByUtils;

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.displayResults = !!value?.length;
    });
  }

  onInputFocus(): void {
    this.displayResults = true;
  }

  selectOption(value: any): void {
    this.value = value[this.optionValue];
    this.searchControl.setValue(value[this.optionLabel]);
    this.displayResults = false;
  }
}
