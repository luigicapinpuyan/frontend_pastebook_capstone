import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend';
import { MiniProfileDTO } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FriendService } from 'src/app/services/friend.service';
import { FriendRequestComponent } from 'src/app/modals/friend-request-modal/friend-request.component';
import { Post } from 'src/app/models/post';
import { TimelineService } from 'src/app/services/timeline.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  miniProfileDTO: MiniProfileDTO = new MiniProfileDTO();
  friends: Friend[] = [];
  posts: Post[] = [];
  photoId: string = "";
  photoUrl: string = "";
  userId: string = this.sessionService.getUserId();
   
  ngOnInit(): void {
    this.helperService.checkToken();

    this.getProfile();
    

    this.getAllFriendRequests();
    this.getNewsFeedPosts();
  }
  
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private friendService: FriendService,
    private timelineService: TimelineService,
    private helperService: HelperService,
    private photoService: PhotoService,
    private sessionService: SessionService,
    private router: Router
  ){
  }

  //PROFILE
  getProfile() {
    this.userService.getMiniProfile(this.userId).subscribe(
      (response: MiniProfileDTO) => {
        this.miniProfileDTO = response;
        this.photoId = this.miniProfileDTO.photo?.id!;
        this.loadPhoto();
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
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
  goToProfile() {
    this.router.navigate(['/profile'], { queryParams: { id: this.userId } });
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
