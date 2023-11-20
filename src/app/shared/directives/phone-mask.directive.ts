import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let initalValue = this.el.nativeElement.value.replace(/[^0-9]*/g, '');
    if (initalValue.length <= 11) {
      this.el.nativeElement.value = initalValue.replace(
        /^(\d{2})(\d{1,5})(\d{1,4}).*/,
        '($1) $2-$3'
      );
    }
  }
}
