import { BookmarkNode } from "src/constants/types";

const tree = [
  {
    children: [
      {
        children: [
          {
            children: [
              {
                dateAdded: 1631599599991,
                id: "521",
                index: 0,
                parentId: "523",
                title: "NTS WIT블로그",
                url: "https://wit.nts-corp.com/",
              },
              {
                dateAdded: 1633423237967,
                id: "528",
                index: 1,
                parentId: "523",
                title: "NAVER D2",
                url: "https://d2.naver.com/home",
              },
              {
                dateAdded: 1633423256780,
                id: "529",
                index: 2,
                parentId: "523",
                title: "우아한형제들 기술블로그",
                url: "https://techblog.woowahan.com/",
              },
              {
                dateAdded: 1633423276646,
                id: "530",
                index: 3,
                parentId: "523",
                title: "kakao",
                url: "https://tech.kakao.com/blog/",
              },
              {
                dateAdded: 1633423297529,
                id: "531",
                index: 4,
                parentId: "523",
                title: "Blog - LINE ENGINEERING",
                url: "https://engineering.linecorp.com/ko/blog/",
              },
            ],
            dateAdded: 1631599622052,
            dateGroupModified: 1633423297529,
            id: "523",
            index: 1,
            parentId: "1",
            title: "기술블로그",
          },
        ],
        dateAdded: 1502178686920,
        dateGroupModified: 1633423237967,
        id: "1",
        index: 0,
        parentId: "0",
        title: "북마크바",
      },
      {
        children: [],
        dateAdded: 1502178686920,
        dateGroupModified: 1527089067400,
        id: "2",
        index: 1,
        parentId: "0",
        title: "기타 북마크기타 북마크기타 북마크기타 북마크기타 북마크기타 북마크기타 북마크",
      },
    ],
    dateAdded: 1632132931330,
    id: "0",
    title: "",
  },
];

const getTree = () => new Promise<BookmarkNode[]>(resolve => resolve(tree)); 

export default getTree;
