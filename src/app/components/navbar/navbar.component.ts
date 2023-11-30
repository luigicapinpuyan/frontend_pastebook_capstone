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
      // this.userService.logout().subscribe({
      //   next: () => {
      //     this.sessionService.clear();
      //     this.router.navigate([""]);
      //     this.toast.success({detail: "SUCCESS", summary: "Logged out successfully", duration: 2500});
      //   },
      //   error: () => this.toast.error({detail: "ERROR", summary: "ERROR Logging out", duration: 2500})
      // });

      this.userService.logout().subscribe((response) => {
        this.sessionService.clear();
        this.router.navigate([""]);
        console.log(response);
      })
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

  onEnterPressed() {
    if (this.searchText.trim() !== '') {
      // Navigate to the search page (replace '/search' with your desired route)
      this.router.navigate(['/search-user-list']);
    }
  }
}
