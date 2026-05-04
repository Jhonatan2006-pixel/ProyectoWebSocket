import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FriendDto } from '../interfaces/friendDto';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/friends';

  getFriends(): Observable<FriendDto[]> {
    return this.http.get<FriendDto[]>(this.apiUrl);
  }
}