const week = ["일", "월", "화", "수", "목", "금", "토"];

const newDate = new Date();
newDate.setDate(newDate.getDate() + 3);

const month = newDate.getMonth();
const date = newDate.getDate();
const day = newDate.getDay();

export const deliveryDate = `${month + 1}월 ${date}일 ${week[day]}요일`;
