import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  SelectChangeEvent
} from "@mui/material";
import { Tag } from "../Types/Tag";
import { useQueryListRecipe } from "../Hooks/Query/RecipeQuery";
import { useMutationIngredientUpdate } from "../Hooks/Mutation/IngredientsMutation";
import { Ingredient } from "../Types/Ingredient";

interface ModalModifyTagProps {
  selectedRow: Ingredient;
  setSelectedRow: React.Dispatch<React.SetStateAction<Ingredient | undefined>>;
  tags: Tag[];
  ingredients: Ingredient[];
}

export const ModalModifyTag = ({
  selectedRow,
  setSelectedRow,
  tags,
  ingredients
}: ModalModifyTagProps) => {
  const { data: recipes, isLoading } = useQueryListRecipe();

  const { mutateAsync: updateIngredient } = useMutationIngredientUpdate();

  const handleModifyIngredient = async () => {
    if (!selectedRow) return;
    await updateIngredient({
      id: selectedRow.id,
      name: selectedRow.name,
      price: selectedRow.price,
      tagId: selectedRow.tag.id
    });

    setSelectedRow(undefined);
  };

  const handleSelect = (e: SelectChangeEvent<number>) => {
    const newIngredient = {
      ...selectedRow,
      tag: {
        id: e.target.value as number,
        name: tags.find((t) => t.id === e.target.value)?.name ?? ""
      }
    };
    setSelectedRow(newIngredient as Ingredient);
  };

  const handleClose = () => {
    setSelectedRow(undefined);
  };

  const relatedRecipes =
    recipes?.filter((r) =>
      r.ingredients.find((i) => i.id === selectedRow?.id)
    ) ?? [];

  return (
    <Dialog open={!!selectedRow} onClose={handleClose}>
      <DialogTitle>Change Ingredient Tag</DialogTitle>
      <DialogContent>
        <DialogContentText>
          By modifiying the tag of this ingredient, you might change the recipes
          associated with this ingredient. Here is the list of recipes that
          might be impacted:
          {isLoading && <p>Loading...</p>}
          {relatedRecipes?.length > 0 && !isLoading ? (
            relatedRecipes.map((r) => (
              <Chip color="warning" key={r.id} label={r.name} />
            ))
          ) : (
            <p>No recipes are impacted</p>
          )}
        </DialogContentText>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="tag">Tag</InputLabel>
          <Select
            variant="outlined"
            labelId="tag"
            id="name-tag"
            value={selectedRow?.tag.id}
            label="Tag"
            onChange={handleSelect}
          >
            {tags?.map((t: Tag) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleModifyIngredient}
          disabled={
            selectedRow.tag.id ===
            ingredients.find((i) => i.id === selectedRow.id)?.tag.id
          }
        >
          Modify
        </Button>
      </DialogActions>
    </Dialog>
  );
};
