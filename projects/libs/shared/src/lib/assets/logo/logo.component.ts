import { Component, input } from '@angular/core';

@Component({
  selector: 'Logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  fillColor = input('var(--color-primary)');
}
