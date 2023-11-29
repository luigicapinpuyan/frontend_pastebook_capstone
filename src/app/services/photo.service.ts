import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo, PhotoDTO } from '../models/photo';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  private baseUrl: string = 'https://localhost:7208/api/photo'
  private header: HttpHeaders = new HttpHeaders({
    'Authorization': this.sessionService.getToken()
  })



  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  addPhoto(photoDTO: PhotoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-photo`, photoDTO, {headers: this.header})
  }

  getPhoto(photoId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/get-photo/${photoId}`, {headers: this.header});
  }

  deletePhoto(photoId:string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-photo/${photoId}`, {headers: this.header})
  }

  uploadPhoto(albumId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('albumId', albumId);
    formData.append('file', file, file.name);
    console.log('FormData:', formData);
    console.log('Uploading file:', file);

    return this.http.post<any>(`${this.baseUrl}/add-photo`, formData);
  }

  

  

}
