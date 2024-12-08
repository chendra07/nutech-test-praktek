import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { FileEntity } from "../../file/entities/file.entity";
import { BaseEntity } from "../../db/entities/base.entity";
import { TransactionEntity } from "../../transaction/entities/transaction.entity";

@Entity({ name: "ppob_service" })
export class PPOBServiceEntity extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 30, name: "service_code" })
  serviceCode: string;

  @Column({ type: "varchar", name: "service_name" })
  serviceName: string;

  @Column({ type: "varchar", name: "service_tariff" })
  serviceTariff: string;

  @Column({ type: "varchar", name: "file_id" })
  fileId: string;

  //relations
  @OneToOne(() => FileEntity, (fileEntity) => fileEntity.ppobService, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "file_id" })
  file?: FileEntity;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.ppobService
  )
  transaction?: TransactionEntity[];
}
