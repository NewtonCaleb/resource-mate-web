import { Service } from '@libs/features';
import { User } from '@libs/shared';

export type ServiceType = {
  id: number;
  label: string;
  deleted: boolean;
  lastUpdatedAt: Date;
  createdAt: Date;
  createdBy: User;
  lastUpdatedBy: User;
  serviceSubTypes?: ServiceType[];
  services?: Service[];
};

export type ServiceTypeForm = {
  id?: number;
  label: string;
};
