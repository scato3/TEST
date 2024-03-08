import Image from "next/image";

import Button from "./Button";
import styles from "./modal.module.css";

interface IProps {
  handleCloseModal: () => void;
}

export default function DevelopModal({ handleCloseModal }: IProps) {
  return (
    <div className={styles.develop_modal}>
      <div className={styles.modalContent}>
        <div className={styles.develop_modal_title}>
          <p>열심히 개발 중이에요</p>
          <Image src="/Sunglass-Face-md.png" alt="Sunglass-Face" width={24} height={24} />
        </div>
        <div className={styles.goMainModalMessage}>
          <p>조금만 기다려주세요!</p>
        </div>
        <Button onClick={handleCloseModal} className={styles.develop_btn}>
          기대하고 있을게요
        </Button>
      </div>
    </div>
  );
}
