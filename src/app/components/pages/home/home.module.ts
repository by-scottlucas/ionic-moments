import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HeaderModule } from '../../header/header.module';
import { HomePage } from './home.page';
import { ListaModule } from '../../lista/lista.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    ListaModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
