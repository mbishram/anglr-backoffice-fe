import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { LoginAccountDialog } from 'app/login/login-account-dialog/login-account-dialog';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { ValidatorMessageImpurePipe } from 'app/validator-message.pipe';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'agl-login',
  imports: [
    ReactiveFormsModule,
    Button,
    LoginAccountDialog,
    IftaLabel,
    InputText,
    Message,
    Password,
    ValidatorMessageImpurePipe,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private formBuilder = inject(FormBuilder).nonNullable;
  private messageService = inject(MessageService);
  private router = inject(Router);

  protected isListOpen = signal(false);

  protected form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  protected submitForm() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You have successfully logged in!',
      });

      this.form.reset();

      void this.router.navigate(['/']);
    }
  }
}
