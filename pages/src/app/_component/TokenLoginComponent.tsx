"use client";
import React, { useEffect } from "react";

import { useUserDataContext } from "@/context/AuthContext";
import { constant } from "@/utils/constant";

import { ILogin } from "../login/_component/LoginForm";

export default function TokenLoginComponent() {
  const { setUserData } = useUserDataContext();
  let token: string | null = null;
  if (typeof window !== "undefined") {
    // Client-side-only code
    token = localStorage.getItem("token");
  }

  const tokenLogin = async () => {
    if (!token) {
      setUserData({
        email: "",
        jwtToken: {
          accessToken: "",
          refreshToken: "",
        },
        nickname: "",
        userId: 0,
        isLogin: 2,
        imageType: 0,
      });
      return;
    }
    const res = await fetch(constant.apiUrl + "api/user/login/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${token}`,
      },
    });
    const data: ILogin = await res.json();
    if (data.jwtToken) {
      setUserData({
        ...data,
        isLogin: 1,
      });
    } else {
      setUserData({
        ...data,
        isLogin: 2,
      });
    }
  };
  useEffect(() => {
    void tokenLogin();
  }, []);
  return <></>;
}
