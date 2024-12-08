import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../db/entities/base.entity";
import { FileEntity } from "../../file/entities/file.entity";

@Entity({ name: "banner" })
export class BannerEntity extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 255, name: "banner_name" })
  bannerName: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", name: "file_id" })
  fileId: string;

  //relations
  @OneToOne(() => FileEntity, (fileEntity) => fileEntity.banner, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "file_id" })
  file?: FileEntity;
}
