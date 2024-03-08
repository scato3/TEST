import { useQuery } from "@tanstack/react-query";

import { getProfilePostData } from "../_lib/getProfilePostData";
import { IPostPostData } from "../page";

export const useQueryGetProfilePostData = (userId: number) => {
  const { data, isLoading } = useQuery<IPostPostData>({
    queryKey: ["profile", "post", userId, 1, "count"],
    queryFn: () => {
      return getProfilePostData(userId, 1);
    },
  });

  return {
    data,
    isLoading,
  };
};
