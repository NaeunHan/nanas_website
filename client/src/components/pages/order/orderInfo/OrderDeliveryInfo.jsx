import React, { Fragment, useState } from "react";
import Card from "../../../UI/Card";

import Modal from "../../../UI/Modal";

import { GrClose } from "react-icons/gr";

import classes from "./OrderDeliveryInfo.module.css";
import ModalOrderDeliveryInfoChange from "./ModalOrderDeliveryInfoChange";

const OrderDeliveryInfo = ({
  addrData,
  onAddrChange,
  isOrderComplete,
  onAddrDate,
}) => {
  const [isShowModal, setIsShowModal] = useState({
    changeInfo: false,
    addInfo: false,
  });

  const { dAdditionalAddr, dAddr, dMemo, dPhone, dZipcode, dName } =
    addrData.defaultAddr;

  const handleSelectAddr = (
    dName,
    dZipcode,
    dAddr,
    dAdditionalAddr,
    dPhone,
    dMemo
  ) => {
    onAddrChange(dName, dZipcode, dAddr, dAdditionalAddr, dPhone, dMemo);
    setIsShowModal(false);
  };

  return (
    <Fragment>
      {isShowModal.changeInfo && (
        <Modal
          onClose={() =>
            setIsShowModal((prev) => {
              return { ...prev, changeInfo: false };
            })
          }
          className={classes.modalChangeAddr}
        >
          <header className={classes["modalChangeAddr-header"]}>
            배송지 선택
            <GrClose
              className={classes["modalChangeAddr-header__close"]}
              onClick={() => setIsShowModal(false)}
            />
          </header>
          <section
            className={`${classes["modalChangeAddr-section"]} ${classes.defaultAddr}`}
          >
            <h4 className={`${classes["modalChangeAddr-section-title"]}`}>
              기본 배송지
            </h4>
            <Card className={classes["modalChangeAddr-section__item"]}>
              <p className={classes["modalChangeAddr-section__item__name"]}>
                {dName}
              </p>

              <p className={classes["modalChangeAddr-section__item__addr"]}>
                {`${dAddr} [ ${dZipcode} ]`}
              </p>
              <p
                className={
                  classes["modalChangeAddr-section__item__additionalAddr"]
                }
              >
                {dAdditionalAddr}
              </p>

              <p className={classes["modalChangeAddr-section__item__phone"]}>
                {dPhone}
              </p>

              <p className={classes["modalChangeAddr-section__item__memo"]}>
                배송요청사항 : {dMemo}
              </p>

              <div className={classes["modalChangeAddr-section__item__select"]}>
                <button
                  onClick={handleSelectAddr.bind(
                    null,
                    dName,
                    dZipcode,
                    dAddr,
                    dAdditionalAddr,
                    dPhone,
                    dMemo
                  )}
                >
                  선택
                </button>
              </div>
            </Card>
          </section>

          <section className={classes["modalChangeAddr-section"]}>
            {addrData.addrs.map((it, idx) => (
              <Card
                key={idx}
                className={classes["modalChangeAddr-section__item"]}
              >
                <p className={classes["modalChangeAddr-section__item__name"]}>
                  {it.dName}
                </p>

                <p className={classes["modalChangeAddr-section__item__addr"]}>
                  {`${it.dAddr} [ ${it.dZipcode} ]`}
                </p>
                <p
                  className={
                    classes["modalChangeAddr-section__item__additionalAddr"]
                  }
                >
                  {it.dAdditionalAddr}
                </p>

                <p className={classes["modalChangeAddr-section__item__phone"]}>
                  {it.dPhone}
                </p>

                <p className={classes["modalChangeAddr-section__item__memo"]}>
                  배송요청사항 : {it.dMemo}
                </p>

                <div
                  className={classes["modalChangeAddr-section__item__select"]}
                >
                  <button
                    onClick={handleSelectAddr.bind(
                      null,
                      it.dName,
                      it.dZipcode,
                      it.dAddr,
                      it.dAdditionalAddr,
                      it.dPhone,
                      it.dMemo
                    )}
                  >
                    선택
                  </button>
                </div>
              </Card>
            ))}
          </section>
        </Modal>
      )}

      {/* 배송지 추가 */}
      {isShowModal.addInfo && (
        <ModalOrderDeliveryInfoChange
          onShow={setIsShowModal}
          onAddrDate={onAddrDate}
          defalutAddr={addrData.defaultAddr}
        />
      )}

      <div className={classes["orderDeliveryInfo"]}>
        <div className={classes["orderDeliveryInfo-deliveryChange"]}>
          <h4>받는 사람 정보</h4>

          {!isOrderComplete && (
            <>
              <button
                onClick={() =>
                  setIsShowModal((prev) => {
                    return { ...prev, changeInfo: true };
                  })
                }
              >
                받는 사람 정보 변경
              </button>
              <button
                onClick={() =>
                  setIsShowModal((prev) => {
                    return { ...prev, addInfo: true };
                  })
                }
              >
                배송지 추가
              </button>
            </>
          )}
        </div>

        <table className={classes["orderDeliveryInfo-table"]}>
          <tbody>
            <tr>
              <td className={classes["orderDeliveryInfo-table__col1"]}>이름</td>
              <td className={classes["orderDeliveryInfo-table__col2"]}>
                {dName}
              </td>
            </tr>
            <tr>
              <td className={classes["orderDeliveryInfo-table__col1"]}>
                배송지 주소
              </td>
              <td className={classes["orderDeliveryInfo-table__col2"]}>
                {`${dAddr} [ ${dZipcode} ] ${dAdditionalAddr}`}
              </td>
            </tr>
            <tr>
              <td className={classes["orderDeliveryInfo-table__col1"]}>
                연락처
              </td>
              <td className={classes["orderDeliveryInfo-table__col2"]}>
                {dPhone}
              </td>
            </tr>
            <tr>
              <td className={classes["orderDeliveryInfo-table__col1"]}>
                배송요청사항
              </td>
              <td className={classes["orderDeliveryInfo-table__memo"]}>
                {dMemo}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default OrderDeliveryInfo;
