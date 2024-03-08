import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "../../_component/modal.module.css";

interface ISuccessProps {
  handleCloseModal: () => void;
}

export default function WritingSuccessModal({ handleCloseModal }: ISuccessProps) {
  const router = useRouter();
  const handleGoMain = () => {
    try {
      handleCloseModal();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

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
        <button className={styles.CheckButton} onClick={handleGoMain}>
          네, 좋아요
        </button>
      </div>
    </div>
  );
}
