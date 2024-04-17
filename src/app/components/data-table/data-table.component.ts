import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  signal,
  Signal,
} from '@angular/core';
import { DataTableConfig } from '../../models/data-table-config';
import { DataProvider } from '../../models/data-provider';
import { CommonModule } from '@angular/common';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DefaultDialogConfig } from '../../constants/default-dialog.config';
import { Subscription } from 'rxjs';
import { StringHelper } from '../../utilities/string.helper';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ToastModule,
  ],
  providers: [DialogService],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnDestroy {
  config = input.required<DataTableConfig>();

  provider = input.required<DataProvider>();

  actionButtonEnabled: Signal<boolean> = computed(
    () => !!this.config().canEdit || !!this.config().canDelete
  );

  data = signal([] as any[]);

  subscription = new Subscription();

  skipped = signal(0);

  rows = signal(10);

  totalRecords = signal(0);

  title = computed(
    () => 'Manage ' + StringHelper.makePlural(this.config().type)
  );

  constructor(
    private dialogService: DialogService,
    private cdRef: ChangeDetectorRef
  ) {
    effect(
      () => {
        const provider = this.provider();
        provider
          .getData(this.skipped(), this.skipped() + this.rows() - 1)
          .subscribe((result) => {
            this.totalRecords.set(result.count);
            this.data.set(result.data);
          });
      },
      {
        allowSignalWrites: true,
        manualCleanup: false,
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  add() {
    const dialogRef = this.dialogService.open(this.config().addEditComponent, {
      ...DefaultDialogConfig,
      data: {},
    });

    this.subscription = dialogRef.onMaximize.subscribe((result) => {
      if (this.provider()) {
        const provider = this.provider();
        if (provider && provider.addData) {
          provider.addData(result).subscribe((data) => {
            if (!data) return;
            if (this.skipped() + this.rows() > this.totalRecords()) {
              this.data.update((data) => {
                data.push(result);
                return data;
              });
              this.cdRef.detectChanges();
            }

            this.totalRecords.update((count) => count + 1);
          });
        }
        dialogRef.close();
      }
    });
  }

  edit(element: any): void {
    const dialogRef = this.dialogService.open(this.config().addEditComponent, {
      ...DefaultDialogConfig,
      data: element,
    });

    this.subscription = dialogRef.onMaximize.subscribe((result) => {
      if (this.provider()) {
        const provider = this.provider();
        if (provider && provider.editData) {
          provider.editData(result).subscribe((updatedElement) => {
            this.data.update((data) => {
              const index = data.findIndex((d: any) => d.id === element.id);
              data[index] = updatedElement;
              return data;
            });
            this.cdRef.detectChanges();
          });
        }
        dialogRef.close();
      }
    });
  }

  handlePageChange(event: TablePageEvent): void {
    this.skipped.set(event.first);
    this.rows.set(event.rows);
  }
}
