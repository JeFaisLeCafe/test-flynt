import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import { Ingredient } from "../Types/Ingredient";
import {
  useMutationIngredientDelete,
  useMutationIngredientUpdate
} from "../Hooks/Mutation/IngredientsMutation";
import { strToMuiColor } from "../Utils/strToMuiColor";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Tag } from "../Types/Tag";
import { useState } from "react";

export function IngredientTable({
  ingredients,
  tags
}: {
  ingredients: Ingredient[];
  tags: Tag[];
}): JSX.Element {
  const [selectedRow, setSelectedRow] = useState<Ingredient>();

  const handleClose = () => {
    setSelectedRow(undefined);
  };

  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();
  const { mutateAsync: updateIngredient } = useMutationIngredientUpdate();

  const handlerButtonDelete = async (ingredient: Ingredient) => {
    await deleteIngredient(ingredient.id);
  };

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

  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell>My ingredients</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={row.tag.name}
                    onDelete={() => setSelectedRow(row)}
                    deleteIcon={<ModeEditIcon fontSize="inherit" />}
                    color={strToMuiColor(row.tag.name)}
                  />
                </TableCell>
                <TableCell align="right">{row.price} €</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButtonDelete(row)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!!selectedRow && (
        <Dialog open={!!selectedRow} onClose={handleClose}>
          <DialogTitle>Change Ingredient Tag</DialogTitle>
          <DialogContent>
            <DialogContentText>
              By modifiying the tag of this ingredient, you might change the
              recipes associated with this ingredient.
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
      )}
    </Box>
  );
}
