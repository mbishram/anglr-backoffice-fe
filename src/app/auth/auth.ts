import { Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_IMAGE_ALT,
  PLACEHOLDER_IMAGE_BASE64,
} from 'app/app.constants';

@Component({
  selector: 'agl-auth',
  imports: [NgOptimizedImage, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  protected readonly PLACEHOLDER_IMAGE_BASE64 = PLACEHOLDER_IMAGE_BASE64;

  protected imgSrc = signal<string>(PLACEHOLDER_IMAGE);
  protected imgAlt = signal<string>(PLACEHOLDER_IMAGE_ALT);

  constructor() {
    const activatedRoute = inject(ActivatedRoute);

    const imgSrc = activatedRoute.snapshot.firstChild?.data?.['imgSrc'];
    if (imgSrc) this.imgSrc.set(imgSrc);

    const imgAlt = activatedRoute.snapshot.firstChild?.data?.['imgAlt'];
    if (imgAlt) this.imgAlt.set(imgAlt);
  }
}
