import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Friend, FriendDTO } from '../models/friend';
import { MiniProfileDTO, User } from '../models/user';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private baseUrl: string = 'https://localhost:7208/api/friend'

  private getHeaders(): HttpHeaders {
    const token = this.sessionService.getToken();
    if (!token) {
      // Handle the case where there is no token (optional)
      console.error("No token available");
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Authorization': token,
    });
  }

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  addFriend(friendDTO: FriendDTO): Observable<Object>{
    return this.http.post(this.baseUrl + `/add-friend`, friendDTO, {headers: this.getHeaders()});
  }

  getFriendExist(friendDTO: FriendDTO): Observable<Friend>{
    return this.http.post<Friend>(`${this.baseUrl}/get-friend-exist`, friendDTO, {headers: this.getHeaders()});
  }

  getAllFriendRequests(): Observable<Friend[]>{
    return this.http.get<Friend[]>(this.baseUrl + `/get-all-friend-request`, {headers: this.getHeaders()});
  }

  acceptFriendRequest(requestId?: string): Observable<Object>{
    return this.http.post(`${this.baseUrl}/accept-friend/${requestId}`, {}, {headers: this.getHeaders()});
  }

  removeFriendRequest(requestId?: string): Observable<Object>{
    return this.http.delete(this.baseUrl + `/reject-friend/${requestId}`, {headers: this.getHeaders()});
  }

  getAllFriends(): Observable<MiniProfileDTO[]>{
    return this.http.get<MiniProfileDTO[]>(this.baseUrl + `/get-all-friends`, {headers: this.getHeaders()});
  }

}
