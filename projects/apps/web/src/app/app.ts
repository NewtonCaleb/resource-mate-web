import { Component, inject, model, OnInit } from '@angular/core';
import { Header } from '@libs/shared';
import { SideNavigation } from '@libs/shared';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SideNavigation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sideNavExpandState = model(true);
}
