import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BroadcastService } from '../broadcast.service';

@Component({
  selector: 'app-basic-observable',
  templateUrl: './basic-observable.component.html',
  styleUrls: ['./basic-observable.component.scss']
})
export class BasicObservableComponent implements OnInit, AfterViewInit {
  count = 0;
  constructor(private broadcastService: BroadcastService) { }

  ngOnInit(): void {
    this.broadcastService.on('refresh').subscribe(data => console.log('recievd refresh event'));
    this.broadcastService.on('data').subscribe(data => console.log('recievd data event', data));
  }

  ngAfterViewInit() {
    const buttonEl = document.querySelector('#counterButton');
    buttonEl.addEventListener('click', () => {
      this.count++;
    });
    // const obs$ = fromEvent(buttonEl, 'click').pipe(tap(() => console.warn('hmm u clicked')));
    // obs$.subscribe(() => {
    //   this.count++;
    // });
    // obs$.subscribe((ev) => {
    //   this.count++;
    // });
    const obs$ = new Observable((subscriber) => {
      buttonEl.addEventListener('click', (event) => {
        subscriber.next(event);
      });
      // subscriber.next(42);
      // subscriber.next(100); // "return" another value
      // subscriber.error('some error result');
      // subscriber.complete();
    });
    // obs$.subscribe((ev) => {
    //   console.log('subscriber 1 received ', ev);
    //   this.count++;
    // });
    // obs$.subscribe({
    //   next: (event) => {
    //     console.log('subscriber 2 received ', event);
    //   },
    //   error: () => console.log('subscriber 2: Handle error'),
    //   complete: () => console.log('subscriber 2 : Observable completed')
    // });
  }

}
