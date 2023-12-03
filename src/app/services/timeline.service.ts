import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { Post, PostDTO } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private baseUrl: string = 'https://localhost:7208/api/timeline'

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
    private sessionService: SessionService,
    private http: HttpClient
  ) { }


  // put these two posts into timeline service
  getNewsFeedPosts(): Observable<PostDTO[]>{
    return this.http.get<Post[]>(this.baseUrl + `/get-newsfeed-posts`, {headers: this.getHeaders()});
  }
  getAllPosts(userId: string): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl + `/get-all-posts/${userId}`, {headers: this.getHeaders()});
  }
}
