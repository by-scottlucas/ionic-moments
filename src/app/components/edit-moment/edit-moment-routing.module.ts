import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMomentPage } from './edit-moment.page';

const routes: Routes = [
  {
    path: '',
    component: EditMomentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMomentPageRoutingModule {}
