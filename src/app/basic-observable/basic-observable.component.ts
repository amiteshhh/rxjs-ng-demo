import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { BroadcastService } from '../broadcast.service';

@Component({
  selector: 'app-basic-observable',
  templateUrl: './basic-observable.component.html',
  styleUrls: ['./basic-observable.component.scss']
})
export class BasicObservableComponent implements OnInit, AfterViewInit {
  counter = 0;
  refreshTS: any;
  constructor(private broadcastService: BroadcastService) { }

  ngOnInit(): void {
    this.broadcastService.on('refresh').subscribe(data => this.refreshTS = data);
  }

  ngAfterViewInit() {
    const elRef = document.getElementById('counter');
    // const obs$ = fromEvent(elRef, 'click');
    // obs$.subscribe({
    //   next: () => this.counter++,
    //   error: () => { },
    //   complete: () => { }
    // });

    const myObs$ = new Observable(observer => {
      elRef.addEventListener('click', () => {
        observer.next();
      });
    });
    myObs$.subscribe(() => this.counter++);
    // myObs$.subscribe(() => this.counter++);
  }

}
