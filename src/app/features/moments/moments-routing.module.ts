import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MomentsPage } from './pages/moments/moments.page';
import { MomentDetailPage } from './pages/moment-detail/moment.detail.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: MomentsPage,
  },
  {
    path:'moment/detail/:id',
    component: MomentDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MomentsRoutingModule {}
