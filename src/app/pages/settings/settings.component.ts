import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EditPasswordDTO, ProfileDTO } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo';
import { Album, AlbumDTO } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
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
  gender: string = "";
  file: File | null = null;
  albumList: Album[] = [];
  albumId: string | undefined = '';

  ngOnInit(): void {}
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private toast: NgToastService,
    private photoService: PhotoService,
    private albumService: AlbumService
  ){
    this.getProfile();
    this.getAlbums();
    this.searchForUploads();
  }

  getAlbums(){
    this.albumService.getAllAlbums().subscribe((response)=> {
      this.albumList = response;
    })
  }

  searchForUploads(){
    this.albumList.forEach(a => {
      if(a.albumName?.toLowerCase() === "uploads"){
        this.albumId = a.id;
      }
    });
    console.log(this.albumId);
  }
  
  getProfile(){
    this.userService.getMainProfile().subscribe((response)=>{
      this.profile = response;
      console.log(this.profile.sex);
      if(this.profile.sex != null){
        this.gender = this.profile.sex;
      }
     
      
      if (this.profile.birthDate) {
        this.profile.birthDate = new Date(this.profile.birthDate).toISOString().split('T')[0];
      }
    });
  }
  async uploadPhoto(): Promise<string> {
    if (this.file) {
      try {
        if(this.albumId != null){
          const response = await this.photoService.uploadPhoto(this.albumId, this.file).toPromise();
          return response.photoId;
        }
        
      } catch (error) {
        console.error(error);
        return "0";
      }
    }
    return "0"; // Return 0 if this.file is not defined
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
    console.log(this.newEmail);
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


