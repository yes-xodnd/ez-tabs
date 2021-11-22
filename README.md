# EZ Tabs: Tabs and Bookmarks Manager Extension

![image (1)](../../../../Downloads/image (1).png)

EZ Tabs는 탭과 북마크를 키보드로 간편하게 관리할 수 있는 크롬 확장 프로그램입니다. 

## Installation

[크롬 웹 스토어](https://chrome.google.com/webstore/detail/ez-tabs-tabs-bookmarks-ma/pefabcpjihpcagbcdcjpedppcfmmlonh/related?hl=ko)에서 설치할 수 있습니다.

## Installation (local)

- 저장소를 클론하고 빌드합니다.

``` bash
git clone https://github.com/yes-xodnd/ez-tabs
cd ez-tabs
npm install
npm run build
```

- [chrome extension page](chrome://extensions)로 이동해 개발자 모드를 활성화합니다.
- `압축해제된 확장 프로그램을 로드합니다` 버튼을 눌러 빌드된 폴더를 선택하면 확장 프로그램 목록에 추가됩니다.
- 주소표시줄 옆에 추가된 확장 프로그램 아이콘을 눌러 EZ Tabs를 사용할 수 있습니다.

## Features

### Tabs manager

- 탭 목록을 확인하고, 탭을 열거나 닫을 수 있습니다.
- 체크박스로 탭을 선택해 여러 개의 탭을 한꺼번에 종료할 수 있습니다.
- 체크박스로 탭을 선택해 북마크에 스냅샷으로 저장할 수 있습니다.
- 키워드로 탭을 검색할 수 있습니다.

### Bookmarks Manager

- 북마크 트리를 탐색할 수 있습니다.
- 체크박스로 북마크 아이템을 선택해 여러 개의 항목을 삭제하거나 이동할 수 있습니다.
- 북마크 아이템의 이름을 변경할 수 있습니다.
- 키워드로 북마크를 검색할 수 있습니다.

## Hotkeys

### App

- `Ctrl`+`Shift`+`Y` : EZ Tabs를 엽니다.
- `PageUp` / `PageDown` : 북마크-탭 뷰를 토글합니다.
- `Shift`+`F` : 포커스를 검색 바로 이동합니다.

### Navigation

- `ArrowUp` / `ArrowDown` : 위/아래로 포커스를 이동합니다.
- `Home` / `End` : 위/아래쪽 방향 맨 끝으로 포커스를 이동합니다.
- `Backspace` : 북마크에서 상위 폴더로 이동합니다.

### Interaction

- `Space` : 포커스된 항목을 체크합니다.
- `Enter` :
  - 포커스된 탭을 엽니다.
  - 포커스된 북마크 주소로 새 창을 엽니다.
- `Delete`: 포커스된 항목을 제거합니다.
- `Ctrl`+`Delete` : 체크된 항목들을 제거합니다.
- `Ctrl`+`A`: 목록을 전체 체크 / 전체 체크 취소합니다.
- `Ctrl`+`Enter` : 
  - 탭에서 체크된 항목들을 북마크에 저장합니다.
  - 북마크에서 전체 북마크 목록을 표시합니다.
- `Ctrl`+`Insert` :  북마크에서 현재 폴더에 새 폴더를 추가합니다.

