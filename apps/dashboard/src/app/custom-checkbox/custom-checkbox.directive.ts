// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: 'custom-checkbox'
})
export class CustomCheckboxDirective {
  @Output() checkedChange = new EventEmitter<boolean>();

  @HostListener('changed', ['$event']) changed($event): void {
    this.checkedChange.next($event.detail);
  }
}
