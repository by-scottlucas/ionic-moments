import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MomentFormPageRoutingModule } from './moment-form-routing.module';
import { MomentFormPage } from './moment-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentFormPageRoutingModule,
  ],
  declarations: [MomentFormPage],
  exports: [MomentFormPage]
})
export class MomentFormPageModule { }
