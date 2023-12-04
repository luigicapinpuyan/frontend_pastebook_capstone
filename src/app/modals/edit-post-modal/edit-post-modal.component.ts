import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  file: File | null = null;
  albumId: string = '';
  photoUrl: string = "";
  postId: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditPostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private photoService: PhotoService,
    private postService: PostService,
    private toast: NgToastService,
    private albumService: AlbumService,
    private router: Router,
    
    ) {
    this.postId = data.postId;

    }

  ngOnInit(): void {
    this.albumService.getUploadsAlbumId().subscribe((response: string) => {
      this.albumId = response;
    });
    this.loadPost(this.postId);
    console.log(this.post)
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


  loadPost(postId: string) {
    this.postService.getPost(postId).subscribe((response: Post) => {
      this.post = response
    },
    (error) => {
      console.error("Error fetching post:", error)
    })
  }

  close() {
    this.dialogRef.close();
  }

  async onSubmitEditPost() {
    let photoId = await this.uploadPhoto();
    this.post.photoId = photoId;
    console.log(this.post.photoId);
    this.postService.updatePost(this.post).subscribe({
      next: () => {
        this.toast.success({ detail: "SUCCESS", summary: "Successfully Updated.", duration: 5000 });
        this.close();
        
        // Navigating to the current route to refresh the page
         const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['']);
          window.location.reload();
         });
      },
      error: () => {
        this.toast.error({ detail: "ERROR", summary: "Error changing post.", duration: 500000 });
      }
    });
  }

  removePhoto() {
    // Clear the photoId and update the post
    this.post.photoId = '';
    this.postService.updatePost(this.post).subscribe({
      next: () => {
        this.toast.success({ detail: "SUCCESS", summary: "Successfully Removed Photo.", duration: 5000 });
        this.close();
        
        // Navigating to the current route to refresh the page
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['']);
          window.location.reload();
        });
      },
      error: () => {
        this.toast.error({ detail: "ERROR", summary: "Error removing photo.", duration: 500000 });
      }
    });
  }

}
