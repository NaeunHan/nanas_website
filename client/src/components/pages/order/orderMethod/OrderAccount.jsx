import React from "react";
import { useState } from "react";
import { bankOption } from "../../../../util/payment";

import Card from "../../../UI/Card";

import classes from "./OrderAccount.module.css";

const OrderAccount = () => {
  return (
    <Card className={classes.orderAccount}>
      <span>은행선택</span>
      <select>
        {bankOption.map((it, idx) => (
          <option key={idx} value={it}>
            {it}
          </option>
        ))}
      </select>
    </Card>
  );
};

export default OrderAccount;
