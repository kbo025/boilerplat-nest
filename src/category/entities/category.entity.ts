export interface ICategoryEntity {
  id: number;
  name: string;
  description: string;
  slug: string;
  order: number;

  parent?: ICategoryEntity;
  childrens?: ICategoryEntity[];
}
