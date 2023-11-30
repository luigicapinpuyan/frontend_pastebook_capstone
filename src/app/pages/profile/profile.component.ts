import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { User, ProfileDTO } from 'src/app/models/user';
import { PhotoService } from 'src/app/services/photo.service';
import { MatDialog } from '@angular/material/dialog';
//import { EditAboutmeComponent } from 'src/app/modals/edit-aboutme/edit-aboutme.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  selectedTab: string = 'timeline';

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  profileDTO:  ProfileDTO = new ProfileDTO();
  private userId: number = Number(this.sessionService.getUserId());


  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private sessionService: SessionService
  ){}

  // openModal() {
  //   const dialogRef = this.dialog.open(EditAboutmeComponent);

  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('The dialog was closed');
  //   });
  // }

  ngOnInit(): void{
    this.loadProfile()
  }

  loadProfile(){
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
