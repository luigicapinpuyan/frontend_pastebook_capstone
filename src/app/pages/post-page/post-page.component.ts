import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { SessionService } from 'src/app/services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { LikeModalComponent } from 'src/app/modals/like-modal/like-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CommentModalComponent } from 'src/app/modals/comment-modal/comment-modal.component';
import { Comment, CommentDTO } from 'src/app/models/comment';
import { LikeDTO } from 'src/app/models/like';
import { MiniProfileDTO } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { PhotoService } from 'src/app/services/photo.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Photo } from 'src/app/models/photo';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  userId: string = this.sessionService.getUserId();
  usersLiked: MiniProfileDTO[] =[];

  comments: Comment[] = [];
  post: Post = new Post();
  postId: string = "";
  likedByString: string = "";
  isCurrentPostLiked: boolean = false;
  posterPhotoId: string = "";
  posterPhotoUrl: string = "/assets/images/default_profile.png";


  photoId: string = "";
  photoUrl: string = "";

  

  commenterPhotoId: string = "";
  
  likeDTO: LikeDTO = new LikeDTO();
  commentDTO: CommentDTO = new CommentDTO();
  comment: string = "";



  // formattedDate: string | undefined = "";
  
  constructor(
    private sessionService: SessionService,
    public dialog: MatDialog,
    private postService: PostService, // use postService to access this post's likes and comments
    private commentService: CommentService,
    private toast: NgToastService,
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    // private datePipe: DatePipe
  ){
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['id'];
    });
    console.log(this.post.poster?.firstName);
    this.getPostbyPostId();
    
    this.likedByString = this.generateLikedByString(this.usersLiked);
    
    
    // const datePosted = this.post?.datePosted; 
    // this.formattedDate = this.datePipe.transform(datePosted, 'MM/dd/yyyy hh:mm:ss a') || '';
  }

  getPostbyPostId(){
    this.postService.getPost(this.postId).subscribe((response: Post) => {
      this.post = response;
      
      this.getPostLikes();
      this.getCommentsByPostId(this.post.id!);
      this.isPostLiked();

      this.photoId = this.post.photoId!; //photo of the post
      if(this.photoId != null){
        this.loadPhoto();
      }

      this.posterPhotoId = this.post.poster?.photo?.id!;
      if(this.posterPhotoId != null){
        this.loadPosterPhoto();
      }
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
  openCommentsModal(){
    const dialogRef = this.dialog.open(CommentModalComponent, {
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
  getCommentsByPostId(postId: string){
    this.commentService.getCommentsByPostId(postId).subscribe((response: Comment[]) => {
      this.comments = response;

      this.comments.forEach((comment) => {
        this.commenterPhotoId = comment.commenter?.photo?.id!;
        console.log(this.commenterPhotoId);
        if(this.commenterPhotoId == undefined){
          comment.commenterPhotoUrl = "assets/images/default_profile.png";
        }else{
          this.loadCommenterPhoto(this.commenterPhotoId).subscribe(
            (photoUrl: string) => {
              comment.commenterPhotoUrl = photoUrl;
            
            },
            (error) => {
              console.error('Error loading photo:', error);
            }
          );
        }
      });

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
  loadCommenterPhoto(photoId: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.photoService.getPhoto(photoId).subscribe(
        (photoBlob:Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            observer.next(reader.result as string);
            observer.complete();
          };
          reader.readAsDataURL(photoBlob);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
    
  
  loadPosterPhoto(){
    this.photoService.getPhoto(this.posterPhotoId).subscribe(
      (photoBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.posterPhotoUrl = reader.result as string;
        };
        reader.readAsDataURL(photoBlob);
      }
    );
  }

  goToOtherProfile(){
    this.router.navigate(['/profile'], { queryParams: { id: this.post.poster?.id } });
  }

}

  

  //modals
