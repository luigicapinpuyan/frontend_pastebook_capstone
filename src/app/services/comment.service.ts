import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment, CommentDTO } from '../models/comment';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl: string = 'https://localhost:7208/api/comment'

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

  addComment(commentDTO: CommentDTO): Observable<Object> {
    return this.http.post(`${this.baseUrl}/add-comment`, commentDTO, {headers: this.getHeaders()})
  }

  editComment(commentDTO: CommentDTO): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-comment`, commentDTO, {headers: this.getHeaders()})
  }

  deleteComment(commentId:string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-comment/${commentId}`, {headers: this.getHeaders()})
  }

  getCommentsByPostId(postId: string): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}/get-post-comments/${postId}`, {headers: this.getHeaders()});
  }

}
