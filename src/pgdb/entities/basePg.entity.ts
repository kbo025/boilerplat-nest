import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BasePgEntity {
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
  })
  updateAt!: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deletedAt?: Date;
}
