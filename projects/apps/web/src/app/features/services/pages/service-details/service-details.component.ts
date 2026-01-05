import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '@libs/features';

@Component({
  selector: 'app-service-details',
  imports: [DatePipe],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css',
})
export class ServiceDetailsComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _servicesService = inject(ServicesService);

  service = toSignal(this._servicesService.getById(this._activatedRoute.snapshot.params['id']));
  loading = computed(() => this.service === undefined);
}
