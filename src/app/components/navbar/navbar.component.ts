import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  

  searchText: string = '';
  searchResults: string[] = []; 

  itemsToSearch: string[] = [  
    'Item 1',
    'Item 2',
    'Item 3',
  
  ];

  constructor(
    private router: Router,
    private userService: UserService, 
    private toast: NgToastService,
    private sessionService: SessionService
    ) {} 
    
    logout(){
      this.userService.logout().subscribe(() => {
        this.toast.success({detail: "SUCCESS", summary: "Logout Successful", duration: 5000}); 
        this.sessionService.clear();
        this.router.navigate(['login']);
      });
    }
  
  onSearch() {
    if (this.searchText.trim() !== '') {
      this.searchResults = this.itemsToSearch.filter(item =>
        item.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  goToDetailsPage() {
    this.router.navigate(['/profile']); 
  }

  onEnterPressed(name:string) {
    
    if (this.searchText.trim() !== '') {
      // Navigate to the search page (replace '/search' with your desired route)
      this.router.navigate(['/search-list'], { queryParams: { name: this.searchText } });
    }
  }
}
