# 📚 Catch Study

**스터디카페 자리를 예약할 수 있는 웹 서비스**

https://catch-study.kro.kr/

스터디카페에 갔는데 자리가 없어 급하게 주변에 있는 다른 스터디카페를 찾아보신 경험이 있으신가요? 헛걸음하는 것을 방지하기 위해 스터디카페 좌석을 예약할 수 있는 서비스를 기획하게 되었습니다.

### 이 서비스를 이용하게 된다면

1. 이용자는 스터디카페 좌석 현황을 미리 파악하여 **시간을 절약**할 수 있습니다.
2. 관리자는 이용자들과의 1:1 채팅을 통해 **매장을 효율적으로 관리**할 수 있습니다.

# 🗓️ 개발 기간

전체 개발 기간: 2024-06-25 ~ 2024-08-09 (7주)

# 🙋‍♂️ 팀원 소개

| <img src="https://avatars.githubusercontent.com/u/79002373?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/101779861?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/62873417?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/48711163?v=4" width="150" height="150"/> |
|:------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|
| **FE 팀원: 조현정**<br/>[@HyunJungJo98](https://github.com/HyunJungJo98)                   | **FE 팀원: 유의진**<br/>[@ejinn1](https://github.com/ejinn1)                                | **BE 팀원: 이다은**<br/>[@llynn97](https://github.com/llynn97)                             | **BE 팀원: 김태훈**<br/>[@TaeHoon0](https://github.com/TaeHoon0)                           |


# 🤼 담당 기능

### 유의진

- UI
  - 메뉴 모달창
  - 관리자 입력/수정/조회 페이지
- 기능
  - 관리자 1:1 문의
  - 채팅
  - 관리자 업장 정보 입력/수정/조회

### 조현정

- UI
  - 메인 페이지
  - 스터디카페 상세보기
  - 예약 관리 페이지
  - 마이 페이지
  - 채팅 페이지
  - 예약페이지
  - 결제 페이지
- 기능
  - 스터디카페 목록 표시, 스터디카페 상세 정보 표시
  - 카카오 로그인, 구글 로그인
  - 로그아웃, 회원 탈퇴
  - 좌석과 스터디룸 예약
  - 카카오페이 결제
  - 현재 예약 내역 확인
  - 마이페이지 회원 정보 조회, 예약 내역 조회

# ⚙️ 설치, 실행 방법

### 설치

`git clone https://github.com/fourix4/Front-End.git`

`cd catch-study`

`yarn install`

### 실행

`yarn dev`

# 🛠️ 기술 스택

## Front-End

| 분류          | 기술 스택                                 |
| ------------- | ----------------------------------------- |
| Web           | React, TypeScript, jotai, tailwind, stomp |
| CI/CD         | Github Actions                            |
| Cloud Service | AWS EC2, AWS S3, AWS CodeDeploy, Nginx    |
| Common        | ESLint, Prettier                          |
| Design        | Figma                                     |

## Back-End

| 분류          | 기술 스택                                                                      |
| ------------- | ------------------------------------------------------------------------------ |
| frameworks    | Spring Boot, Spring Data JPA, Spring Security, Spring Quartz, STOMP, OAuth 2.0 |
| CI / CD       | Git Actions                                                                    |
| DataBase      | MySQL, Redis                                                                   |
| Cloud Service | AWS EB, AWS EC2, AWS Route53, AWS RDS, AWS S3                                  |

<details>
  <summary><h2>주요 기술 소개</h2></summary>
<div>

### React

- 상단 바, 모달 등 자주 사용되는 컴포넌트를 재사용하여 유지보수를 원활하게 하기 위해 사용했습니다.
- 컴포넌트를 동적으로 import하여 성능을 개선했습니다.

### TypeScript

- 하나의 스터디카페에도 영업 시간, 좌석 수, 주소 등 많은 정보가 포함되어 있습니다. 요청과 응답 과정에서 발생할 수 있는 오류를 줄이고, 협업 과정에서 혼선을 방지하고자 사용했습니다.
- 타입스크립트의 장점을 살리고자 any 사용을 최소화했습니다.

### tailwind

- Catch Study는 반응형으로 제작되었습니다. 반응형을 간편하고 빠르게 적용하기 위해 사용했습니다.

### jotai

- 채팅 상대방의 이름과, 채팅방의 id값을 전역으로 관리하기 위해 사용했습니다.
- 프로젝트에서 전역으로 관리해야 하는 상태가 많지 않았기 때문에, 가장 경량화된 상태 관리 라이브러리인 Jotai를 선택했습니다.

### Github Actions

- 주기적 배포를 위해 Github Actions를 사용하여 CI/CD를 구현했습니다.
- 빠른 배포로 테스트와 웹 성능을 개선할 때 시간을 절약할 수 있었습니다.

### SockJS + Stomp

- SockJS는 WebSocket을 사용하여 실시간 통신을 가능하게 하며, WebSocket을 지원하지 않는 브라우저에서도 안정적인 연결을 보장하기 위해 활용했습니다.
- Stomp는 메시지 프로토콜을 통해 클라이언트와 서버 간의 통신을 간편하고 일관되게 관리하기 위해 사용했습니다.

### Nginx

- 정적 파일을 안전하게 제공하기 위해 사용했습니다.
- gzip을 사용하여 데이터를 압축하여 LCP 성능을 높였습니다.
- HTTPS를 적용하고 리버스 프록시를 사용하여 API 서버와 통신했습니다.

</div>
</details>

# 🧬 프로젝트 구조

![image](https://github.com/user-attachments/assets/c6216c8e-0509-4012-b315-e91aace6a774)

# 🌟 기능

## 일반 사용자

- **스터디카페 목록 표시**: 시, 군/구, 동을 선택하면 해당 주소에 위치한 스터디카페 목록이 표시됩니다.
  
  <img src="https://github.com/user-attachments/assets/7f6ec2fd-1c16-4496-a061-fbce0066f1fb" width="390px"/>

- **스터디카페 상세 정보 표시**: 선택한 스터디카페의 상세 정보가 표시됩니다.

  <img src="https://github.com/user-attachments/assets/ba25d94f-6cb3-4606-b851-dcf3b760a28c" width="390px"/>

- **로그인**: 카카오 계정과 구글 계정으로 회원가입을 할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/a279960b-2c27-4b01-9a73-3458e2b55199" width="390px"/>

- **좌석 예약**: 사용 가능한 좌석과 시간을 선택하여 예약할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/e5123ff1-ccfb-4b71-982d-5e726cc39713" width="390px"/>
  
  <img src="https://github.com/user-attachments/assets/c035678a-8990-4807-9950-325b10befd87" width="390px"/>

- **스터디룸 예약**: 예약 가능한 시간을 선택하여 예약할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/bee047e2-7844-4d3c-95a5-70b2b8d10736" width="390px"/>
  
  <img src="https://github.com/user-attachments/assets/fed69b1f-a0a3-4d62-b05e-c4d62acd0f44" width="390px"/>

- **결제**: 카카오 페이를 사용하여 간편 결제를 할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/60804755-34e5-4a24-bf2c-c59024a3f709" width="390px"/>
  
  <img src="https://github.com/user-attachments/assets/713181fe-ae8d-4329-a2b3-587a7b503758" width="390px"/>

- **현재 예약 내역 확인**: 현재 예약한 내용을 확인하고 인증번호를 통해 출입할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/720cafd4-cb29-44cd-b49f-2d4203794466" width="390px"/>

- **관리자 1:1 문의**: ‘관리자 1:1 문의’ 버튼을 누르면 해당 스터디카페 관리자와의 채팅방이 개설됩니다.

  <img src="https://github.com/user-attachments/assets/57b4271a-8c6c-42ac-91f1-f65daa3c4df6" width="390px"/>

- **채팅**: 해당 스터디카페의 관리자에게 실시간으로 문의를 남길 수 있습니다.

  <img src="https://github.com/user-attachments/assets/a6b953d2-e0a1-49a4-87a7-df4cb5b03bfd" width="390px"/>

- **예약 내역 조회**: 처음에 최근 30개 예약 내역을 표시하고 이후 날짜를 선택하면 해당 기간 안의 예약 내역을 표시합니다.

  <img src="https://github.com/user-attachments/assets/bf5c1dec-267c-403f-8f05-909031ea1842" width="390px"/>

## 스터디카페 관리자

- **스터디카페 정보 조회**: 현재 자신이 운영 중인 스터디카페의 상태를 확인할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/e41c0ae0-74e5-4afd-8538-c869303f4015" width="390px"/>

- **스터디카페 정보 입력**: 새로운 스터디카페를 등록할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/2be336bd-31fe-47d8-bc90-569998c4288d" width="390px"/>

- **스터디카페 정보 상세보기**: 상세보기 버튼을 누르면 해당 스터디카페의 상세 정보를 확인할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/6589d809-c306-4cd5-b103-4f9f81db8140" width="390px"/>

- **스터디카페 정보 수정**: 상세보기 페이지에서 수정하기 버튼을 누르면 해당 스터디카페의 정보를 수정할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/cfb16218-6c36-4ab7-99f3-083059d46d7c" width="390px"/>

- **채팅**: 스터디카페를 이용 중인 고객에게 실시간으로 문의를 답변할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/61b3d2f0-9e65-48c3-9f90-1c6f84241347" width="390px"/>
  
  <img src="https://github.com/user-attachments/assets/ed179b8f-d320-47e8-8afd-2754d0d83034" width="390px"/>

