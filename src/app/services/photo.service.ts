import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo, PhotoDTO } from '../models/photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  private baseUrl: string = 'https://localhost:7116/api/photo'

  constructor(
    private http: HttpClient
  ) { }

  addPhoto(albumId: number, photoDTO: PhotoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-photo/${albumId}`, photoDTO)
  }

  uploadPhoto(albumId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('albumId', albumId.toString());
    formData.append('file', file, file.name);
    console.log('FormData:', formData);
    console.log('Uploading file:', file);

    return this.http.post<any>(`${this.baseUrl}/add-photo`, formData);
  }

  deletePhoto(photoId:number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-photo/${photoId}`)
  }

  getPhoto(photoId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-photo/${photoId}`);
  }

}
