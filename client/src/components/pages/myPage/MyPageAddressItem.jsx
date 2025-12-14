import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import AddressModal from "../../layout/AddressModal";

import classes from "./MyPageAddressItem.module.css";

const MyPageAddressItem = ({
  addUser,
  setTargetNum,
  setUpdateSate,
  choicedefault,
  setChoiceDefault,
}) => {
  const deleteAddr = async () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      await axios
        .post("http://localhost:5000/mypage/api/addrdelete", { addUser })
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
            window.location.href = "http://localhost:3000/mypage/mypageaddress";
            // setReset(!reset);
          }
        });
    }
  };

  const [uIdx, setUidx] = useState(addUser.idx);
  const [dName, setUname] = useState(addUser.dName);

  const [dZipcode, setDzipcode] = useState(addUser.dZipcode);
  const [dAddr, setDaddr] = useState(addUser.dAddr);
  const [dAdditionalAddr, setDAdditionalAddr] = useState(
    addUser.dAdditionalAddr
  );
  const [dPhone, setDphone] = useState(addUser.dPhone);
  const [dMemo, setDmemo] = useState(addUser.dMemo);
  const [updateInput, setUpdateInput] = useState(false);

  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");
  const [showAddr, setShowAddr] = useState(false);

  const handleAddrClose = () => {
    setShowAddr(false);
  };

  const [nameErr, setNameErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [addrErr, setAddrErr] = useState(false);

  const [errNameMsg, setErrNameMsg] = useState("");
  const [errPhoneMsg, setErrPhoneMsg] = useState("");
  const [errAddrMsg, setErrAddrMsg] = useState("");

  const addrUname = useRef();
  const addrUphone = useRef();
  const updateZipcode = useRef();
  const updateAddrCode = useRef();
  const updateUdetail = useRef();

  useEffect(() => {
    if (updateInput === true) {
      getAddrINfo();
    }
  }, [inputZipCode]);
  const getAddrINfo = () => {
    if (inputZipCode === "") {
      updateZipcode.current.value = dZipcode;
    } else {
      updateZipcode.current.value = inputZipCode;
      setDzipcode(inputZipCode);
    }
    if (inputAddr === "") {
      updateAddrCode.current.value = dAddr;
    } else {
      updateAddrCode.current.value = inputAddr;
      setDaddr(inputAddr);
    }
  };

  const choiceAddr = async () => {
    await axios
      .post("http://localhost:5000/mypage/api/choiceaddr", {
        addUser,
      })
      .then((response) => {
        if (response.data.status === 200) {
          alert(response.data.message);
          setChoiceDefault(!choicedefault);
          // setReset(!reset);
        }
      });
  };

  const infoHandler = (e) => {
    const nullMsg = "공백값은 입력할수 없습니다. ";
    const newInfoName = e.target.name;
    const newInfo = e.target.value;

    const nullCheck = /\s/; //공백체크
    const nameCheck = /^[가-힝a-zA-Z]{2,}$/;
    const spcCheck = /[!@#]/;
    const numCheck = /[0-9]/g;
    const telPhoneCheck = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;

    switch (newInfoName) {
      case "uName":
        if (nullCheck.exec(newInfo) || newInfo === "") {
          setUname("");
          setNameErr(true);
          setErrNameMsg(nullMsg);
          addrUname.current.value = "";
          return;
        } else if (!nameCheck.exec(newInfo)) {
          setUname("");
          setNameErr(true);
          setErrNameMsg("올바른 이름의 형식이 아닙니다.");
          return;
        } else if (nameCheck.exec(newInfo)) {
          setNameErr(false);
          setUname(newInfo);
        }
        break;

      case "uPhone":
        if (nullCheck.exec(newInfo) || newInfo === "") {
          setDphone("");
          setPhoneErr(true);
          setErrPhoneMsg(nullMsg);
          addrUphone.current.value = "";
          return;
        } else if (!numCheck.exec(newInfo) || spcCheck.exec(newInfo)) {
          setDphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 숫자만 입력 가능합니다.");
          addrUphone.current.value = "";
          return;
        } else if (newInfo.length < 11) {
          setDphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 10자리에서 11자리를 입력해주세요 ");
          return;
        } else if (newInfo.length > 11) {
          setDphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 최대 11자리를 넘길수 없습니다. ");
          return;
        } else if (!telPhoneCheck.exec(newInfo)) {
          setDphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호 앞자리를 확인해주세요.");
          return;
        } else {
          setPhoneErr(false);
          setDphone(newInfo);
        }
        break;

      case "uDetail":
        if (spcCheck.exec(newInfo)) {
          updateUdetail.current.value = "";
          setDAdditionalAddr("");
          setAddrErr(true);
          setErrAddrMsg("특수 문자를 제외한 정보만 입력해주세요");
          return;
        } else {
          setAddrErr(false);
          setDAdditionalAddr(newInfo);
        }

      default:
        break;
    }
  };

  const updateAddr = async (e) => {
    e.preventDefault();

    if (nameErr === true || phoneErr === true || addrErr === true) {
      alert("입력 형식이 올바르지 않습니다.");
    } else {
      await axios
        .post("http://localhost:5000/mypage/api/addrupdate", {
          uIdx,
          dName,
          dZipcode,
          dAddr,
          dAdditionalAddr,
          dPhone,
          dMemo,
        })
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
            window.location.href = "http://localhost:3000/mypage/mypageaddress";
          }
        });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddressItem}>
        <div className={classes["address-item-addr"]}>
          <span>이름 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                name="uName"
                ref={addrUname}
                defaultValue={addUser.dName}
                onChange={infoHandler}
              />
            ) : (
              <h2> {addUser.dName}</h2>
            )}
          </span>
        </div>
        {nameErr && <small className={classes["err"]}>{errNameMsg}</small>}
        <div className={classes["address-item-addr"]}>
          <span>우편번호 :</span>

          <span className={classes["zipcode-wrap-input"]}>
            {updateInput === true ? (
              <input
                type="text"
                name="dZipcode"
                defaultValue={addUser.dZipcode}
                onChange={getAddrINfo}
                ref={updateZipcode}
              />
            ) : (
              <h2> {addUser.dZipcode}</h2>
            )}
          </span>

          {updateInput && (
            <span className={classes["search-wrap-button"]}>
              <button
                type="button"
                onClick={() => {
                  setShowAddr(true);
                  getAddrINfo();
                }}
              >
                주소검색
              </button>
              {showAddr && (
                <AddressModal
                  onClose={handleAddrClose}
                  setInputAddr={setInputAddr}
                  setInputZipCode={setInputZipCode}
                />
              )}
            </span>
          )}
        </div>
        <div className={classes["address-item-addr"]}>
          <span>주소 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                name="dAddr"
                defaultValue={addUser.dAddr}
                onChange={getAddrINfo}
                ref={updateAddrCode}
              />
            ) : (
              <h2> {addUser.dAddr}</h2>
            )}
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>상세주소 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                name="uDetail"
                defaultValue={addUser.dAdditionalAddr}
                onChange={infoHandler}
              />
            ) : (
              <h2>{addUser.dAdditionalAddr}</h2>
            )}
          </span>
        </div>
        {addrErr && <small className={classes["err"]}>{errAddrMsg}</small>}
        <div className={classes["address-item-addr"]}>
          <span>전화번호 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                name="uPhone"
                ref={addrUphone}
                maxLength={11}
                defaultValue={addUser.dPhone}
                onChange={infoHandler}
              />
            ) : (
              <h2> {addUser.dPhone}</h2>
            )}
          </span>
        </div>
        {phoneErr && <small className={classes["err"]}>{errPhoneMsg}</small>}
        <div className={classes["address-item-addr"]}>
          <span>요청 사항 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                ref={updateUdetail}
                defaultValue={addUser.dMemo}
                onChange={(e) => setDmemo(e.target.value)}
              />
            ) : (
              <h2> {addUser.dMemo}</h2>
            )}
          </span>
        </div>
        <div className={classes["address-item-update"]}>
          {!updateInput ? (
            <>
              <button type="button" onClick={choiceAddr}>
                선택
              </button>

              <button
                type="button"
                onClick={(e) => {
                  setUpdateInput(!updateInput);
                  setTargetNum(e.target.name);
                  setUpdateSate(true);
                }}
                name={addUser.idx}
              >
                수정
              </button>
              <button type="button" onClick={deleteAddr}>
                삭제
              </button>
            </>
          ) : (
            <>
              <button type="button" name={addUser.idx} onClick={updateAddr}>
                저장
              </button>
              <button
                type="button"
                onClick={() => {
                  setUpdateInput(!updateInput);
                  setUpdateSate(false);
                  setNameErr(false);
                  setPhoneErr(false);
                  setAddrErr(false);
                }}
              >
                취소
              </button>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressItem;
