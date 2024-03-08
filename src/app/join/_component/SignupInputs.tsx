"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

import Input from "@/app/_component/Input";
import { constant } from "@/utils/constant";
import { validateEmail } from "@/utils/validation";

import { useJoinDataContext } from "../_context/JoinContext";
import NextBtn from "./NextBtn";
import styles from "./signupInputs.module.css";
export default function SignupInputs() {
  const router = useRouter();
  const {
    setDataField,
    setVisibleBtn,
    data: { submitData, processType, visibleBtn },
  } = useJoinDataContext();
  const [openSelectBox, setOpenSelectBox] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState<boolean | string>("good");
  const [validation, setValidation] = useState({
    minLen: false,
    maxLen: false,
    space: false,
    enNum: false,
  });

  const notEqualPassword = submitData.password !== submitData.passwordConfirm;

  const activeNextBtn = () => {
    console.log("signup");
    setVisibleBtn(false);
    if (!submitData.emailFont) return;
    if (submitData.emailBack === "선택") return;
    if (submitData.duplicateEmail !== 3) return;
    if (!submitData.password) return;
    if (!submitData.passwordConfirm) return;
    if (notEqualPassword) return;

    if (!validation.minLen) return;
    if (!validation.maxLen) return;
    if (!validation.space) return;
    if (!validation.enNum) return;
    setVisibleBtn(true);
  };

  const noSelectBox = submitData.emailBack === "선택";

  const changeSelectBox = (type: number) => {
    if (type === 1) {
      setDataField("emailBack", "gmail.com");
    } else {
      setDataField("emailBack", "naver.com");
    }
  };

  const checkDuplicateEmail = async () => {
    const email = submitData.emailFont + "@" + submitData.emailBack;
    const validationMsg = validateEmail(email);
    if (validationMsg) {
      setEmailErrMsg(validationMsg);
      setDataField("duplicateEmail", 1);
      return;
    }
    const res = await fetch(constant.apiUrl + "api/user/validate/email?email=" + email, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const { duplicate }: { duplicate: boolean } = await res.json();
    if (duplicate) {
      setDataField("duplicateEmail", 2);
      setEmailErrMsg("이미 가입된 이메일입니다.");
    } else {
      setEmailErrMsg("good");
      setDataField("duplicateEmail", 3);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataField("duplicateEmail", 1);
    setVisibleBtn(false);
    const { name, value } = e.target;
    setDataField(name, value);
  };

  // 비밀번호 관련

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVisibleBtn(false);
    setDataField(name, value);
    if (value.length > 7) {
      setValidation((prev) => {
        return {
          ...prev,
          minLen: true,
        };
      });
      if (value.length <= 20) {
        setValidation((prev) => {
          return {
            ...prev,
            maxLen: true,
          };
        });
      } else {
        setValidation((prev) => {
          return {
            ...prev,
            maxLen: false,
          };
        });
      }
      const regexSpace = /\s/;
      const regexEnNum = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
      if (!regexSpace.test(value)) {
        setValidation((prev) => {
          return {
            ...prev,
            space: true,
          };
        });
      } else {
        setValidation((prev) => {
          return {
            ...prev,
            space: false,
          };
        });
      }
      if (regexEnNum.test(value)) {
        setValidation((prev) => {
          return {
            ...prev,
            enNum: true,
          };
        });
      } else {
        setValidation((prev) => {
          return {
            ...prev,
            enNum: false,
          };
        });
      }
    } else {
      setValidation((prev) => {
        return {
          ...prev,
          minLen: false,
          maxLen: false,
          space: false,
          enNum: false,
        };
      });
    }
  };

  const handleChangePasswordConfrim = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibleBtn(false);
    const { name, value } = e.target;
    setDataField(name, value);
  };

  const handleNext = () => {
    if (visibleBtn && processType === 0) {
      router.push("/join/?processType=1");
    }
  };

  useEffect(() => {
    activeNextBtn();
  }, [submitData, validation]);

  return (
    <div>
      <div className={styles.email_container}>
        {emailErrMsg !== "good" && <p className={styles.email_err}>{emailErrMsg}</p>}
        <div className={styles.email_wrapper}>
          <Input
            onChange={handleChange}
            name="emailFont"
            border={"none"}
            type="text"
            placeholder="이메일"
            className={`${styles.email_font} ${emailErrMsg !== "good" ? styles.wran_border : ""}`}
            value={submitData.emailFont}
          />
          <span className={styles.at}>@</span>
          <div
            className={styles.dropdown}
            onClick={() => {
              setOpenSelectBox((prev) => !prev);
            }}
          >
            <span className={`${!noSelectBox ? styles.selected : styles.txt1}`}>{submitData.emailBack}</span>
            <Image
              src={openSelectBox ? "/direction-up-sm.svg" : "/direction-down-sm.svg"}
              alt="Balance Board 로고"
              width={18}
              height={18}
              priority
            />
            {openSelectBox && (
              <div className={styles.dropdown_box}>
                <button onClick={() => changeSelectBox(1)} className={styles.dropdown_box_btn}>
                  gmail.com
                </button>
                <button onClick={() => changeSelectBox(2)} className={styles.dropdown_box_btn}>
                  naver.com
                </button>
              </div>
            )}
          </div>
        </div>
        <button onClick={checkDuplicateEmail} className={styles.duplication}>
          {submitData.duplicateEmail !== 3 ? (
            <span
              className={submitData.duplicateEmail === 1 ? styles.duplication_txt_wait : styles.duplication_txt_warn}
            >
              중복확인
            </span>
          ) : (
            <Image className={styles.ico} src="/check-circle-md.svg" alt="확인 아이콘" width={24} height={24} />
          )}
        </button>
      </div>
      <Input
        onChange={handlePasswordChange}
        name="password"
        type="password"
        value={submitData.password}
        className={`${styles.email_font} ${styles.password}`}
        placeholder="비밀번호"
      />
      <ul className={styles.check_list}>
        <li className={styles.check_list_item}>
          <Image
            className={styles.ico}
            src={validation.minLen ? "/check-pressed-md.svg" : "/check-md.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          8자리 이상
        </li>
        <li className={styles.check_list_item}>
          <Image
            className={styles.ico}
            src={validation.maxLen ? "/check-pressed-md.svg" : "/check-md.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          20자 이내
        </li>
        <li className={styles.check_list_item}>
          <Image
            className={styles.ico}
            src={validation.space ? "/check-pressed-md.svg" : "/check-md.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          공백 없음
        </li>
        <li className={styles.check_list_item}>
          <Image
            className={styles.ico}
            src={validation.enNum ? "/check-pressed-md.svg" : "/check-md.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          영문, 숫자 포함
        </li>
      </ul>
      <div
        className={`${styles.input_password_confirm} ${notEqualPassword && submitData.passwordConfirm.length > 7 ? styles.wran_border : ""}`}
      >
        <Input
          className={styles.input}
          placeholder="비밀번호 확인"
          type="password"
          value={submitData.passwordConfirm}
          onChange={handleChangePasswordConfrim}
          name="passwordConfirm"
        />
        {notEqualPassword && submitData.passwordConfirm.length > 7 && (
          <p className={styles.password_confirm_warn_txt}>비밀번호가 일치하지 않습니다.</p>
        )}
      </div>
      <NextBtn handleNext={handleNext} />
    </div>
  );
}
