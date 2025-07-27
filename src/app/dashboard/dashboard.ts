import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { File } from 'app/file.model';
import { AccountService } from 'app/account/account.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';

@Component({
  selector: 'agl-dashboard',
  imports: [
    Menubar,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
    DatePipe,
    Button,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private accountService = inject(AccountService);
  private messageService = inject(MessageService);

  protected readonly PLACEHOLDER_IMAGE_BASE64 = File.PLACEHOLDER_IMAGE_BASE64;
  protected readonly today = new Date();
  // TODO: Menu item active is not working, look up how to fix them!
  protected readonly menus: MenuItem[] = [
    {
      label: 'Employees',
      icon: 'pi pi-briefcase',
      routerLink: '/employees',
    },
  ];

  protected readonly account = toSignal(
    this.accountService.fetchLoggedInAccount(),
  );
  protected readonly name = computed(() => this.account()?.name);

  protected logout() {
    this.accountService.logout();

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have successfully logged out!',
    });
  }
}
