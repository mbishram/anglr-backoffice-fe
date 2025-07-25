import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validate if `first` matched with `second`. Validation error will be set to the group and `first`
 * @param {string} first - First field matched
 * @param {string} second - Second field matched
 * @constructor
 */
export const matchesValidator =
  (first: string, second: string): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(first);
    const firstValue = firstControl?.value;
    const secondControl = control.get(second);
    const secondValue = secondControl?.value;

    const isError = firstValue && secondValue && firstValue !== secondValue;

    const validationObject = { matches: false };

    // Set the error to the first control only if it is error
    if (isError) firstControl?.setErrors(validationObject);

    // Set error to the form group
    return isError ? validationObject : null;
  };
