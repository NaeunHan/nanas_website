import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistSection from "../regist/RegistSection";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./MyPagePassPw.module.css";

import axios from "axios";

import AddressModal from "../../layout/AddressModal";
import useUserInput from "../../../hooks/use-userInput";

const MyPagePassPw = ({ user, setUserPw }) => {
  const navigate = useNavigate();
  //modal
  const [showAddr, setShowAddr] = useState(false);

  const handleAddrClose = () => {
    setShowAddr(false);
  };

  //pw on/off
  const [showPw, setShowPw] = useState(false);
  const [showCkPw, setShowCkPw] = useState(false);

  // 커스텀 훅
  const { value, isValid, hasError, handleValueChange, handleInputBlur } =
    useUserInput();

  // 사용자 입력값 State
  const {
    enteredName,
    enteredPasswd,
    enteredRePasswd,
    enteredEmail,

    enteredPhone,
    enteredZipcode,
    enteredAddress,
    enteredAdditionalAddress,
    enteredBirth,
  } = value;

  // 사용자 입력값 유효성 State (true : 유효)
  const {
    nameIsValid,
    passwdIsValid,
    rePasswdIsValid,
    emailIsValid,
    additionalEmailIsValid,
    phoneIsValid,
    additionalAddressIsValid,
    birthIsValid,
  } = isValid;

  // 사용자에게 피드백 전달 여부 (true : 피드백 전달 - 사용자 입력 유효하지 않고 input 태그 터치)
  const {
    nameHasError,
    passwdHasError,
    rePasswdHasError,
    emailHasError,
    phoneHasError,
    additionalAddressHasError,
    birthHasError,
  } = hasError;

  // 사용자 입력값 State 변경 (setState - 내부에 e.target.value 포함되어있어서 함수명만 사용하면됨)
  const {
    handleNameChange,
    handlePasswdChange,
    handleRePasswdChange,
    handleEmailChange,

    handlePhoneChange,
    handleZipcodeChange,
    handleAddressChange,
    handleAdditionalAddrChange,
    handleBirthChange,
  } = handleValueChange;

  // onBlur prop에 전달할 함수
  const {
    handleNameBlur,
    handlePasswdBlur,
    handleRePasswdBlur,
    handleEmailBlur,

    handlePhoneBlur,
    handleAdditionalAddressBlur,
    handleBirthBlur,
  } = handleInputBlur;

  // hasError에 따른 className 변경
  const nameInputClasses = nameHasError ? classes.hasError : "";

  const passwdInputClasses = passwdHasError ? classes.hasError : "";

  const rePasswdInputClasses = rePasswdHasError ? classes.hasError : "";

  const birthInputClasses = birthHasError ? classes.hasError : "";

  const phoneInputClasses = phoneHasError
    ? `${classes["sectionUserInfoInput-phone"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-phone"];

  const additionalAddressClasses = additionalAddressHasError
    ? classes["additionalAddr-hasError"]
    : "";

  const emailInputClasses = emailHasError
    ? `${classes["sectionUserInfoInput-email"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-email"];

  // registIsValid가 false이면 입력 유효성 중 하나는 false
  let registIsValid =
    nameIsValid &&
    passwdIsValid &&
    rePasswdIsValid &&
    emailIsValid &&
    additionalEmailIsValid &&
    phoneIsValid &&
    additionalAddressIsValid &&
    birthIsValid;

  const submitUpdate = async (e) => {
    e.preventDefault();

    if (!registIsValid) {
      updateUserHandle();
    }
  };

  //수정 통신
  const updateUserHandle = async () => {
    const idx = user.idx;
    await axios
      .post("http://localhost:5000/mypage/api/updateuser", {
        idx,
        enteredName,
        enteredPasswd,
        enteredRePasswd,
        enteredEmail,
        enteredBirth,
        enteredZipcode,
        enteredAddress,
        enteredAdditionalAddress,
      })
      .then((response) => {
        if (response.data.status === 200) {
          alert(response.data.message);
          navigate("/mypage", { replace: true });
        }
      });
  };

  return (
    <React.Fragment>
      <div className={classes.MyPagePassPw}>
        <RegistSection title={"회원정보 수정"} />
        <form action="/updateUser" method="post" onSubmit={submitUpdate}>
          <table>
            <thead>
              <tr>
                <td>
                  <h2>이름</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        id="name"
                        type="text"
                        text="이름"
                        className={nameInputClasses}
                        value={enteredName}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                      />
                    </div>
                    <div className={classes["sectionUserInfoInput-feedback"]}>
                      {nameHasError && (
                        <p className={classes["sectionUserInfoInput-error"]}>
                          이름은 최소 2글자에서 최대 5글자 입력이 가능합니다.
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h2>아이디</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        type="text"
                        name="updateId"
                        defaultValue={user.uId}
                        className={classes["id-input"]}
                        readOnly
                      />
                      <input
                        type="hidden"
                        name="userIdx"
                        defaultValue={user.idx}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>비밀번호</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        id="passwd"
                        type="password"
                        text="비밀번호"
                        className={passwdInputClasses}
                        value={enteredPasswd}
                        onChange={handlePasswdChange}
                        onBlur={handlePasswdBlur}
                      />
                      {!showPw ? (
                        <div className={classes["passwd-show-icon"]}>
                          <FaEyeSlash onClick={() => setShowPw(!showPw)} />
                        </div>
                      ) : (
                        <div className={classes["passwd-show-icon"]}>
                          <FaEye onClick={() => setShowPw(!showPw)} />
                        </div>
                      )}
                    </div>
                    <div className={classes["sectionUserInfoInput-feedback"]}>
                      {passwdHasError && (
                        <p className={classes["sectionUserInfoInput-error"]}>
                          비밀번호는 8~15글자 입력이 가능하며, ! @ # 중 하나를
                          포함, 문자와 숫자는 1개 이상 포함되어야합니다.
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>비밀번호 확인</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        id="RePasswd"
                        type="password"
                        className={rePasswdInputClasses}
                        text="비밀번호 재입력"
                        value={enteredRePasswd}
                        onChange={handleRePasswdChange}
                        onBlur={handleRePasswdBlur}
                      />
                      {!showCkPw ? (
                        <div className={classes["passwd-show-icon"]}>
                          <FaEyeSlash onClick={() => setShowCkPw(!showCkPw)} />
                        </div>
                      ) : (
                        <div className={classes["passwd-show-icon"]}>
                          <FaEye onClick={() => setShowCkPw(!showCkPw)} />
                        </div>
                      )}
                    </div>
                    <div className={classes["sectionUserInfoInput-feedback"]}>
                      {rePasswdHasError && (
                        <p className={classes["sectionUserInfoInput-error"]}>
                          비밀번호가 일치하지 않습니다.
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>생년월일</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        id="birth"
                        type="text"
                        text="생년월일"
                        className={birthInputClasses}
                        value={enteredBirth}
                        onChange={handleBirthChange}
                        onBlur={handleBirthBlur}
                      />
                    </div>
                    <div className={classes["sectionUserInfoInput-feedback"]}>
                      {birthHasError && (
                        <p className={classes["sectionUserInfoInput-error"]}>
                          8자리의 생년월일을 입력해주세요.
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>전화번호</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        className={phoneInputClasses}
                        id="phone"
                        type="text"
                        text="전화번호"
                        value={enteredPhone}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                      />
                    </div>
                    <div className={classes["sectionUserInfoInput-feedback"]}>
                      {phoneHasError && (
                        <p className={classes["sectionUserInfoInput-error"]}>
                          전화번호는 10~11자리를 입력해야하며, 숫자만 입력이
                          가능합니다.
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>이메일</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        className={emailInputClasses}
                        type="text"
                        text="이메일"
                        value={enteredEmail}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                      />
                    </div>
                    <div className={classes["sectionUserInfoInput-feedback"]}>
                      {emailHasError && (
                        <p className={classes["sectionUserInfoInput-error"]}>
                          이메일을 입력해주세요.
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>주소</h2>
                </td>
                <td>
                  <div
                    className={`${classes["passpw-item-input"]} ${classes["addr-zipcode-input"]}`}
                  >
                    <div>
                      <input
                        className={classes["sectionUserInfoInput-zipcode"]}
                        type="text"
                        text="주소"
                        id="zipcode"
                        value={enteredZipcode}
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddr(true);
                        }}
                      >
                        주소찾기
                      </button>
                      {showAddr && (
                        <AddressModal
                          onClose={handleAddrClose}
                          setInputZipCode={handleZipcodeChange}
                          setInputAddr={handleAddressChange}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${classes["passpw-item-input"]} ${classes["addr-addr-input"]}`}
                  >
                    <div></div>
                  </div>
                  <div
                    className={`${classes["passpw-item-input"]} ${classes["addr-detail-input"]}`}
                  >
                    <div>
                      <input
                        type="text"
                        readOnly
                        value={enteredAddress}
                        style={{ cursor: "default" }}
                      />
                      <input
                        type="text"
                        className={additionalAddressClasses}
                        onChange={handleAdditionalAddrChange}
                        value={enteredAdditionalAddress}
                        onBlur={handleAdditionalAddressBlur}
                      />
                    </div>
                    <div className={classes["sectionUserInfoInput-feedback"]}>
                      {additionalAddressHasError && (
                        <p className={classes["sectionUserInfoInput-error"]}>
                          상세주소는 특수 문자를 제외한 1글자 이상을
                          입력해야합니다.
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={classes["passpw-wrap-button"]}>
            <div>
              <button className={classes["left-button"]}>수정</button>

              <button
                type="button"
                className={classes["right-button"]}
                onClick={() => setUserPw(false)}
              >
                취소
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPagePassPw;
