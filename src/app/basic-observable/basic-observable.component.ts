import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-basic-observable',
  templateUrl: './basic-observable.component.html',
  styleUrls: ['./basic-observable.component.scss']
})
export class BasicObservableComponent implements OnInit, AfterViewInit, OnDestroy {
  counter = 0;
  refreshTS = 'never';
  componentDestroyed$ = new Subject();
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.on('refresh').pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(data => {
      console.log('Received refresh event');
      this.refreshTS = data as string;
    });
  }

  ngAfterViewInit() {
    const elRef = document.getElementById('counter');
    const click$ = this._fromEvent(elRef, 'click');
    click$.subscribe(() => this.counter++, err => this.counter = err as number);
  }

  _fromEvent(elRef: HTMLElement, eventName) {
    let limitClick = 0;
    return new Observable(subscriber => {
      elRef.addEventListener(eventName, () => {
        if (++limitClick === 5) {
          subscriber.error('An error');
        }
        subscriber.next();
      });
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }

}
