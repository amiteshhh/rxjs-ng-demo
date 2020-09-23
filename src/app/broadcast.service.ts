import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export type broadcastEvent = 'refresh' | 'data';
export interface IBroadCastPayload {
  event: broadcastEvent;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private subject$ = new Subject<IBroadCastPayload>();
  constructor() { }


  emit(event: broadcastEvent, payload?: any) {
    this.subject$.next({
      event,
      payload
    });
  }

  on(event: broadcastEvent) {
    return this.subject$.pipe(
      filter(data => data.event === event),
      map(data => data.payload));
  }
}
