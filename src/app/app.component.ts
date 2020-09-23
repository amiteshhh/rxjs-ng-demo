import { Component } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version = VERSION.full;

  constructor(
  ) {

  }

  handlePlayClick() {
    console.log('Emittin play');
  }

  handleRefreshClick() {
    console.log('Emitting refresh');
  }

}
