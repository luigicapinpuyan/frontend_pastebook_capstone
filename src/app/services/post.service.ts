import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo, PhotoDTO } from '../models/photo';
import { Observable } from 'rxjs';
import { PostDTO } from '../models/post';
import { SessionService } from './session.service';
import { MiniProfileDTO } from '../models/user';
import { LikeDTO } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private header: HttpHeaders = new HttpHeaders({
    'Authorization': this.sessionService.getToken()
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { 
  }


  private baseUrl: string = 'https://localhost:7208/api/post'

  addPost(postDTO: PostDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-post/`, postDTO, {headers: this.header});
  }

  updatePost(postDTO: PostDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-post/`, postDTO, {headers: this.header});
  }

  deletePost(postId: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-post/${postId}`, {headers: this.header});
  }

  getPost(postId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/get-post/${postId}`, {headers: this.header});
  }

  getPostLikes(postId: string): Observable<MiniProfileDTO[]>{
    return this.http.get<MiniProfileDTO[]>(`${this.baseUrl}/get-post-likes/${postId}`, {headers: this.header});
  }

  likePost(likeDTO: LikeDTO): Observable<Object>{
    return this.http.post(`${this.baseUrl}/like-post`, {headers: this.header});
  }

}
