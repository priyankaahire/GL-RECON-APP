import { Component, Inject } from '@angular/core';
import { MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-action-dialog',
  templateUrl: './message-action-dialog.component.html',
  styleUrls: ['./message-action-dialog.component.scss']
})
export class MessageActionDialogComponent {

  title:string;
  message: string;
constructor(
  public dialogRef: MatDialogRef<MessageActionDialogComponent>, 
  @Inject(MAT_DIALOG_DATA) public data:any
) {
  this.title = data.title;
  this.message =  data.message;
}


onOk(): void {
  this.dialogRef.close('ok');
}
}
