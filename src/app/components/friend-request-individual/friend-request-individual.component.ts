import { Component, OnInit, Input } from '@angular/core';
import { Friend } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friend-request-individual',
  templateUrl: './friend-request-individual.component.html',
  styleUrls: ['./friend-request-individual.component.css']
})
export class FriendRequestIndividualComponent implements OnInit{
  @Input() friend!: Friend;
  @Input() deleteFriendFromView!: Function;

  ngOnInit(): void {}
  constructor(
    private friendService: FriendService
  ){
    
  }
  acceptRequest(requestId?: string, friend?: Friend){
    this.friendService.acceptFriendRequest(requestId).subscribe((response: Record<string, any>)=>{
      this.deleteFriendFromView(friend);
    });
  }

  removeRequest(requestId?: string, friend?: Friend){
    this.friendService.removeFriendRequest(requestId).subscribe((response: Record<string, any>) => {
      this.deleteFriendFromView(friend);
    });
  }
}
