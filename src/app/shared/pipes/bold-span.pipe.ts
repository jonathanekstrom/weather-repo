import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';
import { noop } from 'rxjs';

@Pipe({
  name: 'boldSpan'
})
export class BoldSpanPipe implements PipeTransform {

  transform(text: string, searchTerm: string, className: string = 'highlight'): string {
    if (!searchTerm || !text) {
      return text;
    }

    const regex = new RegExp(searchTerm, 'gi');
    return text.replace(regex, (match) => `<span class="${className}">${match}</span>`);
  }
}
