import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { PhotoService } from 'src/app/services/photo.service';
@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit {

  postComments: Comment[] = [];
  postId: string = "";

  constructor(
    public dialogRef: MatDialogRef<CommentModalComponent>,  
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService,
    private photoService: PhotoService
  ){
    console.log(data.postId);
    this.postId = data.postId;
  }
  ngOnInit(): void {
    this.getPostComments();
  }

  getPostComments(){
    this.commentService.getCommentsByPostId(this.postId).subscribe((response: Comment[]) => {
      this.postComments = response;

      this.postComments.forEach((comment) => {
        this.loadCommenterPhoto(comment.commenter?.photo?.id!).subscribe(
          (photoUrl: string) => {
            if(comment.commenter!.photo != null){
              comment.commenter!.photo!.photoImageURL = photoUrl;
            }
            
          },
          (error) => {
            console.error('Error loading photo:', error);
          }
        );
      });




    });
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

  closeModal() {
    this.dialogRef.close();
  }
}
