import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EditPasswordDTO, ProfileDTO } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public imageURL: string = '/assets/images/bg.jpg';
  editPasswordDTO: EditPasswordDTO = new EditPasswordDTO();
  newEmail: string = '';
  repeatNewPassword: string = '';
  activeTab = 'account-general';
  profile: ProfileDTO = new ProfileDTO();

  ngOnInit(): void {}
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private toast: NgToastService
  ){
    this.getProfile();
  }

  getProfile(){
    this.userService.getMainProfile().subscribe((response)=>{
      this.profile = response;

      if (this.profile.birthDate) {
        this.profile.birthDate = new Date(this.profile.birthDate).toISOString().split('T')[0];
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };

      reader.readAsDataURL(file);
    } 
  }

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }

  onSubmitEditProfile(): void{
    if(this.profile.firstName == null || this.profile.lastName == null || this.profile.birthDate == null){
      this.toast.error({detail: "ERROR", summary: "Please enter all the required fields", duration: 5000});
    }

    this.userService.editProfile(this.profile).subscribe({
      next: () => this.toast.success({ detail: "SUCCESS", summary: "Profile changed successfully.", duration: 5000 }),
      error: () => this.toast.success({ detail: "ERROR", summary: "Error changing profile.", duration: 5000 })
    });
  }


  onSubmitEditEmail(): void {
    if (!this.newEmail) {
      this.toast.error({ detail: "ERROR", summary: "Please input your new email address.", duration: 5000 });
      return;
    }
  
    this.userService.editEmail(this.newEmail).subscribe({
      next: () => this.toast.success({ detail: "SUCCESS", summary: "Changed email address successfully.", duration: 5000 }),
      error: () => this.toast.error({ detail: "ERROR", summary: "Error changing email address.", duration: 5000 })
    });
  }

  onSubmitEditPassword(): void {
  
    if (!this.editPasswordDTO.currentPassword || !this.editPasswordDTO.newPassword || !this.repeatNewPassword) {
      this.toast.error({ detail: "ERROR", summary: "All fields are required.", duration: 5000 });
      return;
    }
  
    if (this.editPasswordDTO.newPassword !== this.repeatNewPassword) {
      this.toast.error({ detail: "ERROR", summary: "New passwords do not match.", duration: 5000 });
      return;
    }
  
    this.userService.editPassword(this.editPasswordDTO).subscribe({
      next: () => {
        this.editPasswordDTO.currentPassword = "";
        this.editPasswordDTO.newPassword = "";
        this.repeatNewPassword = "";
        this.toast.success({ detail: "SUCCESS", summary: "Password change successful.", duration: 5000 });
      },
      error: () => this.toast.error({ detail: "ERROR", summary: "'Current password' entered does not match your actual current password.", duration: 5000 })
    });
  }



}


