
const menu_data = [
  {
    id: 1,
    title: "Home",
    link: "/",
    has_dropdown: true,
    sub_menus: [
      // { link: "/", title: "Home" },
    ],
  },
  {
    id: 2,
    title: "Contact Us",
    link: "/contact",
    has_dropdown: true,
    sub_menus: [
      // { link: "/about", title: "About" },
      { link: "/contact", title: "Contact" },
      { link: "/faq", title: "FAQ" },
      // { link: "/register", title: "Register" },
      // { link: "/sign-in", title: "Sign In" },
    ],
  },
  {
    id: 3,
    title: "Instructor",
    link: "/instructor",
    has_dropdown: true,
 sub_menus: [
      // { link: "/instructor", title: "Instructor" },
      // { link: "/instructor-profile", title: "Instructor Profile" },
    ],
  },
  {
    id: 4,
    title: "Course",
    link: "/course-list",
    has_dropdown: false,
    sub_menus: [
//      { link: "/course-create", title: "Create Course" },
      // { link: "/course-grid", title: "Course Grid" },
      // { link: "/course", title: "Course List" },
      // { link: "/course-details", title: "Course Details" },
    ],
  },
  {
    id: 5,
    title: "Blog",
    link: "/blog",
    has_dropdown: true,
    sub_menus: [
      // { link: "/blog", title: "Blog Sidebar" },
      // { link: "/blog-grid", title: "Blog Grid" },
      // { link: "/blog-masonry", title: "Blog Masonry" },
      // { link: "/blog-details", title: "Blog Details" },
    ],
  },

];

const menu_role_customer = [
  {
    key: '1',
    label: (
      <a href="/Settings">
        Profile
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a href="/create-post">
        Create-post
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a href="/view-post">
        View-post
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a href="/my-courses">
        My courses
      </a>
    ),
  },
  {
    key: '5',
    label: (
      <a href="/my-orders">
        My orders
      </a>
    ),
  },
]

const menu_role_manage = [
  {
    key: '1',
    label: (
      <a href="/Settings">
        Profile
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a href="/dashboard">
        Dashboard
      </a>
    ),
  },
]

const menu_role_instructor = [
  {
    key: '1',
    label: (
      <a href="/Settings">
        Profile
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a href="/create-post">
        Create-post
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a href="/view-post">
        View-post
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a href="/view-instructor-courses">
        My courses
      </a>
    ),
  },
  {
    key: '5',
    label: (
      <a href="/course-create">
        Create course
      </a>
    ),
  },
  {
    key: '6',
    label: (
      <a href="/my-collection">
        Edit Collection
      </a>
    ),
  },
  {
    key: '7',
    label: (
      <a href="/my-orders">
        Dashboard
      </a>
    ),
  },
]

export default menu_data;
export { menu_role_customer, menu_role_instructor, menu_role_manage}
