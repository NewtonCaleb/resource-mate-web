import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenciesService, AgencyForm } from '@libs/features';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-agency-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './agency-form.component.html',
  styleUrl: './agency-form.component.css',
})
export class AgencyFormComponent implements OnInit {
  private readonly _agneciesService = inject(AgenciesService);
  private readonly _currentRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  isNewForm = this._currentRoute.snapshot.params['id'] === '0';

  agencyForm = new FormGroup({
    name: new FormControl('', { validators: this.isNewForm ? Validators.required : null }),
    city: new FormControl('', { validators: this.isNewForm ? Validators.required : null }),
    state: new FormControl('', { validators: this.isNewForm ? Validators.required : null }),
    zip: new FormControl('', { validators: this.isNewForm ? Validators.required : null }),
    email: new FormControl('', { validators: this.isNewForm ? Validators.required : null }),
    phone: new FormControl(''),
    website: new FormControl(''),
  });

  ngOnInit(): void {
    if (!this.isNewForm) {
      lastValueFrom(this._agneciesService.getById(this._currentRoute.snapshot.params['id'])).then(
        (res) => {
          if (res === null) {
            this._router.navigate(['agencies']);
          }

          this.agencyForm.setValue({
            name: res?.name ?? '',
            city: res?.city ?? '',
            state: res?.state ?? '',
            zip: res?.zip ?? '',
            email: res?.email ?? '',
            phone: res?.phone ?? '',
            website: res?.website ?? '',
          });
        }
      );
    }
  }

  async submit() {
    // TODO:  Throw some error here
    // if (!this.agencyForm.valid) return;

    const form = this.agencyForm.value as AgencyForm;
    try {
      const createdId = await lastValueFrom(this._agneciesService.add(form));
      this._router.navigate(['agencies', createdId, 'details']);
    } catch (error) {
      // TODO:  Throw some error here
      console.log(error);
    }
  }
}
