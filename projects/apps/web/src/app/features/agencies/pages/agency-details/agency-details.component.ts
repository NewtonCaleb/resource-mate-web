import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AgenciesService, Agency } from '@libs/features';
import { log } from 'console';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-agency-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './agency-details.component.html',
  styleUrl: './agency-details.component.css',
})
export class AgencyDetailsComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _agenciesService = inject(AgenciesService);

  agency = toSignal(this._agenciesService.getById(this._activatedRoute.snapshot.params['id']));
  loading = computed(() => this.agency === undefined);
}
