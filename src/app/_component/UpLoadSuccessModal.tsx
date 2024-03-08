import Image from "next/image";

import styles from "./modal.module.css";

export default function UpLoadSuccessModal() {
  return (
    <div className={styles.upLoadModal}>
      <div className={styles.upLoadImageWrapper}>
        <Image src="/upload-success.png" alt="upload-success-image" width={250} height={184} />
      </div>
      <div className={styles.modalContent}>
        <div className={styles.upLoadMessage}>
          <p>업로드 성공!</p>
        </div>
        <div className={styles.waitResultMessage}>
          <p>투표 결과를 기다려볼까요?</p>
        </div>
        <button className={styles.CheckButton}>확인</button>
      </div>
    </div>
  );
}
