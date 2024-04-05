import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogBaseComponent } from '../../components/dialog-base/dialog-base.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    DialogBaseComponent,
  ],
})
export class AccountModule {}
