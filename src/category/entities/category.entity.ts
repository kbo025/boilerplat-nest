export class CategoryEntity {
  id: string;
  name: string;
  description: string;
  slug: string;
  order: number;

  childs: CategoryEntity[];
}
