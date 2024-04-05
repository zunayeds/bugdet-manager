import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-edit-income-dialog',
  templateUrl: './add-edit-income-dialog.component.html',
  styleUrl: './add-edit-income-dialog.component.scss',
})
export class AddIncomeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddIncomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
