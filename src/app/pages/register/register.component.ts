import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterDTO } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  user: UserRegisterDTO = new UserRegisterDTO()
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ){}


  ngOnInit(): void {}


  onRegister() {
    if(this.user.firstName == null || this.user.lastName == null || this.user.email == null || this.user.password == null || this.user.birthDate == null){
      this.toast.error({detail: "ERROR", summary: "All fields with '*' are required.", duration: 5000});
      return;
    }

    console.log(this.user);


    this.userService.register(this.user).subscribe({next: this.successfulRegister.bind(this),
      error: this.failedRegister.bind(this)
    })
    

  }

  successfulRegister(response: Record<string, any>) {
    this.toast.success({detail: "SUCCESS", summary: "User register successfully", duration: 5000});
    this.router.navigate(['/login']);
  }

  failedRegister(result: Record<string, any>) {
    this.toast.error({detail: "ERROR", summary: 'Registration failed!', duration: 5000});
  }
  

}