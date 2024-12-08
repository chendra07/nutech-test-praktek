import { Column, PrimaryColumn, Entity } from "typeorm";

@Entity({ name: "seeder" })
export class SeederEntity {
  @PrimaryColumn({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "int" })
  date: number;
}
