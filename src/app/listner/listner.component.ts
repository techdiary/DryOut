import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ShoutService} from '../shout.service';

@Component({
  selector: 'app-listner',
  templateUrl: './listner.component.html',
  styleUrls: ['./listner.component.css']
})
export class ListnerComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  nickname: string = localStorage.getItem('nickname');
  connection;
  messages= [];
  constructor( private shoutService: ShoutService) { }

  ngOnInit() {
    this.connection = this.shoutService.getMessage().subscribe( message => {
      this.messages.push(message);
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
}
