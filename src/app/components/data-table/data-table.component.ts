import { Component, computed, input, Signal } from '@angular/core';
import { DataTableConfig } from '../../models/data-table-config';
import { DataProvider } from '../../models/data-provider';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  config = input.required<DataTableConfig>();

  provider = input.required<DataProvider>();

  displayedColumns: Signal<string[]> = computed(() => {
    const columns = this.config().columns.map((column) => column.name);
    if (this.actionButtonEnabled()) {
      columns.push('actions');
    }
    return columns;
  });

  actionButtonEnabled: Signal<boolean> = computed(
    () => !!this.config().canEdit || !!this.config().canDelete
  );

  data: Signal<Observable<any[]>> = computed(() => this.provider().execute());

  constructor(private dialog: MatDialog) {}

  edit(element: any): void {
    const dialogRef = this.dialog.open(this.config().editComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
