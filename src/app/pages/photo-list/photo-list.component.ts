import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  albumId: string = '';
  album: any;
  photos: Photo[] = [];
  file: File | null = null;

  constructor(
    public toast: NgToastService,
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.albumId = params['id'];
    });

    this.albumService.getAlbum(this.albumId).subscribe((response) => {
      this.album = response;
    });

    this.getPhotos();
  }

  getPhotos() {
    this.albumService.getAllPhotos(this.albumId).subscribe((response: Photo[]) => {
      this.photos = response;

      this.photos.forEach((photo) => {
        this.loadPhoto(photo.id!).subscribe(
          (photoUrl: string) => {
            photo.photoImageURL = photoUrl;
          },
          (error) => {
            console.error('Error loading photo:', error);
          }
        );
      });
    });
  }

  onChange(event: any) { 
    this.file = event.target.files[0]; 
} 

onUpload() { 
  if (this.file) {
      if (this.file) {
        try {
          this.photoService.uploadPhoto(this.albumId, this.file).toPromise();
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Photo added to album successfully.',
            duration: 5000
          });
  
          // Optionally reload the photos after adding a new photo
          this.getPhotos();
        } catch (error) {
          console.error(error);
          this.toast.error({ detail: 'ERROR', summary: 'Error adding photo to album', duration: 5000 });
        }
      }
    }
} 

  loadPhoto(photoId: string): Observable<string> {
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
}
