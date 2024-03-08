import { constant } from "@/utils/constant";

import { IPostPostData } from "../page";

export const getProfilePostData = async (userId: number, listType: number, pageParam: number = 1) => {
  const res = await fetch(constant.apiUrl + `api/user/profile/${userId}/posts?listType=${listType}&page=${pageParam}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const profileData: IPostPostData = await res.json();
  return profileData;
};
