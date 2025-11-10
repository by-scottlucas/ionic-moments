import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MomentsRoutingModule } from './moments-routing.module';
import { MomentsPage } from './pages/moments.page';

@NgModule({
  declarations: [MomentsPage],
  imports: [SharedModule, MomentsRoutingModule],
})
export class MomentsModule {}
