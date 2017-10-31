import {Component, OnDestroy, OnInit} from '@angular/core';
import { ShoutService} from '../shout.service';

@Component({
  selector: 'app-listner',
  templateUrl: './listner.component.html',
  styleUrls: ['./listner.component.css']
})
export class ListnerComponent implements OnInit, OnDestroy {
  connection;
  messages= [];
  constructor( private shoutService: ShoutService) { }

  ngOnInit() {
    this.connection = this.shoutService.getMessage().subscribe( message => {
      this.messages.push(message);
    });
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
