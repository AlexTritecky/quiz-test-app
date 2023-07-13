import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: "textHighLight",
})
export class TextHighLightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, searchValue: string): SafeHtml {
    if (!searchValue) {
      return text;
    }
    const highlight = `<b>${searchValue}</b>`;
    const highlightedText = text.replace(
      new RegExp(searchValue, "gi"),
      highlight
    );

    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
