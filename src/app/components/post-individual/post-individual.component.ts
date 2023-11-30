import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentModalComponent } from 'src/app/modals/comment-modal/comment-modal.component';
import { LikeModalComponent } from 'src/app/modals/like-modal/like-modal.component';
import { Post } from 'src/app/models/post';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-post-individual',
  templateUrl: './post-individual.component.html',
  styleUrls: ['./post-individual.component.css']
})
export class PostIndividualComponent {
  @Input() post: Post= new Post();
  userId: string = this.sessionService.getUserId();

  constructor(
    private sessionService: SessionService,
    public dialog: MatDialog
  ){
  }

  ngOnInit(): void {}

  openCommentsModal(){
    this.post.id = "hahax";
    const dialogRef = this.dialog.open(CommentModalComponent, {
      data: { postId: this.post.id },
    });
    

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openLikesModal(){
    const dialogRef = this.dialog.open(LikeModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
