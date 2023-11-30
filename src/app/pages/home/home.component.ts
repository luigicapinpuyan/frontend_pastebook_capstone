import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend';
import { MiniProfileDTO } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FriendService } from 'src/app/services/friend.service';
import { FriendRequestComponent } from 'src/app/modals/friend-request-modal/friend-request.component';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  miniProfileDTO: MiniProfileDTO = new MiniProfileDTO();
  friends: Friend[] = [];
  
   
  ngOnInit(): void {}
  
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private friendService: FriendService,
    private sessionService: SessionService,
    private router: Router
  ){
    let token: string = this.sessionService.getToken();
    
    if (token != null) {3
      this.userService.validateToken().subscribe((response) => {
        let isUsable: boolean = response;

        if (isUsable == false) {
          this.sessionService.clear();
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['']);
        }
      });
    }
    this.getProfile();
    this.getAllFriendRequests();
  }

  //PROFILE
  getProfile() {
    this.userService.getMiniProfile().subscribe(
      (response: MiniProfileDTO) => {
        this.miniProfileDTO = response;
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
  }


  //FRIEND REQUESTS
  deleteFriendFromView(givenFriend: Friend): void{
    this.friends = this.friends.filter(friendEntry => friendEntry != givenFriend);
  }
  getAllFriendRequests(){
    this.friendService.getAllFriendRequests().subscribe((response: Friend[]) =>{
      this.friends = response;
    });
  }
  openFriendRequestModal() {
    const dialogRef = this.dialog.open(FriendRequestComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }




}
