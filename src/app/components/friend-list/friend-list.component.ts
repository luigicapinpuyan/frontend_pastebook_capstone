import { Component, OnInit, Input } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';
import { MiniProfileDTO, User } from 'src/app/models/user';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Friend } from 'src/app/models/friend';
import { filter } from 'rxjs';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  @Input() sentUserId: string = "";
  miniProfileDTO: MiniProfileDTO = new MiniProfileDTO();
  friends: MiniProfileDTO[] = [];

  constructor(
    private friendService: FriendService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.loadFriends()
    this.getProfile()

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.handleRouteChange();
    });
  }

  handleRouteChange(): void {
    this.route.queryParams.subscribe(params => {
      const newUserId = params['id'];
      this.sentUserId = newUserId;
      window.location.reload();
    });
  }
  loadFriends(){
    this.friendService.getAllFriends(this.sentUserId).subscribe((response: MiniProfileDTO[]) => {
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

  goToOtherProfile(friend: Friend) {
    console.log("clicked");
    this.router.navigate(['/profile'], { queryParams: { id: friend.id } });
  }
  

}