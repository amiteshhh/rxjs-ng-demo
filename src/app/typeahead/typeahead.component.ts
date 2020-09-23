import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  options: string[];
  formControl = new FormControl();

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // this.getUsers();
  }

  private getUsers(query?: string) {
    const url = environment.apiBaseUrl + '/users';
    this.http.get<IUser[]>(url)
      .subscribe(users => this.options = users.map(user => user.name));
  }

  handleSubmit($event: MouseEvent) {
    $event.preventDefault();
  }

}
