import { Component, OnInit } from '@angular/core';
import { BroadcastService } from '../broadcast.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  refreshTS = 'never';
  constructor(broadcastService: BroadcastService) {
    broadcastService.on('refresh').subscribe(data => this.refreshTS = data);
  }
}
