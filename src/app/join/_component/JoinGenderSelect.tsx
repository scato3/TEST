"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Button from "@/app/_component/Button";

import { useJoinDataContext } from "../_context/JoinContext";
import styles from "./joinGenderSelect.module.css";
import NextBtn from "./NextBtn";

export default function JoinGenderSelect() {
  const router = useRouter();
  const {
    data: { submitData, visibleBtn, processType },
    setDataField,
    setVisibleBtn,
  } = useJoinDataContext();
  const selectGender = (value: string) => {
    setDataField("gender", value);
    setVisibleBtn(true);
  };

  const handleNext = () => {
    if (visibleBtn && processType === 2) {
      router.push("/join/?processType=3");
    }
  };

  useEffect(() => {
    if (!submitData.gender) {
      setVisibleBtn(false);
    }
  }, []);

  return (
    <div>
      <p className={styles.txt01}>더 정확한 투표 결과를 알려드릴게요.</p>
      <div className={styles.btn_container}>
        <Button
          onClick={() => selectGender("male")}
          className={styles.button}
          bgColor={submitData?.gender === "male" ? "primary" : "background_200"}
        >
          남성
        </Button>
        <Button
          onClick={() => selectGender("female")}
          className={styles.button}
          bgColor={submitData?.gender === "female" ? "primary" : "background_200"}
        >
          여성
        </Button>
      </div>
      <NextBtn handleNext={handleNext} />
    </div>
  );
}
