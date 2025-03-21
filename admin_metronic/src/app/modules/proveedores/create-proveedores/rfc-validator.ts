import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rfcValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Si el valor está vacío, no se aplica la validación
    }

    const rfcPattern = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;
    const isValid = rfcPattern.test(control.value.toUpperCase());

    return isValid ? null : { invalidRFC: true };
  };
}
