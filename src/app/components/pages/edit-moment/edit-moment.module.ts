import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMomentPageRoutingModule } from './edit-moment-routing.module';

import { EditMomentPage } from './edit-moment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMomentPageRoutingModule
  ],
  declarations: [EditMomentPage]
})
export class EditMomentPageModule {}
