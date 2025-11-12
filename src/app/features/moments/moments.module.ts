import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderUserComponent } from './components/header-user/header-user.component';
import { MomentFormComponent } from './components/moment-form/moment-form.component';
import { MomentItemComponent } from './components/moment-item/moment-item.component';
import { MomentsRoutingModule } from './moments-routing.module';
import { MomentsPage } from './pages/moments/moments.page';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    MomentsPage,
    MomentFormComponent,
    HeaderUserComponent,
    MomentItemComponent,
    FilterBarComponent
  ],
  imports: [SharedModule, MomentsRoutingModule],
})
export class MomentsModule {}
