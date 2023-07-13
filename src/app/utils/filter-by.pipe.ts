import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterBy",
})
export class FilterByPipe implements PipeTransform {
  transform(
    inputString: string | null,
    items: any[] = [],
    key: string = "name"
  ): any[] {
    if (!inputString) {
      return items;
    }

    const lowerCaseSearchTerm = inputString.toLowerCase();

    return items.filter((item) =>
      item[key].toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
