import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Friend } from '../models/friend';
import { MiniProfileDTO, User } from '../models/user';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private baseUrl: string = 'https://localhost:7208/api/friend'

  private header: HttpHeaders = new HttpHeaders({
    'Authorization': this.sessionService.getToken()
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }


  getAllFriendRequests(): Observable<Friend[]>{
    return this.http.get<Friend[]>(this.baseUrl + `/get-all-friend-request/`, {headers: this.header});
  }

  acceptFriendRequest(requestId?: string): Observable<Object>{
    return this.http.post(this.baseUrl + `/accept-friend/${requestId}`, {headers: this.header});
  }

  removeFriendRequest(requestId?: string): Observable<Object>{
    return this.http.delete(this.baseUrl + `/reject-friend/${requestId}`, {headers: this.header});
  }

  getAllFriends(): Observable<MiniProfileDTO[]>{
    return this.http.get<MiniProfileDTO[]>(this.baseUrl + `/get-all-friends`, {headers: this.header});
  }

}
