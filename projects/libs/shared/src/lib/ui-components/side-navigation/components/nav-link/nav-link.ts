import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'shared-nav-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.css',
})
export class NavLink {
  route = input<RouteConfig>({
    id: 1,
    url: '/',
    icon: 'bi-house-door',
    label: 'Dashboard',
  });
}

export interface RouteConfig {
  id: number;
  url: string;
  icon: string;
  label: string;
  active?: boolean;
}
