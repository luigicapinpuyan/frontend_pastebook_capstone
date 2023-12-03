import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EditPasswordDTO, ProfileDTO, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AlbumService } from 'src/app/services/album.service';
import { HelperService } from 'src/app/services/helper.service';
import { MiniProfileDTO } from 'src/app/models/user';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  activeTab = 'account-general';
  profile: ProfileDTO = new ProfileDTO();
  miniProfile: MiniProfileDTO = new MiniProfileDTO();

  photoId: string = "";
  photoUrl: string = "";

  editPasswordDTO: EditPasswordDTO = new EditPasswordDTO();
  repeatNewPassword: string = '';

  newEmail: string = '';

  gender: string = "";
  file: File | null = null;
  albumId: string = '';
  formattedDate: string = "";

  

  constructor(
    private userService: UserService,
    private toast: NgToastService,
    private photoService: PhotoService,
    private albumService: AlbumService
  ){
  }

  ngOnInit(): void {
    this.getProfile();
    this.getMiniProfile();
    this.albumService.getUploadsAlbumId().subscribe((response: string) => {
      this.albumId = response;
    });

  }

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }


  getProfile() {
    this.userService.getMainProfile().subscribe(
      (response) => {
        this.profile = response;
  
        if (this.profile.sex != null) {
          this.gender = this.profile.sex;
        }
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  getMiniProfile(){
    this.userService.getMiniProfile().subscribe(
      (response: MiniProfileDTO) => {
        this.miniProfile = response;
        console.log(this.miniProfile);
        this.photoId = this.miniProfile.photo?.id!;
        this.loadPhoto();
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
  }
  

  async onFileChange(event: any): Promise<void> {
    this.file = event.target.files[0];

    let photoId = await this.uploadPhoto();
    console.log(photoId);

    this.userService.editProfilePic(photoId).subscribe((response) =>{
      console.log(response);
    });
    
    // this.loadPhoto(await photoId);
  }

  async uploadPhoto(): Promise<string> {
    if (this.file) {
      try {
        console.log(this.albumId);
        const response = await this.photoService.uploadPhoto(this.albumId, this.file).toPromise();
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
        return '';
      }
    }
    return ''; 
  }

  loadPhoto(): void {
    this.photoService.getPhoto(this.photoId).subscribe(
      (photoBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string;
        };
        reader.readAsDataURL(photoBlob);
      }
    );
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


