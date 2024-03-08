import Image from "next/image";
import React from "react";

import logo from "../../../public/logo.png";
import BackBtn from "./_component/BackBtn";
import LoginForm from "./_component/LoginForm";
import styles from "./login.module.css";

export default function SingUp() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <BackBtn />
      </nav>
      <div className={styles.container}>
        <Image src={logo} alt="Balance Board 로고" width={168} height={49} priority />
        <LoginForm />
      </div>
    </div>
  );
}
