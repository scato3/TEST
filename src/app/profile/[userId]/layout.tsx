import React from "react";

import ProfileNav from "./_component/ProfileNav";
import styles from "./profileLayout.module.css";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <ProfileNav />
      {children}
    </div>
  );
}
