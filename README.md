# To Do List📝

[![Netlify Status](https://api.netlify.com/api/v1/badges/b4d2198c-d1a5-42e1-aa9c-87325b93c4af/deploy-status)](https://app.netlify.com/sites/sparkling-kangaroo-110e7a/deploys)
데모사이트 : [DEMO](https://sparkling-kangaroo-110e7a.netlify.app/)

작업기간 : 23.01.16 ~ 23.01.17 (총 2일)

사용언어 : `html` `scss` `javascript`

목표 : 주어진 API를 활용해 서버에 데이터가 저장되는 TODO LIST페이지를 구현

작업내용 : 
- 제공받은 API를 통해 서버와 다양한 방법으로 데이터 통신을 할 수 있었음
- To Do 아이템을 추가하고 작성 된 아이템을 수정, 삭제 할 수 있도록 함
- 보기 방식을 설정하여 완료한 일정과 미완료 일정을 나누어 볼 수 있음
- 일정 갯수 이상의 아이템이 쌓이면 안쪽으로 스크롤이 생성
- 데이터를 불러오는 동안 로딩아이콘이 나타남
- scss를 사용하여 스타일 적용
- parcel 을 활용하여 작업

추가 작업예정 : 드래그 등을 통해 아이템의 순서를 변경할 수 있도록 함

---

❗ 필수

- [x] 할 일 목록(List)이 출력돼야 합니다.
- [x] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다.
- [x] 할 일 항목을 수정할 수 있어야 합니다.
- [x] 할 일 항목을 삭제할 수 있어야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

❔ 선택

- [ ] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요.([SortableJS](http://sortablejs.github.io/Sortable/))
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [x] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [x] 할 일 항목의 최신 수정일을 표시해보세요.
- [x] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [ ] 할 일과 관련된 기타 기능도 고려해보세요.

---

## 🧡페이지 소개

### 💛기본화면

![default](https://user-images.githubusercontent.com/112364408/213119772-523ca6f8-9c65-43fb-b3f1-dbbc0c724ae9.png)

저장된 일정데이터가 하나도 없을 때 보여지는 기본화면입니다.
화면중앙의 '새로운 일정을 추가해보세요' 문구를 클릭하면 아래의 인풋요소에 focus 됩니다

---

### 💛일정추가

![addtodo](https://user-images.githubusercontent.com/112364408/213119775-67e3f3a5-be1c-4910-8792-b6cf3a76df83.png)

일정이 추가 되었을 때 입니다
전체선택 버튼이 나타나고 중앙의 일정추가 문구가 사라집니다
각 일정에는 생성일자와 수정일자가 함께 표기됩니다

---

### 💛로딩

![loading](https://user-images.githubusercontent.com/112364408/213120417-722fe12f-11aa-41d8-873c-6e82e77ea281.png)

일정을 불러오는 동안 하당에 로딩 아이콘이 나타납니다

---

### 💛수정

![edit](https://user-images.githubusercontent.com/112364408/213120723-55d20b8f-6fae-407f-98d9-d7a48d63631e.png)

수정버튼을 누르면 해당 아이템의 타이틀이 포커싱되며 수정 가능한 상태로 전환됩니다
수정완료후 엔터버튼 혹은 바깥영역 부분을클릭 하면 수정모드가 끝납니다

---

### 💛전체삭제

![delete](https://user-images.githubusercontent.com/112364408/213121221-8af00fdb-ccaa-4591-8cf7-aaf45fa3093d.png)

전체삭제를 누르면 정말로 삭제를 원하는지 재확인을 위한 confirm창을 띄운 후 수락하면 아이템이 전부 삭제됩니다

---

### 💛보기설정

![options](https://user-images.githubusercontent.com/112364408/213122304-1939c742-741a-4fb1-a377-36c4a0f22485.png)

아래의 선택창을 통해 완료일정과 미완료 일정을 나누어 볼 수 있습니다

---

### 💛스크롤 

![scroll](https://user-images.githubusercontent.com/112364408/213122537-8fa3c117-7adb-41f8-8cdd-9eacbd5e487c.png)

일정의 갯수가 많아져 지정된 창의 높이를 넘어서면 스크롤바가 활성화됩니다