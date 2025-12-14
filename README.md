## 쇼핑몰 환경 구성하기 

 ### 1-1  개발환경 체크 
 
[주의사항] </br>
* 해당 프로젝트는 5000번 port를 사용하여 서버와 통신하여 개발을 진행합니다. mac의 경우 AirPlay에서 5000번 port를 사용하기 때문에 수신을 끄고 서버 실행 시 해당 포트 사용이 가능합니다.

 
 #### * 개발환경
* JavaScript
* FrameWork - React.js
* node.js - Express를 활용한 서버 개발
* Database : MySQL


## 3. 프로젝트 주요기능
 ### 3-1 메인 페이지
 * react-slick API를 사용한 광고 배너

 ### 3-2 로그인
 * DB 검증
 * 로그인 시 쿠키 및 세션 생성

 ### 3-3 회원가입
 * react-daum-postcode API를 사용
 * 아이디 중복검사를 위한 DB 검증
 * 각 입력 요소에 따른 유효성 피드백
 
 ### 3-4 검색
 * 검색어가 상품 카테고리, 상품명, 판매처에 해당하는지 확인을 위한 DB 검증
 
 ### 3-5 상품 상세 페이지
 * 상품에 대한 리뷰와 문의 기능을 위한 DB 연동
 * react-pagination API 사용

 ### 3-6 베스트 상품 페이지
 * 판매량이 가장 높은 상품 100개 노출
 * react-infinite-scroll-component API를 사용

 ### 3-7 카테고리 상품 페이지
 * react-infinite-scroll-component API를 사용

 ### 3-8 장바구니 페이지
 * 상품 삭제와 결제를 위한 체크 기능 구현

 ### 3-9 주문 / 결제 페이지
 * 사용자 정보 반영을 위한 DB 연결
 * 마일리지 유효성 검사

 ### 3-9=10 관리자 페이지
 * 상품관리, 주문관리, 게시글 관리에서 해당 데이터 수정시 관련 DB 업데이트
 * react-pagination API 사용
 
