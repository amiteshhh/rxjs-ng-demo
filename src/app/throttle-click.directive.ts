import { Directive, Input, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[throttleClick]'
})
export class ThrottleClickDirective implements OnInit {
  /** Attach a click event throttled by `throttleDuration`. Default is 3 second. */
  @Output() throttleClick = new EventEmitter<void>();
  /** Throttle duration in milli second */
  @Input() throttleDuration = 3000;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const click$ = fromEvent(this.elementRef.nativeElement, 'click');
    click$.pipe(throttleTime(this.throttleDuration)).subscribe(() => {
      this.throttleClick.emit();
    });
  }
}
