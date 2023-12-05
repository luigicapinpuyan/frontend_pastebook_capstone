import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Post, PostDTO } from 'src/app/models/post';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlbumService } from 'src/app/services/album.service';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css']
})
export class EditPostModalComponent implements OnInit {
  post: Post= new Post();
  postId: string = "";
  file: File | null = null;
  albumId: string = '';
  photoUrl: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditPostModalComponent>,
    private photoService: PhotoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
    private toast: NgToastService,
    private albumService: AlbumService,

    ) {
      this.postId = data.postId;
    }

  ngOnInit(): void {
    this.getPost();
    this.albumService.getUploadsAlbumId().subscribe((response: string) => {
      this.albumId = response;
    });

    
  }

  getPost(){
    this.postService.getPost(this.postId).subscribe((response: Post) =>{
      this.post = response;
      console.log(this.post);
      this.loadPhoto(this.post.photo?.id!);
    });
  }

  closeModal() {
    this.dialogRef.close();
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
    let photoId = await this.uploadPhoto();
    this.post.photoId = photoId;
    console.log(this.post.photoId);


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

  async updatePost(){
    let photoId = await this.uploadPhoto();
    this.post.photoId = photoId;

    this.postService.updatePost(this.post).subscribe((response) => {
      Swal.fire({
        title: "Post Updated!",
        text: "Pastebook post update success!",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    });
  }

  loadPhoto(photoId: string): void {
    this.photoService.getPhoto(photoId).subscribe(
      (photoBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string;
        };
        reader.readAsDataURL(photoBlob);
      }
    );
  }

}
