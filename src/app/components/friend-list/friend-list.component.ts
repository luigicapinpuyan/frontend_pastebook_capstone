import { Component, OnInit, Input } from '@angular/core';
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
  @Input() sentUserId: string = "";
  miniProfileDTO: MiniProfileDTO = new MiniProfileDTO();
  friends: MiniProfileDTO[] = []

  constructor(
    private friendService: FriendService,
    private userService: UserService
  ){}


  ngOnInit(): void {
    this.loadFriends()
    this.getProfile()
  }


  loadFriends(){
    this.friendService.getAllFriends().subscribe((response: MiniProfileDTO[]) => {
      this.friends = response
    });
  }

  getProfile() {
    this.userService.getMiniProfile(this.sentUserId).subscribe(
      (response: MiniProfileDTO) => {
        this.miniProfileDTO = response;
      },
      (error) => {
        console.error("Error fetching profile:", error);
      }
    );
  }

}