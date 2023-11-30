import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-like-modal',
  templateUrl: './like-modal.component.html',
  styleUrls: ['./like-modal.component.css']
})
export class LikeModalComponent {
  likedUsers = ['Ad Min', 'Jayvee Tinio', 'Blessie Balagtas', 'Min Ad'];

  constructor(
    public dialogRef: MatDialogRef<LikeModalComponent>,

  ){}

  closeModal() {
    this.dialogRef.close();
  }
}
