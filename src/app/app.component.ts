import { Component } from '@angular/core';
import { VERSION } from '@angular/core';
import { BroadcastService } from './broadcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version = VERSION.full;

  constructor(
    private broadcastService: BroadcastService
  ) {

  }

  handlePlayClick() {
    console.log('emittin throttled refresh');
    this.broadcastService.emit('play');
  }

  handleRefreshClick() {
    console.log('emittin throttled refresh');
    this.broadcastService.emit('refresh', (new Date()).toLocaleTimeString());
  }

}
