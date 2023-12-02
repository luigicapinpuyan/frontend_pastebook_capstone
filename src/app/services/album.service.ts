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

  private header: HttpHeaders = new HttpHeaders({
    'Authorization': this.sessionService.getToken()
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  getAlbumId(): string {
    return localStorage.getItem('albumId')!
   }

  addAlbum(albumDTO: AlbumDTO): Observable<any> {
    return this.http.post(this.baseUrl + '/add-album', albumDTO, {headers: this.header})
  }

  updateAlbum(albumDTO: AlbumDTO): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-album/`, albumDTO, {headers: this.header})
  }

  deleteAlbum(albumId: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete-album/${albumId}`, {headers: this.header})
  }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.baseUrl}/get-all-albums`, {headers: this.header})
  }

  getAllPhotos(albumId: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}/get-all-photos/${albumId}`, {headers: this.header})
  }

  getMiniAlbum(): Observable<Object> {
    return this.http.get(`${this.baseUrl}/get-mini-album`, {headers: this.header})
  }
  
}
