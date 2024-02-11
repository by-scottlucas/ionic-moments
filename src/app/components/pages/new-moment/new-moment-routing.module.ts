import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMomentPage } from './new-moment.page';

const routes: Routes = [
  {
    path: '',
    component: NewMomentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMomentPageRoutingModule {}
