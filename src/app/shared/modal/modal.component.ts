import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-modal',
  imports: [SharedModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = 'Are you sure?';
  @Input() content: string = 'Do you want to continue with this action?';
  @Input() cancelBtnText: string = 'Cancel';
  @Input() confirmBtnText: string = 'Confirm';
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() confirmEvent = new EventEmitter<void>();

  showModal: boolean = false;
  showButtonContainer: boolean = false;

  openModal() {
    this.showModal = true;
    this.showButtonContainer = true;
  }

  closeModal() {
    this.showModal = false;
    this.showButtonContainer = false;
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
