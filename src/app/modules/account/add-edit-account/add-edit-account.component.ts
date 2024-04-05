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

  constructor(
    public dialogRef: MatDialogRef<AddEditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [data.name],
    });
  }
}
