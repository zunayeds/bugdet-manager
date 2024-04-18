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
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'data-tree',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    TreeModule,
    ContextMenuModule,
  ],
  providers: [DialogService],
  templateUrl: './data-tree.component.html',
  styleUrl: './data-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTreeComponent implements OnDestroy {
  provider = input.required<DataProvider>();

  // actionButtonEnabled: Signal<boolean> = computed(
  //   () => !!this.config().canEdit || !!this.config().canDelete
  // );

  data = signal([] as any[]);

  subscription = new Subscription();

  // title = computed(
  //   () => 'Manage ' + StringHelper.makePlural(this.config().type)
  // );

  treeData = computed(() => {
    const data = this.data();
    
    const parents: TreeData[] = data
      .filter(d => !d['parentCategoryId'])
      .map(d => {
        return {
          key: d.id,
          label: d.name,
          data: d,
          children: []
        }
      });

    for (const parent of parents) {
      const children: TreeData[] = data
        .filter(d => d['parentCategoryId'] === parent.key)
        .map(d => {
          return {
            key: d.id,
            label: d.name,
            data: d,
            children: []
          }
        });

        if (children.length) {
          for (const child of children) {
            const grandChildren: TreeData[] = data
              .filter(d => d['parentCategoryId'] === child.key)
              .map(d => {
                return {
                  key: d.id,
                  label: d.name,
                  data: d,
                  children: []
                }
              });
            
            if (grandChildren.length) {
              child.children = grandChildren;
            }
          }

          parent.children = children;
        }
    }

    return parents;
  });

  items!: MenuItem[];

  constructor(
    private dialogService: DialogService,
    private cdRef: ChangeDetectorRef
  ) {
    effect(
      () => {
        const provider = this.provider();
        provider
          .getData()
          .subscribe((result) => {
            this.data.set(result.data);
          });
      },
      {
        allowSignalWrites: true,
        manualCleanup: false,
      }
    );

    this.items = [
      { label: 'Edit', icon: 'pi pi-pencil' },
      { label: 'Delete', icon: 'pi pi-trash' }
  ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // add() {
  //   const dialogRef = this.dialogService.open(this.config().addEditComponent, {
  //     ...DefaultDialogConfig,
  //     data: {},
  //   });

  //   this.subscription = dialogRef.onMaximize.subscribe((result) => {
  //     if (this.provider()) {
  //       const provider = this.provider();
  //       if (provider && provider.addData) {
  //         provider.addData(result).subscribe((data) => {
  //           if (!data) return;
  //           this.data.update((data) => {
  //             data.push(result);
  //             return data;
  //           });
  //           this.cdRef.detectChanges();
  //         });
  //       }
  //       dialogRef.close();
  //     }
  //   });
  // }

  // edit(element: any): void {
  //   const dialogRef = this.dialogService.open(this.config().addEditComponent, {
  //     ...DefaultDialogConfig,
  //     data: element,
  //   });

  //   this.subscription = dialogRef.onMaximize.subscribe((result) => {
  //     if (this.provider()) {
  //       const provider = this.provider();
  //       if (provider && provider.editData) {
  //         provider.editData(result).subscribe((updatedElement) => {
  //           this.data.update((data) => {
  //             const index = data.findIndex((d: any) => d.id === element.id);
  //             data[index] = updatedElement;
  //             return data;
  //           });
  //           this.cdRef.detectChanges();
  //         });
  //       }
  //       dialogRef.close();
  //     }
  //   });
  // }
}

export interface TreeData {
  key: string;
  label: string;
  data: any;
  children: any[];
}