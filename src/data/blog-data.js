import axios, {isCancel, AxiosError} from 'axios';
axios.get('https://drawproject-production.up.railway.app/api/v1/post')
  .then(function (response) {
     var result = response.data;
    console.log(result);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
const blog_data = [
  {
    id: 1,
    date: "Jan 21 , 2022",
    img: "/assets/img/bg/blog-img-01.jpg",
    title: "Educational Technology & Mobile Learning",
    des: "Dramatically supply transparent deliverab before & you backward comp internal.",
  },
  {
    id: 2,
    date: "Jan 21 , 2022",
    img: "/assets/img/bg/blog-img-02.jpg",
    title: "Computer Technology &  Fild Work Experiences",
    des: "Dramatically supply transparent deliverab before & you backward comp internal.",
  },
  {
    id: 3,
    date: "Jan 21 , 2022",
    img: "/assets/img/bg/blog-img-03.jpg",
    title: "Engineering Technology & Academic Learning",
    des: "Dramatically supply transparent deliverab before & you backward comp internal.",
  },
 
];
export default blog_data;
