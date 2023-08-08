import { Router } from "express";
import { IngredientController } from "../Controllers/IngredientController";
import { RecipeController } from "../Controllers/RecipeController";
import { ShoppingListController } from "../Controllers/ShoppingListController";
import { TagController } from "../Controllers/TagController";

// GLOBAL ROUTER
const routes = Router();

// RECIPES
const recipeRouter = Router();
recipeRouter.get("/list", RecipeController.list);
recipeRouter.post("/create", RecipeController.create);
recipeRouter.put("/update", RecipeController.update);
recipeRouter.delete("/delete/:id", RecipeController.delete);

// INGREDIENTS
const ingredientRouter = Router();
ingredientRouter.get("/list", IngredientController.list);
ingredientRouter.post("/create", IngredientController.create);
ingredientRouter.put("/update/:id", IngredientController.update);
ingredientRouter.delete("/delete/:id", IngredientController.delete);

// SHOPPING LIST
const shoppingListRouter = Router();
shoppingListRouter.get("/list/:id", ShoppingListController.getOne);
shoppingListRouter.get("/list", ShoppingListController.list);
shoppingListRouter.post("/create", ShoppingListController.create);
shoppingListRouter.put("/update", ShoppingListController.update);
shoppingListRouter.delete("/delete/:id", ShoppingListController.delete);

// TAGS
const tagRouter = Router();
tagRouter.get("/list", TagController.list);
tagRouter.post("/create", TagController.create);
tagRouter.put("/update/:id", TagController.update);
tagRouter.delete("/delete/:id", TagController.delete);

// BINDS
routes.use("/recipe", recipeRouter);
routes.use("/ingredient", ingredientRouter);
routes.use("/shopping-list", shoppingListRouter);
routes.use("/tag", tagRouter);

export default routes;
