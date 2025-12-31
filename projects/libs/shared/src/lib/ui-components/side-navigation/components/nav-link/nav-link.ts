import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouteConfig } from '../../interfaces/route-config';

@Component({
  selector: 'shared-nav-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.css',
})
export class NavLink {
  route = input<RouteConfig>({
    id: -1,
    url: '',
    icon: '',
    label: 'Unpopulate NavLink',
  });
}
