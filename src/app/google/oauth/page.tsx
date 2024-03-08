"use client";

import { useEffect } from "react";

export default function MyComponent() {
  useEffect(() => {
    // URL에서 코드 값을 가져오기
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      // 코드 값이 존재할 때의 처리
      console.log("Received code:", code);
      void fetch("http://52.78.127.145:8080/login/oauth2/code/google?code=" + code, {
        method: "GET",
        // headers: {
        //   Accept: "application/json",
        // },
        // credentials: "include",
      });
      // 여기에서 코드 값을 사용하여 다른 작업을 수행할 수 있습니다.
    } else {
      console.error("No code found in the URL");
    }
  }, []); // 한 번만 실행되도록 useEffect의 두 번째 매개변수로 빈 배열을 전달합니다.

  return <div>hi</div>;
}
