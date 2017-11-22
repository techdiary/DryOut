import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable} from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class ShoutService {
  private url = 'http://localhost:3000';
  private socket = io();

  sendNickname(name) {
    this.socket.emit('send-nickname', name);
  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessage() {
    const observable = new Observable( observer => {
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
