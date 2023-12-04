import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PostDTO } from 'src/app/models/post';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlbumService } from 'src/app/services/album.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{
  post: PostDTO = new PostDTO();
  file: File | null = null;
  albumId: string = '';

  constructor(
    private photoService: PhotoService,
    private postService: PostService,
    private toast: NgToastService,
    private albumService: AlbumService
  ){
  }
  ngOnInit(): void {
    this.albumService.getUploadsAlbumId().subscribe((response: string) => {
      this.albumId = response;
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  async uploadPhoto(): Promise<string> {
    if (this.file) {
      try {
        const response = await this.photoService.uploadPhoto(this.albumId, this.file).toPromise();
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
        return '';
      }
    }
    return ''; 
  }

  async addPost(){
    if (this.file){
      let photoId = await this.uploadPhoto();
      this.post.photoId = photoId;
      console.log(this.post.photoId);
    }
    


    console.log(this.post);
    this.postService.addPost(this.post).subscribe({
      next: (response) => {
        Swal.fire({
          title: "Post Added!",
          text: "New pastebook post success!",
          icon: "success"
        }).then(() => {
          window.location.reload();
        });
      },
      error: (response) =>{
        this.toast.error({detail: "ERROR", summary: "Error adding a new post!", duration: 5000});
        console.log(response);
      }
    });
  }
}
