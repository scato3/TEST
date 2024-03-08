import Image from "next/image";

import { userImgUrl } from "@/utils/userImgUrl";

import styles from "./modal.module.css";

interface QuestionModalProps {
  modalForm: {
    question: string;
    sign: string;
    continueText: string;
    cancelText: string;
    imageUrl: number;
  };
  className?: string;
}

export default function QuestionModal({ modalForm }: QuestionModalProps) {
  const { question, sign, continueText, cancelText, imageUrl } = modalForm;
  return (
    <div className={styles.questionModal}>
      <div className={styles.modalContent}>
        <div className={styles.questionModalContent}>
          <p>{question}</p>
          <Image src={userImgUrl(imageUrl)} alt="Tear-face" width={24} height={24} />
        </div>
        <div className={styles.signModalContent}>
          <p>{sign}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttonContainer}>
          <button className={styles.questionButton}>
            <span>{continueText}</span>
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton}>
            <span>{cancelText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
