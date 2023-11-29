import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend';
import { Post, PostDTO } from 'src/app/models/post';
import { MiniProfileDTO, User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service';
import { PhotoService } from 'src/app/services/photo.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
// import { MatDialog } from '@angular/material/dialog';
// import { RequestsModalComponent } from 'src/app/modals/requests-modal/requests-modal.component';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  miniProfileDTO: MiniProfileDTO = new MiniProfileDTO();
  friends: Friend[] = [];
  

  private userId: number = 0;
  post: PostDTO = new PostDTO();
  file: File | null = null;
  albumId: number = 1;
  
  ngOnInit(): void {}
  
  constructor(
    //public dialog: MatDialog,
    private userService: UserService,
    private sessionService: SessionService,
    private friendService: FriendService,
    private photoService: PhotoService,
    private postService: PostService,
    private router: Router, 
    private toast: NgToastService
  ){
    this.userId = Number(this.sessionService.getUserId());
    this.getProfile(this.userId);
    this.getFriendRequests(this.userId);
  }

  getProfile(userId: number) {
    this.userService.getMiniProfile().subscribe(
      (response: MiniProfileDTO) => {
        this.miniProfileDTO = response;
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
  }

  getFriendRequests(userId: number){
    this.friendService.getFriendRequests().subscribe((response: Friend[]) =>{
      this.friends = response;
    });
  }

  deleteFriendFromView(givenFriend: Friend): void{
    this.friends = this.friends.filter(friendEntry => friendEntry != givenFriend);
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  async uploadPhoto(): Promise<number> {
    if (this.file) {
      try {
        const response = await this.photoService.uploadPhoto(this.albumId, this.file).toPromise();
        return response.photoId;
      } catch (error) {
        console.error(error);
        return 0;
      }
    }
    return 0; // Return 0 if this.file is not defined
  }

  // openModal() {
  //   const dialogRef = this.dialog.open(RequestsModalComponent);

  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('The dialog was closed');
  //   });
  // }
  // for fixing
  // async addPost(){
  //   let photoId = await this.uploadPhoto();
  //   if(photoId){
  //     this.post.photoId = photoId;
  //   }
  //   this.post.posterId = this.userId;

  //   console.log(this.post);
  //   this.postService.addPost(this.post).subscribe({
  //     next: () => {
  //       Swal.fire({
  //         title: "Post Added!",
  //         text: "New pastebook post success!",
  //         icon: "success"
  //       });
  //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //         this.router.navigate(['home']);
  //       });
  //     },
  //     error: () =>{
  //       this.toast.error({detail: "ERROR", summary: "Error adding a new post!", duration: 5000});
  //     }
  //   });

    


  // }

  


 

}
