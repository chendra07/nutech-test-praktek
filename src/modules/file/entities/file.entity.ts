import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { FileSourceEnum } from "../enums/file.enum";
import { UserEntity } from "../../user/entities/user.entity";
import { BannerEntity } from "../../banner/entities/banner.entity";
import { BaseEntity } from "../../db/entities/base.entity";
import { PPOBServiceEntity } from "../../ppobService/entities/PPOBService.entity";

@Entity({ name: "file" })
export class FileEntity extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 500 })
  path: string;

  @Column({ type: "varchar", length: 20 })
  source: `${FileSourceEnum}`; //services like: AWS/localhost/cloudinary/etc...

  @Column({ type: "varchar", length: 50, name: "original_name" })
  originalName: string;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.file)
  user: UserEntity;

  @OneToOne(() => BannerEntity, (bannerEntity) => bannerEntity.file)
  banner: BannerEntity;

  @OneToOne(
    () => PPOBServiceEntity,
    (PPOBServiceEntity) => PPOBServiceEntity.file
  )
  ppobService: PPOBServiceEntity;
}
