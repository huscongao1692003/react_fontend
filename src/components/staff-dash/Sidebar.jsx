import React, { useState } from "react";
import Link from "next/link";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt
} from "@iconscout/react-unicons";
import MainDash from "./MainDash";
import Table from './Table/Table';
import Courses from '../Table/Courses';
import Post from "../Table/Post";
import Instructor from "./Table/Instructor"




const MenuItems = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    content: <MainDash />,
  },
  {
    icon: UilClipboardAlt,
    heading: "Orders",
    content: <Table/>,
  },
  {
    icon: UilUsersAlt,
    heading: "Instructor",
    content: <Instructor/>,
  },
  {
    icon: UilPackage,
    heading: 'Courses',
    content: <Courses/>,
  },
  {
    icon: UilChart,
    heading: 'Post Manager',
    content: <Post/>,
  },
];

const SidebarStaff = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className='Sidebar'>
      <div className='logo'>
        <Link href="/">
          <img src='/assets/img/logo/logo-black.png' alt='logo' />
        </Link>
        <span></span>
      </div>
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
      </div>
    </div>
  );
}

export default SidebarStaff;