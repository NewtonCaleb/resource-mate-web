import { User } from '@libs/shared';
import { Agency } from '../agencies/types';
import { ServiceType } from '../service-types/types';
import { ServiceSubType } from '../service-sub-types/types';
import { PopulationType } from '../population-types/types';

export type Service = {
  id: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone?: string;
  website?: string;
  cost: string;
  requirements?: string;
  description?: string;
  extraNotes?: string;
  deleted: boolean;
  lastUpdatedAt: Date;
  createdAt: Date;

  // FK
  createdBy?: User;

  lastUpdatedBy?: User;

  agency?: Agency;

  serviceType: ServiceType;
  serviceSubType?: ServiceSubType;
  populationType: PopulationType;
};

export type ServiceForm = {
  id?: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone?: string;
  website?: string;
  cost: string;
  requirements?: string;
  description?: string;
  extraNotes?: string;
};
