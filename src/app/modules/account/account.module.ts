import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { DialogBaseComponent } from '../../components/dialog-base/dialog-base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DataAccessBaseService } from '../../services/data-access-base.service';
import { DataAccessService } from '../../services/data-access.service';
import { AccountService } from '../../services/account.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  {
    path: '',
    component: AccountListComponent,
  },
];

@NgModule({
  declarations: [AccountListComponent, AddEditAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableComponent,
    ReactiveFormsModule,
    DialogBaseComponent,
    InputTextModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ToastModule,
  ],
  providers: [
    DialogService,
    AccountService,
    {
      provide: DataAccessBaseService,
      useClass: DataAccessService,
    },
    MessageService,
  ],
})
export class AccountModule {}
