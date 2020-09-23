import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, forkJoin, merge, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, defaultIfEmpty, delay, distinctUntilChanged, filter, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BroadcastService } from '../broadcast.service';

interface IUser {
  name: string;
  id?: number;
  saveStatus?: 'inProgress' | 'failed' | 'success';
}
@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit, OnDestroy {
  options = ['First Static Option'];
  formControl = new FormControl();
  componentDestroyed$ = new Subject<void>();
  inputChange$ = new Subject<string>();
  cancel$ = new Subject<IUser>();
  users: IUser[];
  isSaving: boolean;
  refreshTS = 'never';
  constructor(private http: HttpClient, private broadcastService: BroadcastService) { }

  ngOnInit(): void {
    this.broadcastService.on('refresh').pipe(takeUntil(this.componentDestroyed$)).subscribe(refreshTS => {
      console.log('typeahead comp received refresh event');
      this.refreshTS = refreshTS;
    });

    this.getUsers();
    // this.myControl.valueChanges.pipe(
    this.inputChange$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(value => !!value),
      switchMap(value => this.getLookupSuggestion(value))
    )
      .subscribe(() => { });
  }

  handleInputChange() {
    this.inputChange$.next(this.formControl.value);
  }


  private getLookupSuggestion(value: any) {
    const url = environment.apiBaseUrl + (value.length > 2 ? '/invalid' : '') + '/users?qx=' + value;
    return this.http.get<IUser[]>(url)
      .pipe(
        delay(2000 * (3 - value.length)),
        tap(users => {
          console.log('tapped', users);
          this.options = users.map(user => user.name).slice(value.length);
        }),
        catchError(() => EMPTY)
      );
  }

  private getUsers() {
    const url = environment.apiBaseUrl + '/users?delay=3000';
    return this.http.get<IUser[]>(url)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(users => {
        this.users = users.slice(0, 3);
        // alert('Received the user list');
      });
  }

  handleSubmit($event: MouseEvent) {
    $event.preventDefault();
    // this.users.forEach(user => this.saveUser(user)
    //   .subscribe(
    //     () => user.saveStatus = 'success',
    //     () => user.saveStatus = 'failed'
    //   )
    // );
    this.saveAllUser();
  }

  private saveAllUser() {
    this.isSaving = true;
    forkJoin(
      this.users.map(user =>
        this.saveUser(user)
          .pipe(catchError(() => of({ error: true })))
      )
    ).pipe(
      takeUntil(this.componentDestroyed$),
      finalize(() => this.isSaving = false)
    ).subscribe(console.log, console.warn, () => console.log('fork complete'));
  }

  private saveUser(user: IUser) {
    let url = environment.apiBaseUrl + '/users/' + user.id;
    url += user.id === 2 ? '?delay=1000&statusCode=400' : '?delay=3000';
    user.saveStatus = 'inProgress';
    return this.http.put(url, user)
      .pipe(
        takeUntil(
          // merge(
          // this.componentDestroyed$,
          this.cancel$.pipe(filter(cancelledUser => cancelledUser === user))
          // )
        ),
        defaultIfEmpty({ error: true }),
        tap(() => user.saveStatus = 'success'),
        catchError((err, caught) => {
          user.saveStatus = 'failed';
          return throwError('Error occured while saving');
        })
      );
  }

  retry(user: IUser) {
    this.saveUser(user).subscribe(console.log);
  }

  cancel(user: IUser) {
    user.saveStatus = null;
    this.cancel$.next(user);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }
}
