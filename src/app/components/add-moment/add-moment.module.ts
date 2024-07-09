import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddMomentPageRoutingModule } from './add-moment-routing.module';
import { AddMomentPage } from './add-moment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMomentPageRoutingModule,
  ],
  declarations: [AddMomentPage],
  exports: [AddMomentPage]
})
export class AddMomentPageModule { }
