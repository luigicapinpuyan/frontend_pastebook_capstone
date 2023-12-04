import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album, AlbumDTO, AlbumWithFirstPhoto } from '../models/album';
import { SessionService } from './session.service';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl: string = 'https://localhost:7208/api/album'

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

  getAlbumId(): string {
    return localStorage.getItem('albumId')!
   }

  addAlbum(albumDTO: AlbumDTO): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/add-album', albumDTO, {headers: this.getHeaders()})
  }

  updateAlbum(albumDTO: AlbumDTO): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-album/`, albumDTO, {headers: this.getHeaders()})
  }

  deleteAlbum(albumId: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-album/${albumId}`, {headers: this.getHeaders()})
  }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.baseUrl}/get-all-albums`, {headers: this.getHeaders()})
  }

  getAllPhotos(albumId: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}/get-all-photos/${albumId}`, {headers: this.getHeaders()})
  }

  getMiniAlbum(): Observable<AlbumWithFirstPhoto[]> {
    return this.http.get<AlbumWithFirstPhoto[]>(`${this.baseUrl}/get-mini-album`, {headers: this.getHeaders()})
  }

  getUploadsAlbumId(): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/get-uploads-album-id`, {headers:this.getHeaders()});
  }

  getAlbum(albumId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/get-album-by-id/${albumId}`, {headers: this.getHeaders()})
  }
  
}
