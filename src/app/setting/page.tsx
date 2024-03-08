"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useUserDataContext } from "@/context/AuthContext";

import directon_right from "../../../public/direction-right-md.svg";
import SettingNav from "./_component/SettingNav";
import styles from "./setting.module.css";

export default function Page() {
  const router = useRouter();

  const { userInfo } = useUserDataContext();

  const handleLogoutBtn = () => {
    localStorage.removeItem("token");
    userInfo.isLogin = 2;
    router.push("/");
  };

  return (
    <>
      {userInfo.isLogin === 1 ? (
        <>
          <SettingNav title={"Setting"} />
          <div className={styles.settingContainer}>
            <div className={styles.changeBirthContainer}>
              <div className={styles.changeBirth}>
                <span>출생 연도 변경</span>
              </div>
              <Image src={directon_right} alt="출생 연도 변경 이미지" width={24} height={24} />
            </div>
            <div className={styles.userActionsContainer}>
              <button className={styles.logoutBtn} onClick={handleLogoutBtn}>
                로그아웃
              </button>
              <button className={styles.deleteBtn}>회원탈퇴</button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
