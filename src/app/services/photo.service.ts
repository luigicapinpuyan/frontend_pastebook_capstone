import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Photo, PhotoDTO } from '../models/photo';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  private baseUrl: string = 'https://localhost:7208/api/photo'
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

  addPhoto(albumId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('albumId', albumId);
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/add-photo`, formData, {headers: this.getHeaders()})
  }

  getPhoto(photoId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/get-photo/${photoId}`, { headers:this.getHeaders(), responseType: 'blob' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading photo:', error);
        return throwError('Something went wrong while loading the photo.');
      })
    );
  }
  
  

  deletePhoto(photoId:string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-photo/${photoId}`, {headers: this.getHeaders()})
  }

  uploadPhoto(albumId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('albumId', albumId);
    formData.append('file', file, file.name);

    return this.http.post<string>(`${this.baseUrl}/add-photo`, formData, { headers: this.getHeaders()});
  }

  

  

  

}
