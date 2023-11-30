import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  albumId: any;
  albumData: any; // Adjust the type according to your data structure

  constructor(private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('albumId');
      this.loadAlbumData();
    });
  }

  loadAlbumData() {
    // Call your album service to fetch data based on albumId
    this.albumService.getAllPhotos(this.albumId).subscribe(
      (response) => {
        this.albumData = response;
      },
      (error) => {
        console.error('Error fetching album data:', error);
      }
    );
  }
}