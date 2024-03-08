import { constant } from "@/utils/constant";

export const doVote = async (postId: number, userId: number, selectedOption: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(constant.apiUrl + "api/main/new/vote", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      postId,
      userId,
      voteId: postId,
      selectedOption,
    }),
  });
  const data = await res.json();
  return data;
};
