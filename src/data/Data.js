import {
  UilEstate,
  UilClipboardAlt,
  UilBlogger,
  UilUser,
  UilBookOpen,
  UilMoneyWithdrawal,
  UilBookReader,
  UilUsdSquare
} from "@iconscout/react-unicons";


export const cardsData = [
  {
    title: "Courses",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "537",
    png: UilBookOpen,
    series: [
      {
        name: "Course",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "User",
    color: {
      backGround: "linear-gradient(180deg, #03A9F4 0%, #00BCD4 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "1642",
    png: UilUser,
    series: [
      {
        name: "User",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Post",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "324",
    png: UilBlogger,
    series: [
      {
        name: "Post",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Instructor",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "512",
    png: UilBookReader,
    series: [
      {
        name: "Instructor",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

export const UpdatesData = [
  {
    img: "/assets/img/img1.png",
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: "/assets/img/img2.png",
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: "/assets/img/img3.png",
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];