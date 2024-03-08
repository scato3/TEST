import Image from "next/image";

import Button from "./Button";
import styles from "./modal.module.css";

interface IProps {
  handleCloseModal: () => void;
}

export default function JoinCompleteModal({ handleCloseModal }: IProps) {
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.loginModal} onClick={handleStopPropagation}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <Image src="/party.png" alt="회원가입 축하 모달" width={166} height={150} />
        </div>
        <div className={styles.easyloginMessage}>
          <p>반가워요!</p>
        </div>
        <div className={styles.shareloginMessage}>
          <p>밸런스보드를 둘러볼까요?</p>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.buttonContainer} style={{ width: "100%", padding: "0 20px" }}>
            <Button onClick={handleCloseModal} className={styles.loginButton}>
              <span>시작하기</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
