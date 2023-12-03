import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
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
    private commentService: CommentService
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
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
