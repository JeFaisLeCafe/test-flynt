import { useQuery } from "react-query";
import { Ingredient } from "../../Types/Ingredient";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useQueryIngredientList = () => {
  return useQuery([Requests.listIngredient], async () => {
    const { data } = await axios.get<Ingredient[]>("/ingredient/list");
    return data;
  });
};
