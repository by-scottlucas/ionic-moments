import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'new-moment',
    loadChildren: () => import('./components/add-moment/add-moment.module').then(m => m.AddMomentPageModule)
  },
  {
    path: 'edit-moment',
    loadChildren: () => import('./components/edit-moment/edit-moment.module').then( m => m.EditMomentPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
