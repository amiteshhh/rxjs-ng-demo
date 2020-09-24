import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
export class TypeaheadComponent implements OnInit {
  options: IUser[];
  formControl = new FormControl();
  inputChange$ = new Subject<string>();
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // this.getUsers();
    // this.formControl.valueChanges
    this.inputChange$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(
          (value) => this.getUsers(value)
        )
      ).subscribe(() => console.log('done'));
  }

  handleInputChange() {
    this.inputChange$.next(this.formControl.value);
  }

  private getUsers(query?: string) {
    const url = environment.apiBaseUrl + '/users?qx=' + query
      + (query.length === 2 ? '&statusCode=400' : '');
    return this.http.get<IUser[]>(url)
      .pipe(
        catchError(() => EMPTY),
        map(users => users.concat({ id: 0, name: 'by map' })),
        tap(users => this.options = users.slice(query.length))
      );
  }

  handleSubmit($event: MouseEvent) {
    $event.preventDefault();
  }

}
