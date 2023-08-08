import { getRepository } from "typeorm";
import { Tag } from "../Entities/Tag";

export class TagService {
  static async list(): Promise<Tag[]> {
    const tag = await getRepository(Tag).find();
    return tag;
  }

  static async create(tag: Tag): Promise<Tag> {
    const newTag = await getRepository(Tag).save(tag);
    return newTag;
  }

  static async update(tag: Tag): Promise<Tag> {
    const updatedTag = await getRepository(Tag).save(tag);
    return updatedTag;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Tag).delete(id);
  }
}
