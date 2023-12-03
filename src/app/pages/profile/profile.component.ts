import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileDTO } from 'src/app/models/user';
import { PhotoService } from 'src/app/services/photo.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FriendService } from 'src/app/services/friend.service';
import { Friend, FriendDTO } from 'src/app/models/friend';
import { NgToastService } from 'ng-angular-popup';
//import { EditAboutmeComponent } from 'src/app/modals/edit-aboutme/edit-aboutme.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  selectedTab: string = 'timeline';

  profileDTO:  ProfileDTO = new ProfileDTO();
  userId: string = this.sessionService.getUserId();
  sentUserId: string = "";
  friendDTO: FriendDTO = new FriendDTO();
  friend: Friend = new Friend();

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private friendService: FriendService,
    private toast: NgToastService
  ){
  }
  ngOnInit(): void{    
    this.route.queryParams.subscribe(params => {
      this.sentUserId = params['id'];
    });
    this.loadProfile();
    this.isUserFriend();
  }


changeTab(tab: string) {
  this.selectedTab = tab;
}

  // openModal() {
  //   const dialogRef = this.dialog.open(EditAboutmeComponent);

  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('The dialog was closed');
  //   });
  // }

  

  loadProfile(){
    this.userService.getMainProfile(this.sentUserId).subscribe(
      (response: ProfileDTO) => {
        this.profileDTO = response;
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
  }

  addFriend(){
    this.friendDTO.receiverId = this.sentUserId;
    this.friendDTO.senderId = this.userId;
    this.friendService.addFriend(this.friendDTO).subscribe((response)=>{
      console.log(response);
      this.toast.success({ detail: "SUCCESS", summary: "Friend Added.", duration: 5000 });
      this.isUserFriend();
    });
  }
  removeFriend(){
    this.friendService.removeFriendRequest(this.friend.id).subscribe((response)=>{
      console.log(response);
      this.toast.success({ detail: "SUCCESS", summary: "Friend Removed.", duration: 5000 });
      this.isUserFriend();
    })
  }
  isUserFriend(){
    this.friendDTO.receiverId = this.sentUserId;
    this.friendDTO.senderId = this.userId
    this.friendService.getFriendExist(this.friendDTO).subscribe((response: Friend) => {
      this.friend = response;
      console.log(this.friend);
    });
  }

}
