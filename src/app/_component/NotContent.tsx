import Image from "next/image";
import React from "react";

import styles from "./notContent.module.css";

interface IProps {
  children?: React.ReactNode;
  title?: string;
  comment1?: string;
  comment2?: string;
}

export default function NotContent({ children, title, comment1, comment2 }: IProps) {
  return (
    <div className={styles.container}>
      <Image src="/noContentsImg.png" width={98} height={100} alt="개구리 이미지" />
      <h3 className={styles.title}>{title} </h3>
      <p className={styles.comment}>{comment1}</p>
      <p className={styles.comment}>{comment2}</p>
      {children}
    </div>
  );
}
