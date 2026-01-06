import { DatePipe, Location } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AgenciesService, Agency } from '@libs/features';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, colorSchemeDarkBlue, RowClickedEvent, themeQuartz } from 'ag-grid-community';
import { log } from 'console';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-agency-details',
  imports: [AgGridAngular, RouterLink, DatePipe],
  templateUrl: './agency-details.component.html',
  styleUrl: './agency-details.component.css',
})
export class AgencyDetailsComponent {
  private readonly _location = inject(Location);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _agenciesService = inject(AgenciesService);

  agency = toSignal(this._agenciesService.getById(this._activatedRoute.snapshot.params['id']));
  loading = computed(() => this.agency === undefined);

  theme = themeQuartz.withPart(colorSchemeDarkBlue);
  rowData = computed(() => this.agency()?.services || []);

  colDefs: ColDef[] = [
    {
      field: 'id',
    },
    {
      field: 'name',
      flex: 1,
    },
  ];

  goToService(e: RowClickedEvent) {
    this._router.navigate(['services', e.data.id]);
  }

  goBack() {
    this._location.back();
  }
}
