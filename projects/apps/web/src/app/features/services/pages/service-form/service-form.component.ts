import { Component, computed, inject, linkedSignal, OnInit, signal } from '@angular/core';
import {
  AgenciesService,
  Agency,
  PopulationTypesService,
  ServiceForm,
  ServicesService,
  ServiceSubTypesService,
  ServiceTypesService,
} from '@libs/features';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-service-form',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css',
})
export class ServiceFormComponent implements OnInit {
  private readonly _agenciesService = inject(AgenciesService);
  private readonly _servicesService = inject(ServicesService);
  private readonly _serviceTypesService = inject(ServiceTypesService);
  private readonly _serviceSubTypesService = inject(ServiceSubTypesService);
  private readonly _populationTypesService = inject(PopulationTypesService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  isNewForm = this._activatedRoute.snapshot.url[0].path === 'new';

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    streetAddress: new FormControl('', { validators: [Validators.required] }),
    city: new FormControl('', { validators: [Validators.required] }),
    state: new FormControl('', { validators: [Validators.required] }),
    agencyId: new FormControl('', { validators: [Validators.required] }),
    serviceTypeId: new FormControl('', { validators: [Validators.required] }),
    serviceSubTypeId: new FormControl(''),
    populationTypeId: new FormControl('', { validators: [Validators.required] }),
    zip: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required] }),
    phone: new FormControl(''),
    website: new FormControl(''),
    cost: new FormControl('', { validators: [Validators.required] }),
    requirements: new FormControl(''),
    description: new FormControl('', { validators: [Validators.required] }),
    extraNotes: new FormControl(''),
  });

  agencies = toSignal(this._agenciesService.getAll()) ?? [];
  serviceTypes = toSignal(this._serviceTypesService.getAll()) ?? [];
  populationTypes = toSignal(this._populationTypesService.getAll()) ?? [];

  serviceSubTypes = linkedSignal(() => {
    return (
      this.serviceTypes()?.find(
        (t) => t.id === parseInt(this.form.get('serviceTypeId')?.value ?? '')
      )?.serviceSubTypes ?? []
    );
  });

  ngOnInit(): void {
    if (!this.isNewForm) {
      lastValueFrom(this._servicesService.getById(this._activatedRoute.snapshot.params['id'])).then(
        (res) => {
          if (res === null) {
            this._router.navigate(['services']);
          }

          this.form.setValue({
            agencyId: res?.agency?.id.toString() ?? '0',
            serviceTypeId: res?.serviceType?.id.toString() ?? '0',
            serviceSubTypeId: res?.serviceSubType?.id.toString() ?? '0',
            populationTypeId: res?.populationType?.id.toString() ?? '0',
            name: res?.name ?? '',
            streetAddress: res?.streetAddress ?? '',
            city: res?.city ?? '',
            state: res?.state ?? '',
            zip: res?.zip ?? '',
            cost: res?.cost ?? '',
            email: res?.email ?? '',
            phone: res?.phone ?? '',
            website: res?.website ?? '',
            description: res?.description ?? '',
            requirements: res?.requirements ?? '',
            extraNotes: res?.extraNotes ?? '',
          });
        }
      );
    }
  }

  async submit() {
    // TODO:  Throw some error here
    if (!this.form.valid) return;

    const form = this.form.value as ServiceForm;
    try {
      if (!this.isNewForm) {
        form.id = this._activatedRoute.snapshot.params['id'];
        await lastValueFrom(this._servicesService.update(form));
        this._router.navigate(['..'], { relativeTo: this._activatedRoute });
      } else {
        const createdId = await lastValueFrom(this._servicesService.add(form));
        this._router.navigate(['agencies', createdId, 'details']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  serviceTypeChanged() {
    this.serviceSubTypes.set(
      this.serviceTypes()?.find(
        (t) => t.id === parseInt(this.form.get('serviceTypeId')?.value ?? '0')
      )?.serviceSubTypes ?? []
    );
  }
}
