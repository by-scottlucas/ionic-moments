import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddMomentPage } from './add-moment.page';

const routes: Routes = [
  {
    path: '', component: AddMomentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMomentPageRoutingModule { }
