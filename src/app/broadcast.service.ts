import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

declare type EventType = 'refresh' | 'play';

interface EventPayload {
  data?: any;
  eventType: EventType;
}

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private subject$ = new Subject<EventPayload>();
  constructor() { }

  emit(eventType: EventType, data?: any) {
    this.subject$.next({ eventType, data });
  }

  on(eventType: EventType) {
    return this.subject$
      .pipe(
        filter(payload => payload.eventType === eventType),
        map(payload => payload.data)
      );
  }
}
