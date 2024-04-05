import { Component } from '@angular/core';
import { AddIncomeDialogComponent } from '../add-edit-income-dialog/add-edit-income-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'add-income',
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.scss',
})
export class AddIncomeComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddIncomeDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
