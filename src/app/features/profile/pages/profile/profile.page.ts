import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ChevronLeft } from 'lucide-angular';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getFormControl } from 'src/app/shared/utils/formUtils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  readonly backIcon = ChevronLeft;

  avatarImage =
    'https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg';

  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private modalController: ModalController
  ) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  async onBack() {
    await this.modalController.dismiss(null, 'cancel');
  }

  async loadUserData() {
    this.authService.getAuthenticatedUser((user) => {
      if (user) {
        this.profileForm.patchValue({
          fullName: user.displayName || '',
          email: user.email || '',
        });
      }
    });
  }

  async onSubmit() {
    if (this.profileForm.invalid) return;

    const { fullName, email } = this.profileForm.value;

    try {
      await this.loadingService.showLoading();
      await this.authService.updateUserData({
        displayName: fullName,
        email: email,
      });
      this.modalController.dismiss({ edited: true }, 'confirm');
    } catch (error) {
      console.error(error);
      this.toastService.showToast('Erro ao atualizar o perfil.', 2000);
    } finally {
      await this.loadingService.hideLoading();
    }
  }

  getControl(name: string) {
    return getFormControl(this.profileForm, name);
  }
}
