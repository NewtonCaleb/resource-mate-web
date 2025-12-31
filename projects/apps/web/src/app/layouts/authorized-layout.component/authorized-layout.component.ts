import { Component, inject, model, OnInit } from '@angular/core';
import { Header } from '@libs/shared';
import { SideNavigation, RouteConfig } from '@libs/shared';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authorized-layout.component',
  imports: [RouterOutlet, Header, SideNavigation],
  templateUrl: './authorized-layout.component.html',
  styleUrl: './authorized-layout.component.css',
})
export class AuthorizedLayoutComponent {
  sideNavExpandState = model(true);

  sideNavigationConfig: RouteConfig[] = [
    {
      id: 1,
      url: '',
      icon: ' bi bi-house-fill text-xl',
      label: 'Home',
    },
    {
      id: 2,
      url: 'agencies',
      icon: 'bi bi-building-fill text-xl',
      label: 'Agencies',
    },
    {
      id: 3,
      url: 'services',
      icon: 'bi bi-people-fill text-xl',
      label: 'Services',
    },
  ];
}
