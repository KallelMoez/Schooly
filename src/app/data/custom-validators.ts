import { FormGroup } from "@angular/forms";

export function confirmPassword(control: string, confirmControl: string) {
  return (formId: FormGroup) => {
    let controlInput = formId.controls[control];
    let confirmControlInput = formId.controls[confirmControl];
    if (controlInput.value != confirmControlInput.value) {
      confirmControlInput.setErrors({ confirmError: true });
    } else {
      confirmControlInput.setErrors(null);
    }
  };
}