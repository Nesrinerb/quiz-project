import { AbstractControl } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmpassword = control.get('confpassword');
  if (password?.pristine || confirmpassword?.pristine) {
    return null;
  }
  return password?.value != confirmpassword?.value ? { misMatch: true } : null;
}
