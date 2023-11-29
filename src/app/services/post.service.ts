import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo, PhotoDTO } from '../models/photo';
import { Observable } from 'rxjs';
import { PostDTO } from '../models/post';
import { SessionService } from './session.service';

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


  private baseUrl: string = 'https://localhost:7116/api/post'

  addPost(postDTO: PostDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-post/`, postDTO, {headers: this.header})
  }
}
