import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../db/entities/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { PPOBServiceEntity } from "../../ppobService/entities/PPOBService.entity";

@Entity({ name: "transaction" })
export class TransactionEntity extends BaseEntity {
  @PrimaryColumn({ type: "uuid", name: "invoice_number" })
  invoiceNumber: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", length: 50, name: "transaction_type" })
  transactionType: string;

  @Column({ type: "integer", name: "total_amount" })
  totalAmount: string;

  @Column({ type: "varchar", name: "user_id" })
  userId: string;

  @Column({ type: "varchar", name: "service_code_id", nullable: true })
  serviceCodeId: string;

  //relations
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.transaction, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "user_id" })
  user?: UserEntity;

  @ManyToOne(
    () => PPOBServiceEntity,
    (ppobServiceEntity) => ppobServiceEntity.transaction,
    {
      onDelete: "RESTRICT",
      nullable: true,
    }
  )
  @JoinColumn({ name: "service_code_id" })
  ppobService?: PPOBServiceEntity;
}
