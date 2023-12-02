import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend';
import { MiniProfileDTO } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FriendService } from 'src/app/services/friend.service';
import { FriendRequestComponent } from 'src/app/modals/friend-request-modal/friend-request.component';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  miniProfileDTO: MiniProfileDTO = new MiniProfileDTO();
  friends: Friend[] = [];
  posts: Post[] = [];
   
  ngOnInit(): void {
    let token: string = this.sessionService.getToken();
    
    if (token != null) {
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
    this.getNewsFeedPosts();

  }
  
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private friendService: FriendService,
    private sessionService: SessionService,
    private router: Router,
    private timelineService: TimelineService
  ){}

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

  // NEWSFEED
  getNewsFeedPosts(){
    this.timelineService.getNewsFeedPosts().subscribe((response: Post[]) => {
      this.posts = response;
    });
  }


}
