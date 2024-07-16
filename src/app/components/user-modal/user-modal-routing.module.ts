import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserModalPage } from './user-modal.page';

const routes: Routes = [
  { path: '', component: UserModalPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserModalPageRoutingModule { }
