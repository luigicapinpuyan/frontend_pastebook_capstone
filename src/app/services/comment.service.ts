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

  private header: HttpHeaders = new HttpHeaders({
    'Authorization': this.sessionService.getToken()
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService

  ) { }

  addComment(commentDTO: CommentDTO): Observable<Object> {
    return this.http.post(`${this.baseUrl}/add-comment`, commentDTO, {headers: this.header})
  }

  editComment(commentDTO: CommentDTO): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-comment`, commentDTO, {headers: this.header})
  }

  deleteComment(commentId:string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-comment/${commentId}`, {headers: this.header})
  }

  getCommentsByPostId(postId: string): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}/get-post-comments/${postId}`, {headers: this.header})
  }

}
