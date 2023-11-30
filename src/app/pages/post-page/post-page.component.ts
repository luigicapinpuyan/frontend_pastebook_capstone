import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { SessionService } from 'src/app/services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { LikeModalComponent } from 'src/app/modals/like-modal/like-modal.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  @Input() post: Post= new Post();
  userId: number = Number(this.sessionService.getUserId());

  likedUsers = ['Ad Min', 'Jayvee Tinio', 'Blessie Balagtas', 'Min Ad'];
  
  // formattedDate: string | undefined = "";
  
  constructor(
    private sessionService: SessionService,
    public dialog: MatDialog
    // private datePipe: DatePipe
  ){
  }

  ngOnInit(): void {
    // const datePosted = this.post?.datePosted; 
    // this.formattedDate = this.datePipe.transform(datePosted, 'MM/dd/yyyy hh:mm:ss a') || '';
  }

  openLikesModal(){
    const dialogRef = this.dialog.open(LikeModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
