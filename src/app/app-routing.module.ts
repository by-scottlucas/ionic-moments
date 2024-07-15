import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'cadastro', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'add-moment', loadChildren: () => import('./components/moment-form/moment-form.module').then(m => m.MomentFormPageModule), canActivate: [AuthGuard] },
  { path: 'edit-moment', loadChildren: () => import('./components/moment-form/moment-form.module').then(m => m.MomentFormPageModule), canActivate: [AuthGuard] },
  { path: 'user-modal', loadChildren: () => import('./components/user-modal/user-modal.module').then(m => m.UserModalPageModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
