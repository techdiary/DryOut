import {Component} from '@angular/core';
import {ShoutService} from '../shout.service';

@Component({
  selector: 'app-shout',
  templateUrl: './shout.component.html',
  styleUrls: ['./shout.component.css']
})
export class ShoutComponent{
  message;

  constructor(private shoutService: ShoutService) {}

  sendMessage() {
    this.shoutService.sendMessage(this.message);
    this.message = '';
  }

}
