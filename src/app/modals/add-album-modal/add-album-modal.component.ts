import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PhotoService } from 'src/app/services/photo.service';
import { SessionService } from 'src/app/services/session.service';
import { AlbumService } from 'src/app/services/album.service';
import { AlbumDTO } from 'src/app/models/album';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-album-modal',
  templateUrl: './add-album-modal.component.html',
  styleUrls: ['./add-album-modal.component.css']
})
export class AddAlbumModalComponent {

  file: { stream: string, url: string, file: File }[] = [];
  albumId: string = this.albumService.getAlbumId()
  newAlbum: AlbumDTO = {
  };
  constructor
    (
      public dialogRef: MatDialogRef<AddAlbumModalComponent>,
      private photoService: PhotoService,
      private albumService: AlbumService,
      private toast: NgToastService
    ) {}


    addAlbum() {
      this.albumService.addAlbum(this.newAlbum).subscribe((response: string)=> {
        this.albumId = response;
        if (this.file.length > 0) {
          this.uploadPhoto();
        }

        this.toast.success({detail: "SUCCESS", summary: "Album Added", duration: 5000}); 
        this.close();
        window.location.reload();
      });
    }

  close() {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
  
    const reader = new FileReader();
    reader.onload = () => {
      const fileObject = {
        stream: reader.result as string,
        url: URL.createObjectURL(file),
        file: file, 
      };
      this.file.push(fileObject);
    };
  
    reader.readAsDataURL(file);
  }

  uploadPhoto() {
    this.file.forEach(fileObject => {
      this.photoService.uploadPhoto(this.albumId, fileObject.file).subscribe(
        (response) => {
          console.log('Photo uploaded successfully. Photo ID:', response);
        },
        (error) => {
          console.error('Error uploading photo:', error);
          // Handle the error as needed
        }
      );
    });
  }
}