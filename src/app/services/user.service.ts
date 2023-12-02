import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EditPasswordDTO, MiniProfileDTO, ProfileDTO, User, UserRegisterDTO } from '../models/user';
import { Post } from '../models/post';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'https://localhost:7208/api/'

  private header: HttpHeaders = new HttpHeaders({
    'Authorization': this.sessionService.getToken()
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
  }

  
  // 


  login(email: string, password: string): Observable<Object> {
    return this.http.post(this.baseUrl + 'authentication/login', {email, password})
  }

  register(user: UserRegisterDTO): Observable<Object> {
    return this.http.post(this.baseUrl + 'authentication/register', user)
  }
 
  logout(): Observable<Object>{
    return this.http.post(this.baseUrl + `authentication/logout`, {}, {headers: this.header});
  }

  validateToken(): Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl + `authentication/validate-token`, {headers: this.header});
  }

  // to be edited
  sendEmail(recipientEmail: string): Observable<Object> {
    return this.http.post(this.baseUrl + `authentication/verify-email/${recipientEmail}`, {});
  }

  // wait for UserController from Backend
  getMainProfile(): Observable<ProfileDTO>{
    return this.http.get<ProfileDTO>(this.baseUrl + `profile/get-profile`, {headers: this.header});
  }

  getMiniProfile(): Observable<MiniProfileDTO>{
    return this.http.get<MiniProfileDTO>(this.baseUrl + `profile/get-mini-profile`, {headers: this.header});
  }

  editProfile(profileDTO: ProfileDTO): Observable<ProfileDTO>{
    return this.http.put(this.baseUrl + `profile/edit-profile`, profileDTO, {headers: this.header});
  }


  editEmail(newEmail: string): Observable<ProfileDTO>{
    return this.http.put(this.baseUrl + `profile/edit-email/${newEmail}`, {headers: this.header});
  }

  editPassword(editPasswordDTO: EditPasswordDTO): Observable<EditPasswordDTO>{
    return this.http.put(this.baseUrl + "profile/edit-password", editPasswordDTO, {headers: this.header});
  }

  // we haven't called edit-profile-pic yet
  editProfilePic(profileImageId: string): Observable<ProfileDTO>{
    return this.http.put(this.baseUrl + `profile/edit-profile-pic/${profileImageId}`, {headers: this.header})
  }

  getAllUserBySearch(name: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + `profile/search-users/${name}`);
  }

  
 
}
