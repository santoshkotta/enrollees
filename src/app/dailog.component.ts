import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Enrollee } from '../../src/app/model/enrollee.model';

@Component({
  selector: 'dailog-component',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent {

  constructor(
    public dialogRef: MatDialogRef<DailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Enrollee) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
