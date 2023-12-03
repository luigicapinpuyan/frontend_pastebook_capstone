import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CommentModalComponent } from 'src/app/modals/comment-modal/comment-modal.component';
import { LikeModalComponent } from 'src/app/modals/like-modal/like-modal.component';
import { CommentDTO } from 'src/app/models/comment';
import { Like, LikeDTO } from 'src/app/models/like';
import { Post, PostDTO } from 'src/app/models/post';
import { MiniProfileDTO } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { PhotoService } from 'src/app/services/photo.service';
import { PostService } from 'src/app/services/post.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-individual',
  templateUrl: './post-individual.component.html',
  styleUrls: ['./post-individual.component.css']
})
export class PostIndividualComponent {
  @Input() post: Post= new Post();
  usersLiked: MiniProfileDTO[] = [];
  comments: CommentDTO[] = [];

  likedByString: string = "";
  isCurrentPostLiked: boolean = false;
  
  photoId: string = "";
  photoUrl: string = "";

  postPhotoId:string = "";
  postPhotoUrl: string = "/assets/images/default_profile.png";

  userId: string = this.sessionService.getUserId();
  likeDTO: LikeDTO = new LikeDTO();
  commentDTO: CommentDTO = new CommentDTO();
  comment: string = "";

  constructor(
    private sessionService: SessionService,
    public dialog: MatDialog,
    private postService: PostService,
    private commentService: CommentService,
    private toast: NgToastService,
    private photoService: PhotoService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.getPostLikes();
    this.getCommentsByPostId();
    this.isPostLiked();
    this.likedByString = this.generateLikedByString(this.usersLiked);
    this.photoId = this.post.photoId!;
    this.postPhotoId = this.post.poster?.photo?.id!;
    if(this.photoId != null){
      this.loadPhoto();
    }
    if(this.postPhotoId != null){
      this.loadPosterPhoto();
    }
  }

  //modals
  openCommentsModal(){
    const dialogRef = this.dialog.open(CommentModalComponent, {
      data: { postId: this.post.id },
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
  openLikesModal(){
    const dialogRef = this.dialog.open(LikeModalComponent, {
      data: { postId: this.post.id },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  //getters for post and likes
  getPostLikes() {
    const postId = this.post.id ?? ''; 
  
    this.postService.getPostLikes(postId).subscribe((response: MiniProfileDTO[]) => {
      this.usersLiked = response;
    });
  }
  isPostLiked(){
    this.postService.isLiked(this.post.id).subscribe((response) => {
      this.isCurrentPostLiked = response;
    });
  }
  getCommentsByPostId(){
    const postId = this.post.id ?? ''; 

    this.commentService.getCommentsByPostId(postId).subscribe((response: CommentDTO[]) => {
      this.comments = response;
    });
  }

  //like and comment
  likePost(){
    this.isCurrentPostLiked = !this.isCurrentPostLiked;

    this.likeDTO.likerId = this.userId;
    this.likeDTO.postId = this.post.id;
    console.log(this.likeDTO)
    this.postService.likePost(this.likeDTO).subscribe((response) => {
      console.log(response);
      window.location.reload();
    })
  }
  commentPost(){
    this.commentDTO.postId = this.post.id;
    this.commentDTO.commentContent = this.comment;

    this.commentService.addComment(this.commentDTO).subscribe(() => {
      this.toast.success({detail: "SUCCESS", summary: "Comment Added", duration: 5000});
      window.location.reload();
    });
  }

  //other functions
  generateLikedByString(usersLiked: MiniProfileDTO[]): string {
    const likedByArray: string[] = [];
  
    for (let i = 0; i < usersLiked.length; i++) {
      likedByArray.push(`${usersLiked[i].firstName} ${usersLiked[i].lastName}`);
    }
  
    const remainingCount = usersLiked.length - 3;
  
    if (remainingCount > 0) {
      likedByArray.push(`and ${remainingCount} others`);
    }
  
    return likedByArray.length > 0 ? 'Liked by ' + likedByArray.join(', ') : '';
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
  loadPosterPhoto(){
    this.photoService.getPhoto(this.postPhotoId).subscribe(
      (photoBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.postPhotoId = reader.result as string;
        };
        reader.readAsDataURL(photoBlob);
      }
    );
  }

  goToOtherProfile(){
    this.router.navigate(['/profile'], { queryParams: { id: this.post.poster?.id } });
  }


}
