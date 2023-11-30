import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Friend } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  // @Input() friend!: Friend;
  friends: Friend[] = [];

  constructor(
    public dialogRef: MatDialogRef<FriendRequestComponent>,
    private sessionService: SessionService,
    private friendService: FriendService
    ) {
      this.getFriendRequests();
    }
  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  deleteFriendFromView(givenFriend: Friend): void{
    this.friends = this.friends.filter(friendEntry => friendEntry != givenFriend);
  }
  getFriendRequests(){
    this.friendService.getAllFriendRequests().subscribe((response: Friend[]) =>{
      this.friends = response;
    });
  }
}
