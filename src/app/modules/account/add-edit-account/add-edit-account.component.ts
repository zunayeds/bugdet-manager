import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../../../models/account';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrl: './add-edit-account.component.scss',
})
export class AddEditAccountComponent {
  form: FormGroup;
  clonedData: Account;

  constructor(
    public dialogRef: MatDialogRef<AddEditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private formBuilder: FormBuilder
  ) {
    this.clonedData = { ...data };
    this.form = this.formBuilder.group({
      name: [this.clonedData.name],
    });
  }

  handleSave() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.clonedData);
  }
}
