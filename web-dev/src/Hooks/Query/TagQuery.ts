import { useQuery, UseQueryResult } from "react-query";
import { Tag } from "../../Types/Tag";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useQueryTagList = (): UseQueryResult<any, unknown> => {
  return useQuery([Requests.listTag], async () => {
    const { data } = await axios.get<{ data: Tag[] }>("/tag/list");
    return data;
  });
};
