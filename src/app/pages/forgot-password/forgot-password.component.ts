import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EditPasswordDTO } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  selectedContainer: 'verify' | 'change-pass' | 'check-email' = 'verify';
  email: string = '';
  password: string = "";


  constructor(
    private userService: UserService,
    private toast: NgToastService
  ){
  }

  ngOnInit(): void {

  }

  onVerifyEmail(): void {
    this.userService.sendEmail(this.email).subscribe({
      next: () => this.handleEmailResponse(true, 'Email verification sent!'),
      error: (response) => this.handleEmailResponse(false, response['message'])
    });
  }
  
  handleEmailResponse(success: boolean, message: string): void {
    this.toast[success ? 'success' : 'error']({ detail: success ? 'SUCCESS' : 'ERROR', summary: message, duration: 5000 });
    if (success) {
      this.selectedContainer = "check-email";
      window.location.reload();
    }
  }
  

}
