import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ListaComponent } from './lista.component';
import { ModalModule } from '../modal/modal.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListaComponent],
  imports: [CommonModule, IonicModule, FormsModule, ModalModule],
  exports: [ListaComponent],
})
export class ListaModule { }
