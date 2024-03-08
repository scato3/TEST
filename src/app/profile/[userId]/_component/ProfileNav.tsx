"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import styles from "./profileNav.module.css";
export default function JoinNav() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <nav className={styles.nav}>
      <button className={styles.back_btn} onClick={handleBack}>
        <Image src="/direction-left-md.svg" alt="뒤로가기" width={24} height={24} />
        <h1 className={styles.title}>Profile</h1>
      </button>
      <Link href={"/setting"} className={styles.setting_btn}>
        <Image src="/settings-md.svg" alt="설정" width={24} height={24} />
      </Link>
    </nav>
  );
}
