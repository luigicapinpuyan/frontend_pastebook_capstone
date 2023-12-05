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


    // addAlbum() {
    //   this.albumService.addAlbum(this.newAlbum).subscribe((response: string)=> {
    //     this.albumId = response;
    //     if (this.file.length > 0) {
    //       this.uploadPhoto();
    //     }

    //     this.toast.success({detail: "SUCCESS", summary: "Album Added", duration: 5000}); 
    //     this.close();
    //     window.location.reload();
    //   });
    // }
    addAlbum() {
      this.albumService.addAlbum(this.newAlbum).subscribe((response: string) => {
        this.albumId = response;
        if (this.file.length > 0) {
          this.uploadPhotos().then(() => {
            this.toast.success({ detail: 'SUCCESS', summary: 'Album Added', duration: 5000 });
            this.close();
            window.location.reload();
          });
        } else {
          this.toast.success({ detail: 'SUCCESS', summary: 'Album Added', duration: 5000 });
          this.close();
          window.location.reload();
        }
      });
    }

  close() {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
  
    // const reader = new FileReader();
    // reader.onload = () => {
    //   const fileObject = {
    //     stream: reader.result as string,
    //     url: URL.createObjectURL(file),
    //     file: file, 
    //   };
    //   this.file.push(fileObject);
    // };

    this.readFileAsync(file).then((result) => {
      this.file.push(result);
    });
  
    // reader.readAsDataURL(file);
  }

  readFileAsync(file: File): Promise<{ stream: string; url: string; file: File }> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileObject = {
          stream: reader.result as string,
          url: URL.createObjectURL(file),
          file: file,
        };
        resolve(fileObject);
      };
  
      reader.readAsDataURL(file);
    });
  }
  async uploadPhotos() {
    for (const fileObject of this.file) {
      await this.uploadPhoto(fileObject.file);
    }
  }

  uploadPhoto(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.photoService.uploadPhoto(this.albumId, file).subscribe(
        (response) => {
          console.log('Photo uploaded successfully. Photo ID:', response);
          resolve(response);
        },
        (error) => {
          console.error('Error uploading photo:', error);
          reject(error);
        }
      );
    });
  }

  // uploadPhoto() {
  //   this.file.forEach(fileObject => {
  //     this.photoService.uploadPhoto(this.albumId, fileObject.file).subscribe(
  //       (response) => {
  //         console.log('Photo uploaded successfully. Photo ID:', response);
  //       },
  //       (error) => {
  //         console.error('Error uploading photo:', error);
  //       }
  //     );
  //   });
  // }
}