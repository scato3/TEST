import Image from "next/image";

import styles from "./modal.module.css";

export default function GoHomeModal() {
  return (
    <div className={styles.goHomeModal}>
      <div className={styles.goHomeImageWrapper}>
        <Image src="/go-home.png" alt="go-home-image" width={127} height={115} />
      </div>
      <div className={styles.modalContent}>
        <div className={styles.goHomeModalMessage}>
          <p>반가워요!</p>
        </div>
        <div className={styles.goMainModalMessage}>
          <p>밸런스 보드를 둘러볼까요?</p>
        </div>
        <button className={styles.CheckButton}>확인</button>
      </div>
    </div>
  );
}
