export type User = {
  id: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  createdBy?: User;
  createdAt?: Date;
  lastUpdatedBy?: User;
  lastUpdatedAt?: Date;
  deleted?: boolean;
};
