import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MiniProfileDTO, User } from 'src/app/models/user';
import { PhotoService } from 'src/app/services/photo.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-like-modal',
  templateUrl: './like-modal.component.html',
  styleUrls: ['./like-modal.component.css']
})
export class LikeModalComponent implements OnInit {
  likedUsers = ['Ad Min', 'Jayvee Tinio', 'Blessie Balagtas', 'Min Ad'];
  usersLiked: MiniProfileDTO[] = [];
  postId: string = "";

  constructor(
    public dialogRef: MatDialogRef<LikeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
    private photoService: PhotoService
  ){
    this.postId = data.postId;
  }
  ngOnInit(): void {
    this.getPostLikes();
  }

  closeModal() {
    this.dialogRef.close();
  }

  getPostLikes(){
    this.postService.getPostLikes(this.postId).subscribe((response: MiniProfileDTO[]) => {
      this.usersLiked = response;
    })
  }

  loadPhoto(photoId: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.photoService.getPhoto(photoId).subscribe(
        (photoBlob: Blob) => {
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

  
  getPostLikesWithPhotos() {
    this.postService.getPostLikes(this.postId).subscribe((response: MiniProfileDTO[]) => {
      this.usersLiked = response;
  
      // Load photos for each user
      this.usersLiked.forEach((user) => {
        this.loadPhoto(user.photo?.id!).subscribe(
          (photoUrl: string) => {
            user.photoUrl = photoUrl;
          },
          (error) => {
            console.error('Error loading photo:', error);
          }
        );
      });
    });
  }

}
