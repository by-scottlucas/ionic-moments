import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ForgotPage } from './pages/forgot/forgot.page';
import { ForgotSuccessPage } from './pages/forgot-sucess/forgot-success.page';

@NgModule({
  declarations: [
    LoginPage,
    RegisterPage,
    ForgotPage,
    ForgotSuccessPage,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
