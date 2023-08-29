export interface IBaseRbacEntity {
  readonly type: 1 | 2;
  id: number;
  name: string;
  description: string;
  slug: string;

  parent: IBaseRbacEntity | null;
  children: IBaseRbacEntity[] | null;
}
