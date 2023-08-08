import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useMutationIngredientCreate = (): UseMutationResult<
  any,
  unknown,
  { name: string; price: number; tagId: number }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({
      name,
      price,
      tagId
    }: {
      name: string;
      price: number;
      tagId: number;
    }) => {
      return await axios.post(`/ingredient/create`, {
        name,
        price,
        tagId
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listRecipe);
        clientQuery.invalidateQueries(Requests.listIngredient);
      }
    }
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      }
    }
  );
};

export const useMutationIngredientUpdate = (): UseMutationResult<
  any,
  unknown,
  { id: number; name: string; price: number; tagId: number }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.updateIngredient],
    async ({
      id,
      name,
      price,
      tagId
    }: {
      id: number;
      name: string;
      price: number;
      tagId: number;
    }) => {
      return await axios.put(`/ingredient/update/${id}`, {
        id,
        name,
        price,
        tagId
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      }
    }
  );
};
