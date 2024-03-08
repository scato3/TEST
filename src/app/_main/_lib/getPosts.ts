import { IPost } from "@/modal/Post";
import { constant } from "@/utils/constant";

export const getPostList = async ({ pageParam, isLogin }: { pageParam: number; isLogin: number }) => {
  const token = localStorage.getItem("token");
  let res;
  if (isLogin === 1) {
    res = await fetch(constant.apiUrl + `api/main/posts?page=${pageParam}&size=10`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  } else {
    res = await fetch(constant.apiUrl + `api/main/posts?page=${pageParam}&size=10`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  const data = await res.json();

  return data;
};

export const getCategoryPostList = async ({
  pageParam,
  category,
  isLogin,
}: {
  pageParam: number;
  category: string;
  isLogin: number;
}) => {
  const token = localStorage.getItem("token");
  let categoryParams = category;
  if (category === "정치・경제") {
    categoryParams = "정치_경제";
  }
  let res;
  if (isLogin === 1) {
    res = await fetch(constant.apiUrl + `api/main/${categoryParams}?page=${pageParam}&size=10`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  } else {
    res = await fetch(constant.apiUrl + `api/main/${categoryParams}?page=${pageParam}&size=10`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  const data = await res.json();

  return data;
};

export const getOnePost = async (postId: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(constant.apiUrl + `api/main/posts/${postId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  const data: IPost = await res.json();
  console.log(data);
  return data;
};
