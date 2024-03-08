import Image from "next/image";

import styles from "./floating.module.css";

export default function Floating() {
  return (
    <div>
      <div className={styles.floatingContainer}>
        <div className={styles.floatingWrapper}>
          <Image src="/image10.png" alt="Image 1" width={52} height={52} />
        </div>
        <div className={styles.floatingWrapper}>
          <Image src="/image10.png" alt="Image 2" width={52} height={52} />
        </div>
      </div>
      <div className={styles.floatingContainer}>
        <div className={styles.floatingWrapper}>
          <Image src="/image11.png" alt="Image 1" width={52} height={52} />
        </div>
        <div className={styles.floatingWrapper}>
          <Image src="/image11.png" alt="Image 2" width={52} height={52} />
        </div>
      </div>
      <div className={styles.floatingContainer}>
        <div className={styles.floatingflexWrapper}>
          <div className={styles.floatingWrapper}>
            <Image src="/image11.png" alt="Image 1" width={52} height={52} />
          </div>
          <div className={styles.floatingWrapper}>
            <Image src="/image11.png" alt="Image 2" width={52} height={52} />
          </div>
        </div>
      </div>
    </div>
  );
}
