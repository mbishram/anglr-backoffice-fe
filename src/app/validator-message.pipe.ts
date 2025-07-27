import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Return human readable validation error message of form control
 *
 * @usageNotes
 *
 * ```angular181html
 * <p>{{ form.get('name') | validatorMessageImpure }}</p>
 * ```
 */
@Pipe({
  name: 'validatorMessageImpure',
  pure: false,
})
export class ValidatorMessageImpurePipe implements PipeTransform {
  transform(
    control: AbstractControl | null,
    fieldLabel: string,
  ): string | null {
    if (!control) return null;

    if (control.valid) return null;

    if (!control.touched && control.pristine) return null;

    if (!control.errors) return null;

    const errorMessages = Object.entries(control.errors).reduce<string[]>(
      (acc, [error, value]) => {
        switch (error) {
          case 'required':
            return [fieldLabel + ' is required', ...acc];
          case 'minlength':
            return [
              fieldLabel +
                ` length is minimum ${value?.requiredLength} characters long`,
              ...acc,
            ];
          case 'matches':
            return [fieldLabel + ' is not matched', ...acc];
          case 'email':
            return [fieldLabel + ' is not a valid email', ...acc];
          case 'maxDate':
            return [fieldLabel + ` must be on or before ${value?.max}`, ...acc];
          case 'numeric':
            return [fieldLabel + ' can only be a number', ...acc];
          default:
            // Log an error, so we can easily identify unhandled errors
            console.error(`ERROR: ${error} type not handled!`);
            return acc;
        }
      },
      [],
    );
    if (!errorMessages.length) return null;

    return errorMessages.join(',') + '.';
  }
}
