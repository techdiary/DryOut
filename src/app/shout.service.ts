import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable} from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class ShoutService {
  private url = 'http://localhost:3000';
  private socket;

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessage() {
    let observable = new Observable( observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnet();
      };
    });
    return observable;
  }
}
