import { ICategoryEntity } from 'src/category/entities/category.entity';
import { BasePgEntity } from '../basePg.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryPgEntity extends BasePgEntity implements ICategoryEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  slug: string;

  @Column({ type: 'int', nullable: true })
  order: number;

  @ManyToOne(() => CategoryPgEntity, (parent) => parent.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: CategoryPgEntity;

  @OneToMany(() => CategoryPgEntity, (child) => child.parent)
  children?: CategoryPgEntity[];
}
