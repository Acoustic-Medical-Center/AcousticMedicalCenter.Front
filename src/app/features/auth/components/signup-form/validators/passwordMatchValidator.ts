import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  const isMismatch = password.value !== confirmPassword.value;
  const isConfirmTouchedOrDirty =
    confirmPassword.touched || confirmPassword.dirty;

  return isMismatch && isConfirmTouchedOrDirty
    ? { passwordMismatch: true }
    : null;
};
