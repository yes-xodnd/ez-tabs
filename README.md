# EZ Tabs: Tabs and Bookmarks Manager Extension

EZ Tabs는 탭 및 북마크 관리자 크롬 확장 프로그램입니다.

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

- 탭 목록을 쉽게 확인하고 이동할 수 있습니다.
- 체크박스로 탭을 선택해 여러 개의 탭을 한꺼번에 종료할 수 있습니다.
- 체크박스로 선택된 탭들을 북마크에 스냅샷으로 저장할 수 있습니다.
- 그리드 또는 목록 뷰를 선택할 수 있습니다.

### Bookmarks Manager

- 북마크 트리를 탐색할 수 있습니다.
- 체크박스로 북마크 아이템을 선택해 여러 개의 항목을 삭제하거나 이동할 수 있습니다.
- 북마크 아이템의 이름을 변경할 수 있습니다.

### Hotkey

- `ArrowUp` / `ArrowDown` : 선택된 윈도우의 목록을 탐색할 수 있습니다.
- `Enter` : 목록에서 포커스된 항목을 선택할 수 있습니다.
- `Delete` : 체크된 항목이 있다면 체크된 항목들을, 없다면 현재 포커스된 항목을 삭제/종료합니다.