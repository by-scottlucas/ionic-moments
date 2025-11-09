import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EyeIcon, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: false,
})
export class InputFieldComponent {
  readonly EyeIcon = EyeIcon;
  readonly EyeOffIcon = EyeOff;

  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() control!: FormControl;
  @Input() name = '';
  @Input() required = false;

  showPassword = false;

  get computedType(): string {
    return this.type === 'password' && this.showPassword ? 'text' : this.type;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(): string {
    if (!this.control) return '';
    if (this.control.errors?.['required']) return 'Este campo é obrigatório.';
    if (this.control.errors?.['email']) return 'E-mail inválido.';
    if (this.control.errors?.['minlength']) {
      const requiredLength = this.control.errors['minlength'].requiredLength;
      return `Mínimo de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido.';
  }
}
