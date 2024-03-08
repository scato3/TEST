"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import LoginModal from "@/app/_component/LoginModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useUserDataContext } from "@/context/AuthContext";
import { useModal } from "@/hook/useModal";

import styles from "./writeFloating.module.css";
export default function WriteFloating() {
  const router = useRouter();
  const { userInfo } = useUserDataContext();
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  const handleClick = () => {
    if (userInfo.isLogin === 1) {
      router.push("/writing");
    } else {
      handleOpenMoal();
    }
  };
  // href={"/writing"}
  return (
    <>
      <button onClick={handleClick} className={styles.floating}>
        <Image src="/image11.png" alt="게시글 작성하기 버튼" width={52} height={52} />
      </button>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <LoginModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </>
  );
}
