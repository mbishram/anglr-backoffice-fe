import { Component, inject, OnDestroy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import {
  MISSING_IMAGE_SRC,
  MISSING_IMAGE_ALT,
  PLACEHOLDER_IMAGE_BASE64,
} from 'app/app.constant';
import { filter } from 'rxjs';

@Component({
  selector: 'agl-auth',
  imports: [NgOptimizedImage, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  protected readonly PLACEHOLDER_IMAGE_BASE64 = PLACEHOLDER_IMAGE_BASE64;

  protected imgSrc = signal<string>(MISSING_IMAGE_SRC);
  protected imgAlt = signal<string>(MISSING_IMAGE_ALT);

  private routerEvent$;

  constructor() {
    // Get initial image data
    this.setImageData();

    // Get image data after every route change
    this.routerEvent$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('_TST');
        this.setImageData();
      });
  }

  ngOnDestroy() {
    // Unsubscribe to router event after leaving /auth layout
    this.routerEvent$.unsubscribe();
  }

  private setImageData() {
    const { imgSrc, imgAlt } =
      this.activatedRoute.snapshot.firstChild?.data || {};
    if (imgSrc) this.imgSrc.set(imgSrc);
    if (imgAlt) this.imgAlt.set(imgAlt);
  }
}
