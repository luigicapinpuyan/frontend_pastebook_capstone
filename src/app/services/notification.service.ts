import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl: string = 'https://localhost:7208/api/notification'

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
  ) {
  }


  getNotificationLists(): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.baseUrl + `/get-notifications`, {headers: this.getHeaders()});
  }
  
  getNotificationContext(notificationId: number | undefined): Observable<any>{
    return this.http.get<any>(this.baseUrl + `/get-notification-context/${notificationId}`);
  }
}
