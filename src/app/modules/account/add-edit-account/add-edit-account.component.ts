import { Component } from '@angular/core';
import { Account } from '../../../models/account';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrl: './add-edit-account.component.scss',
})
export class AddEditAccountComponent {
  form: FormGroup;
  clonedData: Account;

  instance: DynamicDialogComponent | undefined;

  constructor(
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    private formBuilder: FormBuilder
  ) {
    this.instance = this.dialogService.getInstance(this.ref);
    this.clonedData = { ...this.instance.data };
    this.form = this.formBuilder.group({
      name: [this.clonedData.name],
    });
  }

  handleSave() {
    if (this.form.invalid) return;
    this.clonedData.name = this.form.value.name;
    this.ref.maximize(this.clonedData);
  }
}
