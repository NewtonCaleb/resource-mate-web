import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, colorSchemeDarkBlue, RowClickedEvent, themeQuartz } from 'ag-grid-community';
import { ServicesService } from '@libs/features';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-service-list',
  imports: [AgGridAngular],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
})
export class ServiceListComponent {
  private readonly _router = inject(Router);
  private readonly _currentRoute = inject(ActivatedRoute);
  private readonly _servicesService = inject(ServicesService);

  theme = themeQuartz.withPart(colorSchemeDarkBlue);

  rowData = toSignal(this._servicesService.getAll());

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

  createNewService() {
    this._router.navigate(['new'], { relativeTo: this._currentRoute });
  }

  goToDetails(e: RowClickedEvent) {
    this._router.navigate([e.data['id']], { relativeTo: this._currentRoute });
  }
}
