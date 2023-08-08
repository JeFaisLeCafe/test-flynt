import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { Loader } from "../Components/Loader";
import { ErrorPage } from "./ErrorPage";
import { IngredientTable } from "../Tables/IngredientsTable";
import { CreateIngredientForm } from "../Forms/CreateIngredientForm";
import { useQueryTagList } from "../Hooks/Query/TagQuery";

export function IngredientPage(): JSX.Element {
  const [isCreationMode, setIsCreationMode] = useState(false);

  const activeCreationMode = () => {
    setIsCreationMode(true);
  };

  const cancelCreationMode = () => {
    setIsCreationMode(false);
  };

  const { data, status, isLoading } = useQueryIngredientList();
  const {
    data: tags,
    isLoading: isTagsLoading,
    status: tagsStatus
  } = useQueryTagList();

  if (status === "error" || tagsStatus === "error") {
    return <ErrorPage />;
  }
  if (isLoading || isTagsLoading) {
    return <Loader />;
  }

  return (
    <div id="recipes-pages">
      <h1>INGREDIENTS</h1>
      <Box>
        <Button
          onClick={isCreationMode ? cancelCreationMode : activeCreationMode}
          variant="outlined"
        >
          {isCreationMode ? "Cancel creation" : "Create new ingredient"}
        </Button>
      </Box>
      <Box display={"flex"} gap={2}>
        {isCreationMode && <CreateIngredientForm tags={tags} />}
        <IngredientTable ingredients={data} tags={tags} />
      </Box>
    </div>
  );
}
