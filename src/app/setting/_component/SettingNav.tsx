"use client";

import Image from "next/image";
import Link from "next/link";

import backPageImg from "../../../../public/direction-left-md.svg";
import styles from "./settingNav.module.css";

export default function SettingNav({ title }: { title?: string }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.backPage}>
          <Link href="/">
            <Image src={backPageImg} alt="뒤로 가기 버튼" width={24} height={24} />
          </Link>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </nav>
  );
}
