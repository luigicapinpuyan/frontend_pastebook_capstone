import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent {
  comments: any[] = [
    { user: 'Ad Min', text: 'If the sentence is the essential soul to express oneself in their own way, then the paragraph is the virtual body of it. The Text Generator is an intelligent tool that creates random text incorporated with random thoughts. This smart tool is a virtual friend of yours that can talk to you in multidimensional thinking. It will provide you with thoughts, concepts, and ideas of different topics that will not only assist you in creating new knowledge but also enhance your brain function.' },
    { user: 'Jayvee Tinio', text: 'Amazing' },
    { user: 'Blessie Balagtas', text: 'Slay!' },
    { user: 'Min Ad', text: 'Lorem ipsum et dolor sit amet.' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    console.log(data.postId);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
