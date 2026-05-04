import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { FriendEventDto } from '../interfaces/friendDto';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  listenFriendUpdated(): Observable<FriendEventDto> {
    return new Observable((observer) => {
      this.socket.on('friend_updated', (data: FriendEventDto) => {
        observer.next(data);
      });

      return () => {
        this.socket.off('friend_updated');
      };
    });
  }
}