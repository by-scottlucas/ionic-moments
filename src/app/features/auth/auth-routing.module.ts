import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotSuccessPage } from './pages/forgot-sucess/forgot-success.page';
import { ForgotPage } from './pages/forgot/forgot.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'forgot',
    component: ForgotPage,
  },
  {
    path: 'forgot/success',
    component: ForgotSuccessPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
