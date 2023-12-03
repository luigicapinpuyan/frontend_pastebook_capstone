import { Component, OnInit, Input } from '@angular/core';
//import { EditAboutmeComponent } from 'src/app/modals/edit-aboutme/edit-aboutme.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { ProfileDTO, User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';
import { AboutmeModalComponent } from 'src/app/modals/aboutme-modal/aboutme-modal.component';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit{

  @Input() sentUserId = '';
  userId: string = this.sessionService.getUserId();
  profileDTO: ProfileDTO = new ProfileDTO();
  posts: Post[] = [];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private timelineService: TimelineService,
    private sessionService: SessionService
  ){
  }

  ngOnInit(): void {
    this.loadProfile();
    this.getAllPosts();
  }

  //Modal
  openModal() {
    const dialogRef = this.dialog.open(AboutmeModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  //User
  loadProfile(){
    this.userService.getMainProfile(this.sentUserId).subscribe(
      (response: ProfileDTO) => {
        this.profileDTO = response;
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
  }

  //Timeline
  getAllPosts(){
    this.timelineService.getAllPosts(this.sentUserId).subscribe((response: Post[]) => {
      this.posts = response;
    },
    (error) => {
      console.error("Error fetching newsfeed posts", error);
    });
  }
}