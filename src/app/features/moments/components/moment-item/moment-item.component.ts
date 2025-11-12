import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MomentDTO } from '../../models/moment.dto';
import { CalendarDays } from 'lucide-angular';

@Component({
  selector: 'app-moment-item',
  templateUrl: './moment-item.component.html',
  styleUrls: ['./moment-item.component.scss'],
})
export class MomentItemComponent implements OnInit {
  readonly itemIcon = CalendarDays;

  @Input() moment!: MomentDTO;
  @Output() actionSheet = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  showActionSheet(moment: MomentDTO) {
    this.actionSheet.emit(moment);
  }
}
