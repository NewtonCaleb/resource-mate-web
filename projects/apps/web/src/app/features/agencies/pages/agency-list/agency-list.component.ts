import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenciesService, Agency } from '@libs/features';
import { AgGridAngular } from 'ag-grid-angular';
import { colorSchemeDark, colorSchemeDarkBlue, themeQuartz } from 'ag-grid-community';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-agency-list',
  imports: [AgGridAngular],
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.css',
})
export class AgencyListComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _currentRoute = inject(ActivatedRoute);
  private readonly _agenciesService = inject(AgenciesService);

  theme = themeQuartz.withPart(colorSchemeDarkBlue);

  rowData = toSignal(this._agenciesService.getAll());
  colDefs: ColDef[] = [
    {
      field: 'id',
    },
    {
      field: 'name',
      flex: 1,
    },
  ];

  ngOnInit(): void {}

  createNewAgency() {
    this._router.navigate(['new'], { relativeTo: this._currentRoute });
  }

  goToDetails(e: RowClickedEvent) {
    this._router.navigate([e.data['id']], { relativeTo: this._currentRoute });
  }
}
