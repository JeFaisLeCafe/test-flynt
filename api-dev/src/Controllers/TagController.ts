import { TagService } from "../Services/TagService";

export class TagController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const recipes = await TagService.list();
      res.send(recipes);
    } catch (err) {
      console.error("[TagController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await TagService.create(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[TagController.create] Error creating recipe", err);
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await TagService.update(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[TagController.update] Error updating recipe", err);
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await TagService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[TagController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}
