import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MiniProfileDTO, User, UserRegisterDTO } from '../models/user';
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

  // put these two posts into timeline service
  getNewsFeedPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl + `timeline/get-newsfeed-posts`, {headers: this.header});
  }
  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl + `timeline/get-all-posts`, {headers: this.header});
  }
  // 


  login(email: string, password: string): Observable<Object> {
    return this.http.post(this.baseUrl + 'authentication/login', {email, password})
  }

  register(user: UserRegisterDTO): Observable<Object> {
    return this.http.post(this.baseUrl + 'authentication/register', user)
  }
 
  logout(): Observable<Object>{
    return this.http.post(this.baseUrl + `authentication/logout`, {headers: this.header});
  }

  validateToken(): Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl + `authentication/validate-token`, {headers: this.header});
  }

  // to be edited
  sendEmail(recipientEmail: string): Observable<Object> {
    return this.http.post(this.baseUrl + `authentication/verify-email/${recipientEmail}`, {});
  }

  // wait for UserController from Backend
  // getMainProfile(): Observable<ProfileDTO>{
  //   return this.http.get<ProfileDTO>(this.baseUrl + `profile/get-profile`, {headers: this.header});
  // }

  // getMiniProfile(): Observable<MiniProfileDTO>{
  //   return this.http.get<MiniProfileDTO>(this.baseUrl + `profile/get-mini-profile`, {headers: this.header});
  // }

  

  // editAboutMe(profileDTO: ProfileDTO): Observable<ProfileDTO>{
  //   return this.http.put(this.baseUrl + `profile/edit-about-me`, profileDTO, {headers: this.header});
  // }


  // editProfile(profileDTO: ProfileDTO): Observable<ProfileDTO>{
  //   return this.http.put(this.baseUrl + `profile/edit-profile`, profileDTO, {headers: this.header});
  // }

  // editPassword(editPasswordDTO: EditPasswordDTO): Observable<EditPasswordDTO>{
  //   return this.http.put(this.baseUrl + "profile/edit-password", editPasswordDTO, {headers: this.header});
  // }

  // editEmail(editEmailDTO: EditEmailDTO): Observable<EditEmailDTO>{
  //   return this.http.put(this.baseUrl + "profile/edit-email", editEmailDTO, {headers: this.header});
  // }

 


  getAllUserBySearch(name: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + `profile/search-users/${name}`);
  }

  
  // we haven't called edit-profile-pic yet 

}
