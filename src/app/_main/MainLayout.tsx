import React from "react";

import Topnav from "../_component/MainNavbar";
import { Maintab } from "../_component/Tabs";
import PostCardList from "./_component/PostCardList";
import WriteFloating from "./_component/WriteFloating";
import styles from "./mainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <Topnav />
        <Maintab />
      </div>
      <PostCardList />
      <WriteFloating />
    </div>
  );
}
