import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PhotoService } from 'src/app/services/photo.service';
import { SessionService } from 'src/app/services/session.service';
import { AlbumService } from 'src/app/services/album.service';
import { AlbumDTO } from 'src/app/models/album';

@Component({
  selector: 'app-add-album-modal',
  templateUrl: './add-album-modal.component.html',
  styleUrls: ['./add-album-modal.component.css']
})
export class AddAlbumModalComponent {

  file: File | null = null;
  albumId: string = this.albumService.getAlbumId()
  newAlbum: AlbumDTO = {
  };
  constructor
    (
      public dialogRef: MatDialogRef<AddAlbumModalComponent>,
      private photoService: PhotoService,
      private albumService: AlbumService
    ) {}


    addAlbum() {
      this.albumService.addAlbum(this.newAlbum).subscribe(
        (response) => {
          
          if (this.file) {
            this.uploadPhoto();
          }
        },
        (error) => {
          console.error('Error adding album:', error);
        }
      );
    }

  close() {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.uploadPhoto();
  }
  

  uploadPhoto() {
    if (this.file) {
      this.photoService.uploadPhoto(this.albumId, this.file).subscribe(
        (response) => {
          console.log('Photo uploaded successfully. Photo ID:', response);
        },
        (error) => {
          console.error('Error uploading photo:', error);
          // Handle the error as needed
        }
      );
    }
  }
}