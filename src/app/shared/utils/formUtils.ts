import { FormControl, FormGroup } from '@angular/forms';

export function getFormControl(form: FormGroup, name: string): FormControl {
  return form.get(name) as FormControl;
}
