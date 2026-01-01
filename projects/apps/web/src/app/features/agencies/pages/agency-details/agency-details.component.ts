import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
export class AgencyDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _agenciesService = inject(AgenciesService);

  agency = signal<Agency | null>(null);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    lastValueFrom(this._agenciesService.getById(this._activatedRoute.snapshot.params['id']))
      .then((res) => {
        this.agency.set(res);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
