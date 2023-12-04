import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  
  users: User[] = [];
  currentUser: User = new User();
  searchText: string ='';

  constructor (
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['name'];
    });
    this.showAllUsers();   
  }


  showAllUsers(){
    console.log(this.searchText);
    this.userService.getAllUserBySearch(this.searchText).subscribe((response: User[]) => {
      this.users = response;
    },
    (error) => {
      console.error("Error fetching users", error);
    });
  }

  goToOtherProfile(user: User){
    this.router.navigate(['/profile'], { queryParams: { id: user?.id } });
  }
}




