import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [ModalComponent],
})
export class ModalModule { }
