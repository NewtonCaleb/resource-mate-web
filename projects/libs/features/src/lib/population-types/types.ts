import { Service } from '@libs/features';
import { User } from '@libs/shared';

export type PopulationType = {
  id: number;
  label: string;

  deleted: boolean;
  lastUpdatedAt: Date;
  createdAt: Date;

  createdBy: User;
  lastUpdatedBy: User;

  services?: Service[];
};

export type PopulationTypeForm = {
  id?: number;
  label: string;
};
