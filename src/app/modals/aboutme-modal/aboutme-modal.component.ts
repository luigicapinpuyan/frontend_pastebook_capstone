import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProfileDTO } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aboutme-modal',
  templateUrl: './aboutme-modal.component.html',
  styleUrls: ['./aboutme-modal.component.css']
})
export class AboutmeModalComponent {
  profileDTO: ProfileDTO = new ProfileDTO();



  constructor(
    public dialogRef: MatDialogRef<AboutmeModalComponent>,
    private userService: UserService,
    private toast: NgToastService,
    private router: Router
    ) {
      this.getMainProfile();
    }

  close() {
    this.dialogRef.close();
  }

  onSubmitEditProfile(): void {
    this.userService.editProfile(this.profileDTO).subscribe({
      next: () => {
        this.toast.success({ detail: "SUCCESS", summary: "Successfully Updated.", duration: 5000 });
        this.close();
        
        // Navigating to the current route to refresh the page
         const currentUrl = this.router.url;
        this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
          this.router.navigate(['profile']);
          window.location.reload();
         });
      },
      error: () => {
        this.toast.success({ detail: "ERROR", summary: "Error changing profile.", duration: 500000 });
      }
    });
  }
  
  

  getMainProfile(){
    this.userService.getMainProfile().subscribe(
      (response: ProfileDTO) => {
        this.profileDTO = response;
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
  }
}