import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
  @CreateDateColumn({ type: "timestamp with time zone", name: "created_on" })
  createdOn: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_on" })
  updatedOn: Date;

  @DeleteDateColumn({
    type: "timestamp with time zone",
    nullable: true,
    name: "deleted_on",
  })
  deletedOn?: Date;
}
