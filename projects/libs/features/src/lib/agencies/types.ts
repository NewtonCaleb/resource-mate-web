import { Service } from '@libs/features';
import { User } from '@libs/shared';

export type Agency = {
  id: number;
  name: string;
  city: string;
  state: string;
  zip?: string;
  email: string;
  phone?: string;
  website?: string;
  description?: string;
  deleted: boolean;
  lastUpdatedAt?: Date;
  createdAt?: Date;

  // FK
  lastUpdatedBy: User;
  createdBy: User;

  // Children
  services: Service[];
};

export type AgencyForm = {
  id?: number;
  name?: string;
  city?: string;
  state?: string;
  zip?: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
};
