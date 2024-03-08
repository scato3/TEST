import { constant } from "@/utils/constant";

export const getProfileData = async (userId: number) => {
  const res = await fetch(constant.apiUrl + `api/user/profile/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const profileData = await res.json();
  return profileData;
};
