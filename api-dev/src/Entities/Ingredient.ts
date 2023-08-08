import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Tag } from "./Tag";
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  tagId: number;

  @ManyToOne(() => Tag, (tag) => tag.id)
  tag: Tag;
}
