import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { CategoryService } from '../../services/category.service';
import { DataTreeComponent } from '../../components/data-tree/data-tree.component';

const routes: Routes = [
  {
    path: '',
    component: CategorySelectorComponent,
  },
];

@NgModule({
  declarations: [
    CategorySelectorComponent,
    CategoryListComponent,
    AddEditCategoryComponent,
  ],
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
    TabViewModule,
    DataTreeComponent
  ],
  providers: [
    DialogService,
    CategoryService,
    {
      provide: DataAccessBaseService,
      useClass: DataAccessService,
    },
    MessageService,
  ],
})
export class CategoryModule {}
