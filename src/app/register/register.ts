import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { IftaLabel } from 'primeng/iftalabel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { matchesValidator } from 'app/matches.directive';
import { ValidatorMessageImpurePipe } from 'app/validator-message.pipe';
import { MessageService } from 'primeng/api';
import { Password } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from 'app/account/account.service';
import { IAccount } from 'app/account/account';

@Component({
  selector: 'agl-register',
  imports: [
    InputText,
    IftaLabel,
    Button,
    Message,
    Password,
    ReactiveFormsModule,
    ValidatorMessageImpurePipe,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private formBuilder = inject(FormBuilder).nonNullable;
  private messageService = inject(MessageService);
  private router = inject(Router);
  private accountService = inject(AccountService);

  protected form = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required]],
    },
    {
      validators: matchesValidator('passwordConfirmation', 'password'),
    },
  );

  protected submitForm() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const { passwordConfirmation, ...rest } = this.form.value;
      const data = rest as IAccount;

      this.accountService.register(data).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account created successfully!',
          });

          this.form.reset();

          void this.router.navigate(['/auth', 'login']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Failed to create account! ' + error.body.message,
          });
        },
      });
    }
  }
}
