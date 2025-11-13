import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarDays } from 'lucide-angular';

import { MomentDTO } from '../../models/moment.dto';

@Component({
  selector: 'app-moment-item',
  templateUrl: './moment-item.component.html',
  styleUrls: ['./moment-item.component.scss'],
})
export class MomentItemComponent implements OnInit {
  readonly itemIcon = CalendarDays;

  @Input() moment!: MomentDTO;

  constructor(private router: Router) {}

  ngOnInit() {}

  showMomentDetail(moment: MomentDTO) {
    if (moment.id) {
      this.router.navigate(['/home/moment/detail', moment.id]);
    }
  }
}
