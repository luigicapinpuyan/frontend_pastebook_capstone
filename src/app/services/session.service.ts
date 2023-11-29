import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  @Output() hasToken: EventEmitter<boolean> = new EventEmitter()


  constructor() {
    if(localStorage.getItem('token') !== null){
      this.hasToken.emit(true)
    } else {
      this.hasToken.emit(false)
    }
   }

   getToken(): string {
    return localStorage.getItem('token')!
   }

   getEmail(): string {
    return localStorage.getItem('email')!
   }

   getUserId(): string {
    return localStorage.getItem('userId')!
   }

   setToken(value: string): void {
    this.hasToken.emit(true)
    localStorage.setItem('token', value)
   }
   
   setEmail(value: string): void {
    localStorage.setItem('email', value)
   }

   setUserId(value: string): void{
    localStorage.setItem('userId', value)
   }

   clear(): void {
    localStorage.clear()
    this.hasToken.emit(false)
   }
}
