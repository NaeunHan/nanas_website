import axios from "axios";

export const getBoard = async (setBoarData) => {
  await axios
    .get("http://localhost:5000/mypage/api/boardlist", {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.status === 200) {
        setBoarData(response.data.data);
      }
    });
};
