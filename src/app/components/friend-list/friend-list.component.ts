import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';
import { MiniProfileDTO, User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  miniProfileDTO: MiniProfileDTO = new MiniProfileDTO();
  friends: MiniProfileDTO[] = []
  private userId: number = Number(this.sessionService.getUserId());



  constructor(
    private friendService: FriendService,
    private userService: UserService,
    private sessionService: SessionService
  ){}


  ngOnInit(): void {
    this.loadFriends(this.userId)
    this.getProfile(this.userId)
  }


  loadFriends(userId: number){
    this.friendService.getAllFriends().subscribe((response: MiniProfileDTO[]) => {
      this.friends = response
    });
  }

  getProfile(userId: number) {
    this.userService.getMiniProfile().subscribe(
      (response: MiniProfileDTO) => {
        this.miniProfileDTO = response;
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
  }

}