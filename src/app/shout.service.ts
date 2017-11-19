import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable} from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class ShoutService {
  private url = 'http://localhost:3000';
  private socket;

  addUser(username) {
    console.log( username + ' Logged in');
    this.socket.emit('add-user', username);
  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessage() {
    const observable = new Observable( observer => {
      this.socket = io();
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.close();
      };
    });
    return observable;
  }
}
