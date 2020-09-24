import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

declare type EventType = 'refresh' | 'play' | 'custom';
interface Payload {
  eventType: EventType;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject$ = new Subject<Payload>();
  constructor() { }

  dispatchEvent(eventType: EventType, data?: any) {
    this.subject$.next({ eventType, data });
  }

  on(eventType: EventType) {
    return this.subject$.pipe(
      filter(payload => payload.eventType === eventType),
      map(payload => payload.data)
    );
  }
}
