import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AddressModal from "../../layout/AddressModal";

import classes from "./MyPageAddressAdd.module.css";
const MyPageAddressAdd = ({
  user,
  addAddress,
  setAddAddress,
  reset,
  setReset,
}) => {
  const [showAddr, setShowAddr] = useState(false);

  const [updateAddr, setUpdateAddr] = useState(false);

  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");

  const handleAddrClose = () => {
    setShowAddr(false);
  };

  const [uName, setUname] = useState(user.uName);
  const [uPhone, setUphone] = useState(user.uPhone);
  const [uZipcode, setUzipcode] = useState(user.uZipcode);
  const [uAddress, setUaddress] = useState(user.uAddress);
  const [uAdditionalAddr, setUadditionalAddr] = useState(user.uAdditionalAddr);
  const [uMemo, setUmemo] = useState("");

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

  const getAddrInfo = () => {
    if (inputZipCode === "") {
      updateZipcode.current.value = uZipcode;
    } else {
      updateZipcode.current.value = inputZipCode;
      setUzipcode(inputZipCode);
    }
    if (inputAddr === "") {
      updateAddrCode.current.value = uAddress;
    } else {
      updateAddrCode.current.value = inputAddr;
      setUaddress(inputAddr);
      updateUdetail.current.value = "";
      setUadditionalAddr("");
    }
  };

  useEffect(() => {
    if (updateAddr === true) {
      getAddrInfo();
    }
  }, [inputZipCode]);

  const addressInfoHandler = (e) => {
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
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg(nullMsg);
          addrUphone.current.value = "";
          return;
        } else if (!numCheck.exec(newInfo)) {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 숫자만 입력 가능합니다.");
          addrUphone.current.value = "";
          return;
        } else if (newInfo.length < 11) {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 10자리에서 11자리를 입력해주세요 ");
          return;
        } else if (newInfo.length > 11) {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 최대 11자리를 넘길수 없습니다. ");
          return;
        } else if (!telPhoneCheck.exec(newInfo)) {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호 앞자리를 확인해주세요.");
          return;
        } else {
          setPhoneErr(false);
          setUphone(newInfo);
        }
        break;

      case "uDetail":
        if (spcCheck.exec(newInfo)) {
          updateUdetail.current.value = "";
          setUadditionalAddr("");
          setAddrErr(true);
          setErrAddrMsg("특수 문자를 제외한 정보만 입력해주세요");
          return;
        } else {
          setAddrErr(false);
          setUadditionalAddr(newInfo);
        }

      default:
        break;
    }
  };

  const addAddressHandler = async () => {
    const uId = user.uId;

    if (nameErr === true || phoneErr === true || addrErr === true) {
      alert("입력 형식이 올바르지 않습니다.");
    } else {
      await axios
        .post("http://localhost:5000/mypage/api/adddeliver", {
          uId,
          uName,
          uPhone,
          uZipcode,
          uAddress,
          uAdditionalAddr,
          uMemo,
        })
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
            setReset(!reset);
            // window.location.href = "http://localhost:3000/mypage/mypageaddress";
          }
        });
      setAddAddress(!addAddress);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddressAdd}>
        <div>
          <table>
            <thead>
              <tr>
                <td>
                  <h2>수령인</h2>
                </td>
                <td>
                  <div className={classes["addr-wrap-input"]}>
                    <input
                      type="text"
                      name="uName"
                      defaultValue={uName}
                      ref={addrUname}
                      onChange={addressInfoHandler}
                    />
                  </div>
                  {nameErr && <small>{errNameMsg}</small>}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h2>전화번호</h2>
                </td>
                <td>
                  <div className={classes["addr-wrap-input"]}>
                    <input
                      type="text"
                      defaultValue={uPhone}
                      name="uPhone"
                      ref={addrUphone}
                      onChange={addressInfoHandler}
                    />
                  </div>
                  {phoneErr && <small>{errPhoneMsg}</small>}
                </td>
              </tr>
              <tr>
                <td>
                  <h2>배송지</h2>
                </td>
                <td>
                  <div className={classes["addr-wrap-top"]}>
                    <div className={classes["addr-wrap-input"]}>
                      <input
                        type="text"
                        readOnly
                        defaultValue={uZipcode}
                        ref={updateZipcode}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddr(true);
                          setUpdateAddr(true);
                        }}
                      >
                        주소찾기
                      </button>
                      {showAddr && (
                        <AddressModal
                          onClose={handleAddrClose}
                          setInputAddr={setInputAddr}
                          setInputZipCode={setInputZipCode}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${
                      classes["addr-wrap-input"]
                    } ${"addr-wrap-addr"}`}
                  >
                    <input
                      type="text"
                      readOnly
                      defaultValue={uAddress}
                      ref={updateAddrCode}
                    />
                  </div>
                  <div
                    className={`${
                      classes["addr-wrap-input"]
                    } ${"addr-wrap-detail"}`}
                  >
                    <input
                      type="text"
                      defaultValue={uAdditionalAddr}
                      name="uDetail"
                      ref={updateUdetail}
                      onChange={addressInfoHandler}
                    />
                  </div>
                  {addrErr && <small>{errAddrMsg}</small>}
                </td>
              </tr>

              <tr>
                <td>
                  <h2>요청사항</h2>
                </td>
                <td>
                  <div className={classes["addr-wrap-memo"]}>
                    <input onChange={(e) => setUmemo(e.target.value)}></input>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={classes["addr-wrap-button"]}>
          <div>
            <button type="button" onClick={addAddressHandler}>
              추가
            </button>
          </div>
          <div>
            <button type="button" onClick={() => setAddAddress(false)}>
              취소
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressAdd;
