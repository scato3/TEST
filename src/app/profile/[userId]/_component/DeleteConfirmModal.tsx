import Image from "next/image";

import tearsImg from "../../../../../public/Tear-Face-profile-md.png";
import styles from "./delModal.module.css";

interface IProps {
  handleCloseModal: () => void;
  handleDel: () => void;
}

export default function DeleteConfirmModal({ handleCloseModal, handleDel }: IProps) {
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.loginModal} onClick={handleStopPropagation}>
      <div className={styles.contentWrapper}>
        <div className={styles.easyloginMessage}>
          <p>게시물을 삭제할까요?</p>
          <Image src={tearsImg} width={24} height={24} alt="눈물 이미지" />
        </div>
        <div className={styles.shareloginMessage}>
          <p>게시물은 삭제 후 복구할 수 없어요!</p>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.buttonContainer}>
            <button onClick={handleCloseModal} className={styles.loginButton}>
              <span>뒤로가기</span>
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleDel} className={styles.nextLoginButton}>
              <span>삭제하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
