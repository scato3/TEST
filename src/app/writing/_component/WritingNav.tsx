"use client";

import Image from "next/image";

import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useUserDataContext } from "@/context/AuthContext";
import { useModal } from "@/hook/useModal";

import direction_left from "../../../../public/direction-left-md.svg";
import styles from "./writingNav.module.css";
import WritingQuestionModal from "./WritingQuestionModal";

export default function WritingNav({ title, children }: { title?: string; children: React.ReactNode }) {
  const { userInfo } = useUserDataContext();
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  const modalForm = {
    question: "작성을 중단할까요?",
    sign: "페이지를 나가면 되돌릴 수 없어요!",
    continueText: "계속 작성하기",
    cancelText: "중단하기",
    imageUrl: userInfo.imageType,
  };

  return (
    <nav className={styles.navbar}>
      <button className={styles.backPage} onClick={handleOpenMoal}>
        <Image src={direction_left} alt="뒤로 가기" width={24} height={24} />
      </button>
      <div className={styles.title}>{title}</div>
      {children}
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <WritingQuestionModal modalForm={modalForm} handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </nav>
  );
}
