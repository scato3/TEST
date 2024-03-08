import Image from "next/image";

import styles from "./modal.module.css";

export default function PopupLoginModal() {
  return (
    <div className={styles.popupLoginModal}>
      <div className={styles.curiousWrapper}>
        <div className={styles.curiousMessage}>
          <p>궁금한 것을 물어보세요</p>
        </div>
        <div className={styles.curiousImage}>
          <Image src="/image8.png" alt="Page 1" width={24} height={24} />
        </div>
      </div>
      <button className={styles.curiousButton}>로그인하고 질문하기</button>
      <div className={styles.curiousXImage}>
        <Image src="/image9.png" alt="Page 1" width={24} height={24} />
      </div>
    </div>
  );
}
