import React, { useState } from "react";
import { clause, personalInfo } from "../../../util/clause";

import classes from "./RegistClause.module.css";
import RegistSection from "./RegistSection";

const RegistClause = ({ checkedItems, onCheckedItems }) => {
  // 약관 체크(모두 동의) State
  const [isAllChecked, setIsAllChecked] = useState(false);

  // 약관 체크
  const handleChecked = (checked, id) => {
    if (checked) {
      if (id === "allCheck") {
        setIsAllChecked(true);
        onCheckedItems(["check1", "check2"]);
        return;
      }
      onCheckedItems([...checkedItems, id]);
    } else {
      if (id === "allCheck") {
        setIsAllChecked(false);
        onCheckedItems([]);
        return;
      }

      onCheckedItems(checkedItems.filter((it) => it !== id));
    }
  };

  return (
    <RegistSection title="2 약관동의">
      <div className={classes.RegistClause}>
        <div className={classes["RegistClause-contentWrap"]}>
          <div className={classes["RegistClause-content-check"]}>
            <input
              type="checkbox"
              onChange={(e) => handleChecked(e.target.checked, "allCheck")}
            />
            전체 약관에 동의합니다.
          </div>

          <h3 className={classes["RegistClause-title"]}>
            이용약관 동의 <span>(필수)</span>
          </h3>
          <div className={classes["RegistClause-content"]}>
            <p>{clause}</p>
          </div>
          <div className={classes["RegistClause-content-check"]}>
            <input
              type="checkbox"
              onChange={(e) => handleChecked(e.target.checked, "check1")}
              checked={
                isAllChecked
                  ? "checked"
                  : checkedItems.find((it) => it === "check1")
                  ? "checked"
                  : ""
              }
            />
            약관에 동의합니다.
          </div>

          <h3 className={classes["RegistClause-title"]}>
            개인정보 수집 및 이용 동의 <span>(필수)</span>
          </h3>
          <div className={classes["RegistClause-content"]}>
            <p>{personalInfo}</p>
          </div>
          <div className={classes["RegistClause-content-check"]}>
            <input
              type="checkbox"
              onChange={(e) => handleChecked(e.target.checked, "check2")}
              checked={
                isAllChecked
                  ? "checked"
                  : checkedItems.find((it) => it === "check2")
                  ? "checked"
                  : ""
              }
            />
            약관에 동의합니다.
          </div>
        </div>
      </div>
    </RegistSection>
  );
};

export default RegistClause;
