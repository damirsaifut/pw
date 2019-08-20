import { FormGroup } from '@angular/forms';

export const ValidateBalance = (controlName: string, balance: number) => {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.validateBalance) {
      return;
    }

    if (Number(control.value) > balance) {
      control.setErrors({ validateBalance: true });
    } else {
      control.setErrors(null);
    }
  };
};
