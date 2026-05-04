import { Component, ChangeDetectorRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

import { FriendService } from '../../services/friend.service';
import { SocketService } from '../../services/socket.service';
import { FriendDto, FriendEventDto } from '../../interfaces/friendDto';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-friends-realtime',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './friends-realtime.html',
  styleUrl: './friends-realtime.css'
})
export class FriendsRealtimeComponent implements OnInit, OnDestroy {
  friends: FriendDto[] = [];
  lastEvent: FriendEventDto | null = null;

  displayedColumns: string[] = ['id', 'name', 'gender'];

  cargando = true;
  error = '';

  private socketSub?: Subscription;

  constructor(
    private friendService: FriendService,
    private socketService: SocketService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarFriends();

    this.socketSub = this.socketService.listenFriendUpdated().subscribe({
      next: (event) => {
        console.log('Evento recibido en Angular:', event);

        this.ngZone.run(() => {
          this.lastEvent = event;
          this.cargarFriends();
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Error escuchando socket:', error);
      }
    });
  }

  cargarFriends(): void {
    this.cargando = true;
    this.error = '';

    this.friendService.getFriends().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.friends = data;
          this.cargando = false;
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Error cargando friends:', error);

        this.ngZone.run(() => {
          this.error = 'No se pudieron cargar los datos de my_friends';
          this.cargando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.socketSub?.unsubscribe();
  }
}