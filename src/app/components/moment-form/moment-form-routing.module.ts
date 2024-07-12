import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentFormPage } from './moment-form.page';


const routes: Routes = [

  { path: '', component: MomentFormPage }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MomentFormPageRoutingModule { }
