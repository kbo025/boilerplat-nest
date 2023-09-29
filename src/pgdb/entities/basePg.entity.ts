import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class BasePgEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: true,
  })
  active!: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => null,
  })
  updateAt?: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    default: () => null,
  })
  deletedAt?: Date;
}
