import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { userImgUrl } from "@/utils/userImgUrl";

import styles from "../../_component/modal.module.css";

interface QuestionModalProps {
  handleCloseModal: () => void;
  modalForm: {
    question: string;
    sign: string;
    continueText: string;
    cancelText: string;
    imageUrl: number;
  };
  className?: string;
}

export default function WritingQuestionModal({ modalForm, handleCloseModal }: QuestionModalProps) {
  const router = useRouter();

  const handleContinue = () => {
    handleCloseModal();
  };

  const handleCancel = () => {
    try {
      handleCloseModal();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const { question, sign, continueText, cancelText, imageUrl } = modalForm;

  return (
    <div className={styles.questionModal}>
      <div className={styles.modalContent}>
        <div className={styles.questionModalContent}>
          <p>{question}</p>
          <Image src={userImgUrl(imageUrl)} alt="유저 이미지" width={24} height={24} />
        </div>
        <div className={styles.signModalContent}>
          <p>{sign}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttonContainer}>
          <button className={styles.questionButton} onClick={handleContinue}>
            <span>{continueText}</span>
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            <span>{cancelText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
