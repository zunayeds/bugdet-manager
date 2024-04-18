import {
  Component,
  input,
  computed,
  signal,
  Signal,
  inject,
} from '@angular/core';
import { DataTableConfig } from '../../../models/data-table-config';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { DataProvider } from '../../../models/data-provider';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { RetrievedData } from '../../../models/retrieved-data';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  type = input.required<string>();
  private categoryService = inject(CategoryService);

  config = computed(() => {
    return {
      type: this.type() === 'expense' ? 'Expense Category' : 'Income Category',
      columns: [
        {
          name: 'name',
          label: 'Name',
        },
      ],
      canAdd: true,
      canEdit: true,
      addEditComponent: AddEditCategoryComponent,
      canDelete: true,
    };
  });

  dataProvider: Signal<DataProvider> = computed(() => {
    const categoryType = this.type();
    const categoryService = this.categoryService;

    return {
      getData<T>(skip?: number, take?: number): Observable<RetrievedData<T>> {
        return categoryService.getCategories(
          categoryType,
          skip as number,
          take as number
        ) as Observable<RetrievedData<T>>;
      },
    };
  });
}
