import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalendarDays, X } from 'lucide-angular';
import { getFormControl } from 'src/app/shared/utils/formUtils';
import { MomentsService } from '../../services/moments.service';
import { MomentDTO } from '../../models/moment.dto';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.scss'],
})
export class MomentFormComponent implements OnInit {
  readonly closeIcon = X;
  readonly dateIcon = CalendarDays;

  momentForm: FormGroup;
  @Input() formType!: 'add' | 'edit';
  @Input() formData!: MomentDTO;

  formTitle: string = '';
  formButton: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private momentService: MomentsService,
    private modalController: ModalController
  ) {
    const today = new Date().toISOString().split('T')[0];

    this.momentForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [today, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.formType === 'add') {
      this.formTitle = 'Adicionar Moment';
      this.formButton = 'Salvar Moment';
    } else {
      this.formTitle = 'Editar Moment';
      this.formButton = 'Salvar Alterações';
      this.momentForm.patchValue(this.formData);
    }
  }

  async onSubmit() {
    if (this.momentForm.invalid) return;

    if (this.formType === 'add') {
      await this.momentService.create(this.momentForm.value);
      this.modalController.dismiss({ created: true }, 'confirm');
    } else if (this.formType === 'edit' && this.formData?.id) {
      await this.momentService.updateMoment(
        this.formData.id,
        this.momentForm.value
      );
      this.modalController.dismiss({ edited: true }, 'confirm');
    }
  }

  onClose() {
    this.modalController.dismiss();
  }

  getControl(name: string) {
    return getFormControl(this.momentForm, name);
  }
}
