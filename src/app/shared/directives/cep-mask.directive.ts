import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCepMask]'
})
export class CepMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.el.nativeElement.value.replace(/[^0-9]*/g, '');
    if (initalValue.length <= 8) {
      this.el.nativeElement.value = initalValue.replace(
        /^(\d{0,5})(\d{0,3}).*/,
        (match: string, p1: string, p2: string) => `${p1}-${p2}`
      );
    } else {
      event.stopPropagation();
    }
  }
}
