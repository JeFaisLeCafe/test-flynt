import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Chip } from "@mui/material";
import { Ingredient } from "../Types/Ingredient";
import { useMutationIngredientDelete } from "../Hooks/Mutation/IngredientsMutation";
import { strToMuiColor } from "../Utils/strToMuiColor";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Tag } from "../Types/Tag";
import { useState } from "react";
import { ModalModifyTag } from "../Components/ModalModifyTag";

export function IngredientTable({
  ingredients,
  tags
}: {
  ingredients: Ingredient[];
  tags: Tag[];
}): JSX.Element {
  const [selectedRow, setSelectedRow] = useState<Ingredient>();

  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();

  const handlerButtonDelete = async (ingredient: Ingredient) => {
    await deleteIngredient(ingredient.id);
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
        <ModalModifyTag
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          tags={tags}
          ingredients={ingredients}
        />
      )}
    </Box>
  );
}
