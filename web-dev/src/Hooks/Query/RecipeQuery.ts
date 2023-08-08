import { useQuery } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";
import { Recipe } from "../../Types/Recipe";

export const useQueryListRecipe = () => {
  return useQuery([Requests.listRecipe], async () => {
    const { data } = await axios.get<Recipe[]>("/recipe/list");
    return data;
  });
};
