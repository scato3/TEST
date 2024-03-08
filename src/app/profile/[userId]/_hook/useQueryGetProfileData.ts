import { useQuery } from "@tanstack/react-query";

import { getProfileData } from "../_lib/getProfileData";
import { IProfileData } from "../page";

export const useQueryGetProfileData = (userId: number) => {
  const { data, isLoading } = useQuery<IProfileData>({
    queryKey: ["profile", userId],
    queryFn: () => {
      return getProfileData(userId);
    },
  });

  return {
    data,
    isLoading,
  };
};
