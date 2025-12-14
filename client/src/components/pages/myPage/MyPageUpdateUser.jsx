import React, { useEffect } from "react";
import { useState } from "react";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import MyPageCheckPw from "./MyPageCheckPw";
import MyPagePassPw from "./MyPagePassPw";

const MyPageUpdateUser = () => {
  const [userPw, setUserPw] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);

  return (
    <React.Fragment>
      <div>
        {!userPw ? (
          <MyPageCheckPw setUserPw={setUserPw} user={user} />
        ) : (
          <MyPagePassPw user={user} setUserPw={setUserPw} />
        )}
      </div>
    </React.Fragment>
  );
};

export default MyPageUpdateUser;
