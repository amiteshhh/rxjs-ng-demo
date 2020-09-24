import { Component } from '@angular/core';
import { VERSION } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version = VERSION.full;

  constructor(
    private messageService: MessageService
  ) {

  }

  handlePlayClick() {
    console.log('Emittin play');
  }

  handleRefreshClick() {
    console.log('Emitting refresh');
    this.messageService.dispatchEvent('refresh', (new Date()).toLocaleTimeString());
  }

}
