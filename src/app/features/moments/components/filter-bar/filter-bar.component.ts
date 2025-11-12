import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { Search, SlidersHorizontal } from 'lucide-angular';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit, OnDestroy {
  readonly searchIcon = Search;
  readonly filterIcon = SlidersHorizontal;

  @Input() availableYears: number[] = [];
  @Output() searchChange = new EventEmitter<string>();
  @Output() yearSelected = new EventEmitter<number>();

  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.subscription = this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.searchChange.emit(term);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  async openYearPicker() {
    const inputs: AlertInput[] = [
      {
        type: 'radio',
        label: 'Todos',
        value: 0,
      },
      ...this.availableYears.map<AlertInput>((year) => ({
        type: 'radio',
        label: year.toString(),
        value: year,
      })),
    ];

    const alert = await this.alertController.create({
      header: 'Filtrar por ano',
      inputs,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Selecionar',
          handler: (selectedYear) => this.yearSelected.emit(selectedYear),
        },
      ],
    });

    await alert.present();
  }
}
