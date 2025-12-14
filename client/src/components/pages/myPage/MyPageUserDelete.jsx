import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageCheckPw from "./MyPageCheckPw";
import classes from "./MyPageUserDelete.module.css";

import axios from "axios";
import { getUser } from "../../../util/getUser";
import { authCheck, handleLogout } from "../../../util/authCheck";

const MyPageUserDelete = () => {
  const [userPw, setUserPw] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const deleteUser = async (e) => {
    e.preventDefault();

    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      await axios
        .post("http://localhost:5000/mypage/api/deleteuser", { user })
        .then((response) => {
          if (response.data.status === 200) {
            handleLogout();
            alert(response.data.message);
          } else {
            navigate(-1, { replace: true });
          }
        });
    }
  };

  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);

  return (
    <React.Fragment>
      <div className={classes.MyPageUserDelete}>
        {!userPw ? (
          <div className={classes.checkwrap}>
            <MyPageCheckPw setUserPw={setUserPw} userPw={userPw} user={user} />
          </div>
        ) : (
          <div className={classes["delete-wrap-content"]}>
            <div>
              <h2>회원 탈퇴처리를 하실려면 확인 버튼을 눌러주세요.</h2>
            </div>

            <form action="" onSubmit={deleteUser}>
              <div className={classes["delete-wrap-button"]}>
                <div>
                  <button type="submit">확인</button>
                  <button
                    type="button"
                    onClick={() => navigate("/mypage", { replace: true })}
                  >
                    취소
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MyPageUserDelete;
