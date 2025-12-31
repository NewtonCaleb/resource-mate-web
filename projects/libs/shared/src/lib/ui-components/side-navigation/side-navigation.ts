import { Component, inject, input, model, ModelSignal, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouteConfig } from './interfaces/route-config';
import { NavLink } from './components/nav-link/nav-link';

@Component({
  selector: 'shared-side-navigation',
  imports: [NavLink],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
})
export class SideNavigation {
  private readonly breakpointObserver$ = inject(BreakpointObserver);
  isExpanded: ModelSignal<boolean> = model(true);
  routes = input<RouteConfig[]>([]);

  ngOnInit(): void {
    this.breakpointObserver$.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe({
      next: (result) => {
        if (result.matches) {
          this.isExpanded.set(false);
        } else {
          this.isExpanded.set(true);
        }
      },
    });
  }
}
