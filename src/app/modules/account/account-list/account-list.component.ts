import { Component } from '@angular/core';
import { DataTableConfig } from '../../../models/data-table-config';
import { DataProvider } from '../../../models/data-provider';
import { Observable, of } from 'rxjs';
import { Account } from '../../../models/account';
import { AddEditAccountComponent } from '../add-edit-account/add-edit-account.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
})
export class AccountListComponent {
  config: DataTableConfig = {
    columns: [
      {
        name: 'name',
        label: 'Name',
      },
    ],
    canEdit: true,
    editComponent: AddEditAccountComponent,
    canDelete: true,
  };

  dataProvider: DataProvider = {
    skip: 0,
    take: 10,
    execute<T>() {
      const accounts: Account[] = [
        {
          id: 1,
          name: 'Cash',
        },
        {
          id: 2,
          name: 'City Debit Card',
        },
        {
          id: 3,
          name: 'SCB Debit Card',
        },
        {
          id: 4,
          name: 'SCB Credit Card',
        },
        {
          id: 5,
          name: 'BKash',
        },
        {
          id: 6,
          name: 'Savings',
        },
      ];
      return of(accounts) as Observable<T[]>;
    },
  };

  constructor(private dialog: MatDialog) {}

  addAccount() {
    const dialogRef = this.dialog.open(AddEditAccountComponent, {
      data: {
        id: null,
        name: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
