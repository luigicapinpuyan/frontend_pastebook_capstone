import { Component, Input, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album, AlbumDTO, AlbumWithFirstPhoto } from 'src/app/models/album';
import { MatDialog } from '@angular/material/dialog';
import { AddAlbumModalComponent } from 'src/app/modals/add-album-modal/add-album-modal.component';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  @Input() sentUserId: string = "";
  albums: Album[] =[]
  newAlbum: AlbumDTO = {
  };
  constructor(
    public dialog: MatDialog,
    private albumService: AlbumService,
  ){}



  ngOnInit(): void {
    this.loadAlbums();
  }


  openModal() {
    const dialogRef = this.dialog.open(AddAlbumModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  loadAlbums() {
    this.albumService.getAllAlbums().subscribe((response: Album[]) => {
      this.albums = response
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