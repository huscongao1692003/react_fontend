import React, { useState } from "react";
import Link from "next/link";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilAt,
  UilMoneyWithdrawal,
  UilUsdSquare
} from "@iconscout/react-unicons";
import MainDash from "../MainDash/MainDash";
import Table from '../Table/Table';
import User from '../Table/User'
import Courses from "../Table/Courses"
import Contact from "../Table/Contact";
import Postbox from "@/src/components/blog/postbox";
import Post from "../Table/Post"
const MenuItems = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    content: <MainDash />,
  },
  {
    icon: UilClipboardAlt,
    heading: "Posts",
    content: <Postbox/>,
  },
  {
    icon: UilClipboardAlt,
    heading: "Posts Manager",
    content: <Post/>,
  },
  {
    icon: UilUsersAlt,
    heading: "Customers",
    content: <User/>,
  },
  {
    icon: UilUsersAlt,
    heading: "Order",
    content: <Table/>,
  },
  {
    icon: UilPackage,
    heading: 'Courses',
    content: <Courses/>,
  },
  {
    icon: UilAt,
    heading: 'Contact msg',
    content: <Contact/>,
  },
];

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className='Sidebar'>
      <div className='logo'>
        <Link href="/">
          <img src='/assets/img/logo/logo-black.png' alt='logo' />
        </Link>
        <span></span>
      </div>
      <div className="columnView">
      <div className='menu'>
        {MenuItems.map((item, index) => {
          return (
            <div
              className={selected === index ? 'menuItem active' : 'menuItem'}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>
                {item.heading}
              </span>
            </div>
          )
        })}
        
      </div>
      <div className="content">
        {MenuItems[selected] && MenuItems[selected].content}
      </div></div>
    </div>
  );
}

export default Sidebar;