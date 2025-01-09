import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-modal',
  imports: [SharedModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() cancelBtnText: string = 'Cancel';
  @Input() confirmBtnText: string = 'Confirm';
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() confirmEvent = new EventEmitter<void>();

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onCancel() {
    this.cancelEvent.emit();
    this.closeModal();
  }

  onConfirm() {
    this.confirmEvent.emit();
    this.closeModal();
  }
}
