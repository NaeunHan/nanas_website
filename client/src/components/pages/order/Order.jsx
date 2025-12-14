import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import OrderConsumer from "./orderInfo/OrderConsumer";
import OrderDeliveryInfo from "./orderInfo/OrderDeliveryInfo";
import OrderPaymentInfo from "./orderInfo/OrderPaymentInfo";
import OrderProduct from "./orderInfo/OrderProduct";

import classes from "./Order.module.css";

import { getUser } from "../../../util/getUser";
import { authCheck } from "../../../util/authCheck";

const Order = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.order);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDeliveyFee, setTotalDeliveryFee] = useState(0);

  // 사용자 마일리지 입력
  const [useMileInput, setUseMileInput] = useState({
    value: 0,
    isValid: true,
    mileMsg: "",
  });

  const [addrData, setAddrData] = useState({
    addrs: [],
    defaultAddr: { dName: "" },
  });

  // 주문 내역 db에 저장할 정보
  const [orderInfo, setOrderInfo] = useState({
    oUseMile: 0,
    oGetMile: 0,
    oMethod: "",
  });

  // 배송지 변경 선택
  const handleChangeAddr = (
    dName,
    dZipcode,
    dAddr,
    dAdditionalAddr,
    dPhone,
    dMemo
  ) => {
    setAddrData((prev) => {
      return {
        ...prev,
        defaultAddr: {
          ...prev.defaultAddr,
          dName,
          dZipcode,
          dAddr,
          dAdditionalAddr,
          dPhone,
          dMemo,
        },
      };
    });
  };

  // 결제 방법 선택
  const hadleOrderMethod = (select) => {
    setOrderInfo((prev) => {
      return { ...prev, oMethod: select };
    });
  };

  // 마일리지 적용 클릭
  const handleUseMileClick = (value) => {
    // 보유 마일리지보다 많게 입력할 경우
    if (+value > user.uMile) {
      setUseMileInput({
        value: 0,
        isValid: false,
        mileMsg: "보유하신 마일리지보다 많은 사용량은 사용하실 수 없습니다.",
      });
      return;
    } else {
      if (+value < 0) {
        setUseMileInput({
          value: 0,
          isValid: false,
          mileMsg: "사용하실 마일리지 입력량은 0이상 가능합니다.",
        });
        return;
      }
      setUseMileInput({ value, isValid: true });
      setOrderInfo((prev) => {
        return { ...prev, oUseMile: value };
      });
    }
  };

  // 결제 버튼 클릭
  const handleOrderSubmit = async () => {
    if (!orderInfo.oMethod) {
      window.alert("결제방법을 선택해주세요");
      return;
    }

    navigate("/orderComplete", {
      state: {
        orderProducts: orderData,
        orderData: {
          ...orderInfo,
          totalDeliveyFee,
          totalPrice,
        },

        addrData: addrData,
      },
      replace: true,
    });

    await axios.post("http://localhost:5000/order/api/order/Complete", {
      user: user,
      addrData: addrData.defaultAddr,
      orderData,
      oUseMile: orderInfo.oUseMile,
      oGetMile: orderInfo.oGetMile,
      oMethod: orderInfo.oMethod,
    });
  };

  useEffect(() => {
    authCheck();
    getUser(setUser);

    const getAddr = async () => {
      await axios
        .get("http://localhost:5000/order/api/get/addr", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            setAddrData({
              addrs: response.data.deliveryAddr,
              defaultAddr: response.data.defaultAddr[0],
            });
          }
        });
    };
    let totalprice = 0;
    let totalDeliveryFee = 0;
    orderData.forEach((data) => {
      totalprice += data.price * +data.sQuantity;

      totalDeliveryFee += data.pDeliveryFee;
    });

    setTotalDeliveryFee(totalDeliveryFee);
    setTotalPrice(totalprice);
    setOrderInfo({
      oUseMile: 0,
      oGetMile: Math.ceil(totalprice * 0.03),
      oMethod: "",
    });
    getAddr();
  }, []);

  return (
    <div className={classes.order}>
      <div className={classes["order-title"]}>
        <h3>주문 / 결제</h3>
      </div>
      {/* 구매자 정보 컴포넌트 */}
      <OrderConsumer userData={user} />

      {/* 받는 사람 정보 컴포넌트 */}
      <OrderDeliveryInfo
        userData={user}
        addrData={addrData}
        onAddrChange={handleChangeAddr}
        onAddrDate={setAddrData}
      />

      {/* 배송 상품 정보 컴포넌트 */}
      <OrderProduct orderData={orderData} />

      {/* 결제 정보 컴포넌트 */}
      <OrderPaymentInfo
        totalDeliveyFee={totalDeliveyFee}
        totalPrice={totalPrice}
        userData={user}
        orderInfo={orderInfo}
        useMileInput={useMileInput}
        onMileInput={setUseMileInput}
        onUseMile={handleUseMileClick}
        onOrderMethod={hadleOrderMethod}
      />

      <div className={classes["order-control"]}>
        <button className={classes["order-control-cancle"]}>취소</button>
        <button
          className={classes["order-control-buy"]}
          onClick={handleOrderSubmit}
        >
          결제
        </button>
      </div>
    </div>
  );
};

export default Order;
