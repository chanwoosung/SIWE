# 프론트엔드 개발 과제 (채용)

## 과제 시나리오

디자인은 tailwind UI를 사용하여 현재 컨크릿과 다른 UI로 구성하기

### `SIWE(Sign In With Ethereum)` 구현 (메타마스크 연결 + 토큰 기반 인증 구현)

- 메타마스크와 연결하기
- 연결된 publicAddress에 맞는 nonce 값을 서버에서 받아오기
- 가져온 nonce 값에 지갑 서명(sign message)을 하여 signature 생성하기
- nonce, signature을 가지고 서버에서 accessToken, refreshToken 받아오기
- API 요청 Header의 Authorization 필드에 accessToken 세팅하기 (*인증 type은 bearer*)
- 새로고침해도 로그인이 유지되도록 하기

### `tailwind css` 를 사용하여 CSS 구현

1. 내 NFT 확인하기 구현
- 서버에서 현재 로그인한 계정의 NFT 가져와서 보여주기
2. 내 NFT의 상세 정보 페이지 구현
    - 메타데이터 정보를 화면에 보여주기
    - 전송하기 버튼 생성
3. 내 NFT 전송하기
    - `react-hook-form` 라이브러리를 활용하여 전송받을 주소 입력 폼 생성하기
    - 전송받을 주소에 대한 validate 추가하기
        - required
        - 유효한 address를 입력했는지 여부
        - 현재 로그인한 계정의 public address와 같지 않은지 여부
    - ERC721 컨트랙트의 `transferFrom` method를 호출하여 입력받은 주소로 전송하기

`https://www.notion.so/likelion/2f3bb73ea6a6431998b84bb8e448ba49`
