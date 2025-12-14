import React from "react";

import classes from "./OrderConsumer.module.css";

const OrderConsumer = ({ userData }) => {
  return (
    <div className={classes["orderConsumer"]}>
      <h4>구매자 정보</h4>

      <table className={classes["orderConsumer-table"]}>
        <tbody>
          <tr>
            <td className={classes["orderConsumer-table__col1"]}>이름</td>
            <td className={classes["orderConsumer-table__col2"]}>
              {userData.uName}
            </td>
          </tr>
          <tr>
            <td className={classes["orderConsumer-table__col1"]}>이메일</td>
            <td className={classes["orderConsumer-table__col2"]}>
              {userData.uEmail}
            </td>
          </tr>
          <tr>
            <td className={classes["orderConsumer-table__col1"]}>연락처</td>
            <td className={classes["orderConsumer-table__col2"]}>
              {userData.uPhone}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderConsumer;
