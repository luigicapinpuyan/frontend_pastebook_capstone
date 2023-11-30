import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PostDTO } from 'src/app/models/post';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{
  post: PostDTO = new PostDTO();
  file: File | null = null;
  albumId: string = '1';
  private userId: string = '';


  constructor(
    private photoService: PhotoService,
    private postService: PostService,
    private toast: NgToastService,
    private router: Router, 


  ){

  }
  ngOnInit(): void {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  async uploadPhoto(): Promise<string> {
    if (this.file) {
      try {
        const response = await this.photoService.uploadPhoto(this.albumId, this.file).toPromise();
        return response.photoId;
      } catch (error) {
        console.error(error);
        return '';
      }
    }
    return ''; 
  }

  async addPost(){
    let photoId = await this.uploadPhoto();
    if(photoId){
      this.post.photoId = photoId;
    }
    this.post.posterId = this.userId;

    console.log(this.post);
    this.postService.addPost(this.post).subscribe({
      next: () => {
        Swal.fire({
          title: "Post Added!",
          text: "New pastebook post success!",
          icon: "success"
        });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['home']);
        });
      },
      error: () =>{
        this.toast.error({detail: "ERROR", summary: "Error adding a new post!", duration: 5000});
      }
    });
  }
}
