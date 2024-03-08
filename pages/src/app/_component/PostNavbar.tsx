"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function PostNav({ title, children }: { title?: string; children: React.ReactNode }) {
  // const [contentFulfilled, setContentFulfilled] = useState(false);

  // const handleContentFulfilled = () => {
  //   setContentFulfilled((prevState) => !prevState);
  // };

  // const registrationClass = contentFulfilled ? `${styles.registration} ${styles.fulfilled}` : styles.registration;

  // let buttonElement;

  // if (titleButton === "Writing") {
  //   buttonElement = (
  //     <div className={registrationClass} onClick={handleContentFulfilled}>
  //       <Link href="/">
  //         <button>등록</button>
  //       </Link>
  //     </div>
  //   );
  // } else if (titleButton === "Profile") {
  //   buttonElement = (
  //     <div className={styles.profileButton}>
  //       <Link href="/">
  //         <Image src="/image6.png" alt="Page 1" width={24} height={24} />
  //       </Link>
  //     </div>
  //   );
  // } else buttonElement = null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.backPage}>
        <Link href="/">
          <Image src="/image5.png" alt="Page 1" width={24} height={24} />
        </Link>
      </div>
      {title === "join" ? (
        <div className={styles.title}>{title}</div>
      ) : (
        <div className={styles.navLogo}>
          <Link href="/">
            <Image src="/image2.png" alt="Page 1" width={183} height={23} />
          </Link>
        </div>
      )}
      {children}
    </nav>
  );
}
