import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PPOBServiceEntity } from "../../ppobService/entities/ppobService.entity";
import { BaseEntity } from "../../db/entities/base.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity({ name: "transaction" })
export class TransactionEntity extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", name: "user_id" })
  userId: string;

  @Column({ type: "varchar", name: "service_code_id" })
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
    }
  )
  @JoinColumn({ name: "service_code_id" })
  ppobService?: PPOBServiceEntity;
}
