import Image from "next/image";

import checkImg from "../../../../../public/check-xxl.png";
import styles from "./delModal.module.css";

interface IProps {
  handleCloseModal: () => void;
}

export default function DelAlertModal({ handleCloseModal }: IProps) {
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.loginModal} onClick={handleStopPropagation}>
      <div className={styles.contentWrapper}>
        <div className={styles.delConfirmImgContainer}>
          <Image src={checkImg} width={72} height={72} alt="체크 이밎" />
          <p>게시물을 삭제했어요</p>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.buttonContainer}>
            <button onClick={handleCloseModal} className={styles.loginButton}>
              <span>확인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
