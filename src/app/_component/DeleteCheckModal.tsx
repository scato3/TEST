import Image from "next/image";

import styles from "./modal.module.css";

export default function DeleteCheckModal() {
  return (
    <div className={styles.DeleteModal}>
      <div className={styles.DeleteImageWrapper}>
        <Image src="/check-xxl.png" alt="check-xxl" width={72} height={72} />
      </div>
      <div className={styles.DeleteModalMessage}>
        <p>게시물을 삭제했어요</p>
      </div>
      <button className={styles.DeleteButton}>확인</button>
    </div>
  );
}
