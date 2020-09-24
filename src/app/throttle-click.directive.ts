import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[throttleClick]'
})
export class ThrottleClickDirective {
  @Output() throttleClick = new EventEmitter();
  constructor(elementRef: ElementRef) {
    fromEvent(elementRef.nativeElement, 'click')
      .pipe(throttleTime(3000)).subscribe(
        () => this.throttleClick.emit()
      );
  }

}
