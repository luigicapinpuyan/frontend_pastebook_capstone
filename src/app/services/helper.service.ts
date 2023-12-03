import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AlbumService } from './album.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
    private albumService: AlbumService
  ) { }

  public checkToken(): void{
    let token: string = this.sessionService.getToken();
    
    if (token != null) {
      this.userService.validateToken().subscribe((response) => {
        let isUsable: boolean = response;

        if (isUsable == false) {
          this.sessionService.clear();
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['']);
        }
      });
    }
  }
  
}
