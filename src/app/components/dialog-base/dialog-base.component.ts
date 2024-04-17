import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'dialog-base',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  providers: [DialogService],
  templateUrl: './dialog-base.component.html',
  styleUrl: './dialog-base.component.scss',
})
export class DialogBaseComponent {
  title = input.required<string>();
  switchToYesNoButtons = input<boolean>();
  @Output() changesSaved = new EventEmitter();

  constructor(public ref: DynamicDialogRef) {}

  handleSave() {
    this.changesSaved.emit();
  }

  handleClose() {
    this.ref.close();
  }
}
