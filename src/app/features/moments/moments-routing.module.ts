import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MomentsPage } from './pages/moments.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: MomentsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MomentsRoutingModule {}
