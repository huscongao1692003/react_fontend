import {
  UilBlogger,
  UilUser,
  UilBookOpen,
  UilBookReader,
  UilStar,
} from "@iconscout/react-unicons";


export const cardsData = [
  {
    title: "Student",
    color: {
      backGround: "linear-gradient(180deg, #03A9F4 0%, #00BCD4 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "0",
    png: UilUser,
  },
  {
    title: "Courses",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "0",
    png: UilBookOpen,
  },
  {
    title: "Post",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "0",
    png: UilBlogger,
  },
  {
    title: "Total income",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "0",
    png: UilBookReader,
  },
  {
    title: "Star",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "0",
    png: UilStar,
  },
];
