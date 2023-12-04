import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { Album, AlbumDTO, AlbumWithFirstPhoto } from 'src/app/models/album';
import { MatDialog } from '@angular/material/dialog';
import { AddAlbumModalComponent } from 'src/app/modals/add-album-modal/add-album-modal.component';
import { Observable } from 'rxjs';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  @Input() sentUserId: string = "";
  albums: AlbumWithFirstPhoto[] =[]
  newAlbum: AlbumDTO = {
  };

  constructor(
    public dialog: MatDialog,
    private albumService: AlbumService,
    private router: Router,
    private photoService: PhotoService
  ){}



  ngOnInit(): void {
    this.getAlbums();
  }

  openModal() {
    const dialogRef = this.dialog.open(AddAlbumModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  getAlbums() {
    this.albumService.getMiniAlbum().subscribe((response: AlbumWithFirstPhoto[]) => {
      this.albums = response;

      this.albums.forEach((album) => {
        if(album.firstPhoto?.photoImageURL != null){
          this.loadPhotoAlbum(album.firstPhoto?.id!).subscribe(
            (photoUrl: string) => {
              album.photoUrl = photoUrl;
            },
            () => {
              
            }
          )
        }else{
          album.photoUrl = "assets/images/default_album.png";
        }
      });

    });
  }
  
  addAlbum() {
    this.albumService.addAlbum(this.newAlbum).subscribe(
      (response) => {
        console.log('Album added successfully. Album ID:', response);
      },
      (error) => {
        console.error('Error adding album:', error);
      }
    );
  }

  loadPhotoAlbum(photoId: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.photoService.getPhoto(photoId).subscribe(
        (photoBlob: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            observer.next(reader.result as string);
            observer.complete();
          };
          reader.readAsDataURL(photoBlob);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  goToPhotoList(albumId: string){
    this.router.navigate(['/album'], { queryParams: { id: albumId } });
  }

//   updateAlbum(): void {
//     if (this.selectedAlbum) {
//       this.albumService.updateAlbum(this.selectedAlbum.Id, this.newAlbum).subscribe(
//         () => {
//           console.log('Album updated successfully');
//           this.loadAlbums(); // Refresh the album list
//         },
//         error => {
//           console.error('Error updating album:', error);
//         }
//       );
//     }
//   }

//   deleteAlbum(): void {
//     if (this.selectedAlbum) {
//       this.albumService.deleteAlbum(this.selectedAlbum.Id).subscribe(
//         () => {
//           console.log('Album deleted successfully');
//           this.loadAlbums(); // Refresh the album list
//         },
//         error => {
//           console.error('Error deleting album:', error);
//         }
//       );
//     }
//   }
// }
}