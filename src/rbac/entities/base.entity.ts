export enum TypeRbac {
  ROLE = 1,
  PERMISSION = 2,
}

export interface IBaseRbacEntity {
  readonly type: TypeRbac;
  id: number;
  name: string;
  description: string;
  slug: string;
}
