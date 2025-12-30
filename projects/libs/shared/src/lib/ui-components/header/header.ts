import { Component, input, model } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  sideNavExpanded = model(true);
  logo = input('');
}
