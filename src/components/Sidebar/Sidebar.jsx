import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilAt,
  UilBars,
  UilShoppingCartAlt,
  UilUserPlus,
} from "@iconscout/react-unicons";
import { motion } from "framer-motion";
//  import Home from "../";
import MainDash from "../MainDash/MainDash";
import Table from '../Table/Table';
import User from '../Table/User'
import Courses from "../Table/Courses"
import Contact from "../Table/Contact";
import Postbox from "@/src/components/blog/postbox";
import Post from "../Table/Post"
import ReportUser from "../Table/ReportUser";
import RegisterhtmlForm from "../form/staff-account-form";

const MenuItems = [
  // {
  //   icon: UilEstate,
  //   heading: "Home",
  //   content: <Home />,
  // },

  {
    icon: UilEstate,
    heading: "Dashboard",
    content: <MainDash />,
  },
  {
    icon: UilClipboardAlt,
    heading: "Report",
    content: <ReportUser />,
  },
  {
    icon: UilClipboardAlt,
    heading: "Posts Manager",
    content: <Post />,
  },
  {
    icon: UilUsersAlt,
    heading: "User Manager",
    content: <User />,
  },
  {
    icon: UilShoppingCartAlt,
    heading: "Order",
    content: <Table />,
  },
  {
    icon: UilPackage,
    heading: 'Courses',
    content: <Courses />,
  },
  {
    icon: UilAt,
    heading: 'Contact msg',
    content: <Contact />,
  },
  {
    icon: UilUserPlus,
    heading: 'New Staff',
    content: <RegisterhtmlForm />,
  },
];

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState("");

  const SidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setAnimate(`${expanded}`);
      } else {
        setAnimate("");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [expanded]);

  return (
    <>
      <div className='Sidebar'>

        <div className="columnView">
          <motion.div
            className='menu'
            variants={SidebarVariants}
            animate={animate}
          >      <div className='logo'>
              <Link href="/">
                <img src='/assets/img/logo/logo-black.png' alt='logo' />
              </Link>
              <span></span>
            </div>
            <div
              className="bars"
              style={expanded ? { left: "60%" } : { left: "5%" }}
              onClick={() => setExpanded(!expanded)}
            >
              <UilBars />
            </div>
            {MenuItems.map((item, index) => (
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
            ))}
          </motion.div>
          <div className="content">
            {MenuItems[selected] && MenuItems[selected].content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;