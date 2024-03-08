"use client";
import Image from "next/image";
import Link from "next/link";

import { useModal } from "@/hook/useModal";

import logo from "../../../public/logo.png";
import notificationIco from "../../../public/notification-md.svg";
import searchIco from "../../../public/search-md.svg";
import DevelopModal from "./DevelopModal";
import styles from "./mainNavbar.module.css";
import ModalContainer from "./ModalContainer";
import ModalPortal from "./ModalPortal";
import NavUserProfile from "./NavUserProfile";

export default function Topnav() {
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.main_logo}>
        <Image src={logo} alt="Balance Borad Logo" width={107} height={31} />
      </Link>
      <div className={styles.right_icons}>
        <button onClick={() => handleOpenMoal()}>
          <Image src={searchIco} alt="검색" width={24} height={24} />
        </button>
        <button onClick={() => handleOpenMoal()}>
          <Image src={notificationIco} alt="알림" width={24} height={24} />
        </button>
        <NavUserProfile />
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <DevelopModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </nav>
  );
}
