import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MomentsRoutingModule } from './moments-routing.module';
import { MomentsPage } from './pages/moments/moments.page';
import { MomentFormComponent } from './components/moment-form/moment-form.component';

@NgModule({
  declarations: [MomentsPage, MomentFormComponent],
  imports: [SharedModule, MomentsRoutingModule],
})
export class MomentsModule {}
