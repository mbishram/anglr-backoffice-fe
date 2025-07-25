import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { matchesValidator } from 'app/matches.directive';
import { ValidatorMessageImpurePipe } from 'app/validator-message.pipe';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

@Component({
  selector: 'agl-register',
  imports: [
    InputTextModule,
    IftaLabelModule,
    ButtonModule,
    MessageModule,
    PasswordModule,
    ReactiveFormsModule,
    ValidatorMessageImpurePipe,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private formBuilder = inject(FormBuilder).nonNullable;
  private messageService = inject(MessageService);
  private router = inject(Router);

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
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Account created successfully!',
      });

      this.form.reset();

      void this.router.navigate(['auth', 'login']);
    }
  }
}
