import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[throttleClick]'
})
export class ThrottleClickDirective {
  @Output() throttleClick = new EventEmitter<void>();
  constructor(elementRef: ElementRef) {
    const click$ = fromEvent(elementRef.nativeElement, 'click');
    click$.pipe(throttleTime(3000))
      .subscribe(() => {
        this.throttleClick.emit();
      });
  }

}
