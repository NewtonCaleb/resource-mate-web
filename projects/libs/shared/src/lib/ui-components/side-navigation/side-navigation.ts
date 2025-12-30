import { Component, inject, input, model, ModelSignal, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavLink, RouteConfig } from './components/nav-link/nav-link';

@Component({
  selector: 'shared-side-navigation',
  imports: [NavLink],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
})
export class SideNavigation {
  private readonly breakpointObserver$ = inject(BreakpointObserver);
  isExpanded: ModelSignal<boolean> = model(true);
  protected routes = input<RouteConfig[]>([
    {
      id: 1,
      url: '/',
      icon: 'bi-house-door',
      label: 'Homepage',
    },
    {
      id: 2,
      url: '/test',
      icon: 'bi-house-door-fill',
      label: 'Test',
    },
  ]);

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
