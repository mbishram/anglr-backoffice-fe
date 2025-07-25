import { Component, model } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'agl-login-account-dialog',
  imports: [Dialog, Button],
  templateUrl: './login-account-dialog.html',
  styleUrl: './login-account-dialog.css',
})
export class LoginAccountDialog {
  visible = model(false);
}
