export class BaseRbacEntity {
  protected static type: number;
  id: string;
  name: string;
  description: string;
  parentId: number;
  slug: string;
}
