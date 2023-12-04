import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo, PhotoDTO } from '../models/photo';
import { Observable } from 'rxjs';
import { Post, PostDTO } from '../models/post';
import { SessionService } from './session.service';
import { MiniProfileDTO } from '../models/user';
import { LikeDTO } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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
  ) { 
  }


  private baseUrl: string = 'https://localhost:7208/api/post'

  addPost(postDTO: PostDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-post`, postDTO, {headers: this.getHeaders()});
  }

  updatePost(postDTO: PostDTO): Observable<PostDTO> {
    return this.http.put(`${this.baseUrl}/update-post`, postDTO, {headers: this.getHeaders()});
  }

  deletePost(postId: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-post/${postId}`, {headers: this.getHeaders()});
  }

  getPost(postId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/get-post/${postId}`, {headers: this.getHeaders()});
  }

  getPostLikes(postId: string): Observable<MiniProfileDTO[]>{
    return this.http.get<MiniProfileDTO[]>(`${this.baseUrl}/get-post-likes/${postId}`, {headers: this.getHeaders()});
  }

  likePost(likeDTO: LikeDTO): Observable<Object>{
    console.log(likeDTO)
    return this.http.post(`${this.baseUrl}/like-post`, likeDTO, {headers: this.getHeaders()});
  }

  isLiked(postId: string | undefined): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/is-post-liked/${postId}`, {headers: this.getHeaders()});
  }

}
