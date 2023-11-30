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

  selectedContainer: string = "change-pass";
  email: string = '';
  userId: string = this.sessionService.getUserId();
  password: string = "";


  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private toast: NgToastService
  ){
  }

  ngOnInit(): void {}

  onSubmit(): void{
    this.userService.sendEmail(this.email).subscribe({next: this.emailSent.bind(this),
      error: this.emailNotSent.bind(this)
    })
  }

  emailSent(){
    this.toast.success({detail: "SUCCESS", summary: "Email verification sent!", duration: 5000})
    //add the route to navigate or change the component that is being displayed in the forgot password
  }

  emailNotSent(response: Record<string, any>){
    this.toast.success({detail: "ERROR", summary: response["message"], duration: 5000})
  }

}
