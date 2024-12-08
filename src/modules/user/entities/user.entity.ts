import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { BaseEntity } from "../../db/entities/base.entity";
import { FileEntity } from "../../file/entities/file.entity";
import { TransactionEntity } from "../../transaction/entities/transaction.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: "uuid", unique: true })
  id: string;

  @Column({ type: "varchar", length: 255, name: "email", unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, name: "password" })
  password: string;

  @Column({ type: "varchar", length: 255, name: "first_name" })
  firstName: string;

  @Column({ type: "varchar", length: 255, name: "last_name" })
  lastName: string;

  @Column({ type: "integer", name: "amount", default: 0 })
  amount: string;

  @Column({ type: "varchar", name: "file_id", nullable: true })
  fileId?: string; //profile picture

  //relations
  @OneToOne(() => FileEntity, (fileEntity) => fileEntity.user, {
    nullable: true,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "file_id" })
  file?: FileEntity;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.user
  )
  transaction?: TransactionEntity[];
}
