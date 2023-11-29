import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment, CommentDTO } from '../models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl: string = 'https://localhost:7116/api/comment'

  constructor(
    private http: HttpClient
  ) { }

  addComment(commentDTO: CommentDTO): Observable<Object> {
    return this.http.post(`${this.baseUrl}/add-comment`, commentDTO)
  }

  editComment(commentId: number, commentDTO: CommentDTO): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-comment/${commentId}`, commentDTO)
  }

  deleteComment(commentId:number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-comment/${commentId}`)
  }
}
