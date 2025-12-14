import React from "react";

import Card from "../../UI/Card";

import classes from "./MyPageWriteForm.module.css";

const MyPageWriteForm = ({
  setBboardtype,
  setBcontent,

  optionItem,
  orderData,
}) => {
  return (
    <React.Fragment>
      <Card className={classes["write-wrap-content"]}>
        <div className={classes["write-content-label"]}>
          <div>제목</div>
          <div>
            <input
              type="text"
              name="bTitle"
              defaultValue={orderData.title}
              readOnly
            />
          </div>
        </div>
        <div className={classes["write-content-label"]}>
          <div>유형</div>
          <div>
            <select
              name="bBoardtype"
              onChange={(e) => setBboardtype(e.target.value)}
            >
              {optionItem.map((item, key) => {
                return (
                  <option key={key} value={item.value}>
                    {item.option}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={classes["write-content-label"]}>
          <div>내용</div>
          <div>
            <textarea
              name="bContent"
              onChange={(e) => setBcontent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </Card>
      <div className={classes["write-content-button"]}>
        <button type="submit">작성하기</button>
      </div>
    </React.Fragment>
  );
};

export default MyPageWriteForm;
