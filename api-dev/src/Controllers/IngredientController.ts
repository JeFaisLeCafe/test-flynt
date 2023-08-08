import { IngredientService } from "../Services/IngredientService";

export class IngredientController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const ingredients = await IngredientService.list();
      res.send(ingredients);
    } catch (err) {
      console.error(
        "[IngredientController.list] Error listing ingredients",
        err
      );
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const ingredient = await IngredientService.create(req.body);
      res.send(ingredient);
    } catch (err) {
      console.error(
        "[IngredientController.create] Error creating ingredient",
        err
      );
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const ingredient = await IngredientService.update(req.body);
      res.send(ingredient);
    } catch (err) {
      console.error(
        "[IngredientController.update] Error updating ingredient",
        err
      );
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await IngredientService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error(
        "[IngredientController.delete] Error deleting ingredient",
        err
      );
      res.send(500);
    }
  }
}
