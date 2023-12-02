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

  private header: HttpHeaders = new HttpHeaders({
    'Authorization': this.sessionService.getToken()
  })
  constructor(
    private sessionService: SessionService,
    private http: HttpClient
  ) { }


  // put these two posts into timeline service
  getNewsFeedPosts(): Observable<PostDTO[]>{
    return this.http.get<Post[]>(this.baseUrl + `/get-newsfeed-posts`, {headers: this.header});
  }
  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl + `/get-all-posts`, {headers: this.header});
  }
}
