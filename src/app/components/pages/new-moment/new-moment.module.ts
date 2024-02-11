import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMomentPageRoutingModule } from './new-moment-routing.module';

import { NewMomentPage } from './new-moment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMomentPageRoutingModule,
  ],
  declarations: [NewMomentPage],
  exports:[NewMomentPage]
})
export class NewMomentPageModule {}
