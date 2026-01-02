import { User } from '@libs/shared';
import { ServiceType } from '../service-types/types';
import { Service } from '@libs/features';

export type ServiceSubType = {
  id: number;
  label: string;
  deleted: boolean;
  lastUpdatedAt: Date;
  createdAt: Date;

  serviceType: ServiceType;
  createdBy: User;
  lastUpdatedBy: User;

  services?: Service[];
};

export type ServiceSubTypeForm = {
  id?: number;
  label: string;
  serviceType: ServiceType;
};
