import { Component } from '@angular/core';
import { DataTableConfig } from '../../../models/data-table-config';
import { DataProvider } from '../../../models/data-provider';
import { Observable } from 'rxjs';
import { AddEditAccountComponent } from '../add-edit-account/add-edit-account.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DefaultDialogConfig } from '../../../constants/default-dialog.config';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../models/account';
import { RetrievedData } from '../../../models/retrieved-data';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
})
export class AccountListComponent {
  config: DataTableConfig = {
    type: 'Account',
    columns: [
      {
        name: 'name',
        label: 'Name',
      },
    ],
    canAdd: true,
    canEdit: true,
    addEditComponent: AddEditAccountComponent,
    canDelete: true,
  };

  dataProvider: DataProvider = {} as DataProvider;

  constructor(
    private dialogService: DialogService,
    private accountService: AccountService
  ) {
    this.dataProvider = {
      getData<T>(skip?: number, take?: number): Observable<RetrievedData<T>> {
        return accountService.getAccounts(
          skip as number,
          take as number
        ) as Observable<RetrievedData<T>>;
      },
      addData(data): Observable<any> {
        return accountService.addAccount(data as Account);
      },
      editData(data): Observable<any> {
        return accountService.updateAccount(data as Account);
      },
    };
  }

  addAccount() {
    this.dialogService.open(AddEditAccountComponent, {
      ...DefaultDialogConfig,
      data: {
        id: null,
        name: '',
      },
    });
  }
}
