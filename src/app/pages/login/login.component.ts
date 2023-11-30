import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ){
    let token: string = this.sessionService.getToken();
    
    if (token != null) {3
      this.userService.validateToken().subscribe((response) => {
        let isUsable: boolean = response;

        if (isUsable == false) {
          this.sessionService.clear();
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['home']);
        }
      });
    }
  }

  ngOnInit(): void {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe) {
      this.rememberMe = true;
      this.email = localStorage.getItem('rememberedEmail') || '';
      this.password = localStorage.getItem('rememberedPassword') || '';
    }
  }

  onLogin() {

    if (this.email == "" && this.password == ""){
      this.toast.error({detail: "ERROR", summary: "Please input your email and password.", duration: 5000});
      return;
    }
    else if (this.email == ""){
      this.toast.error({detail: "ERROR", summary: "Please input your email.", duration: 5000});
      return;
    }
    else if (this.password == ""){
      this.toast.error({detail: "ERROR", summary: "Please input your password.", duration: 5000});
      return;
    }
    
    this.userService.login(this.email,this.password).subscribe({
      next: (response: Record<string, any>) => {
        this.toast.success({detail: "SUCCESS", summary: "Login Successful", duration: 5000});
        this.sessionService.setEmail(response['email']);
        this.sessionService.setToken(response['token']);
        this.sessionService.setUserId(response['userId']);
    
        this.router.navigate(['/home'])
      },
      error: (result: Record<string, any>) => {
        this.toast.error({detail: "ERROR", summary: "Invalid credentials.", duration: 5000});
        console.log(result['error']);
      }
    })

    
    if (this.rememberMe) {
      // Save email to localStorage if 'Remember Me' is checked
      localStorage.setItem('rememberedEmail', this.email);
      localStorage.setItem('rememberedPassword', this.password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      // Clear remembered email if 'Remember Me' is not checked
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
      localStorage.removeItem('rememberMe');
    }
  }

}

