import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-observable',
  templateUrl: './basic-observable.component.html',
  styleUrls: ['./basic-observable.component.scss']
})
export class BasicObservableComponent implements OnInit, AfterViewInit {
  counter = 0;
  refreshTS = 'never';
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const elRef = document.getElementById('counter');
  }

}
