import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value.replace(/[^0-9]*/g, '');
    if (initialValue.length <= 11) {
      this.el.nativeElement.value = initialValue.replace(
        /(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/,
        (match: string, p1: string, p2: string, p3: string, p4: string) => `${p1}.${p2 || ''}.${p3 || ''}-${p4 || ''}`
      );
    }
  }  
}
