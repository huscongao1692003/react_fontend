import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilBars,
  UilImages,
} from "@iconscout/react-unicons";
import MainDash from "./MainDash";
import Certificate from './Table/Certificate';
import Courses from '../Table/Courses';
import Post from "../Table/Post";
import Instructor from "./Table/Instructor"
import { motion } from "framer-motion";
import ReportUser from "../Table/ReportUser";

const MenuItems = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    content: <MainDash />,
  },
  {
    icon: UilUsersAlt,
    heading: "User Manager",
    content: <Instructor />,
  },
  {
    icon: UilClipboardAlt,
    heading: "Report",
    content: <ReportUser />,
  },
  {
    icon: UilPackage,
    heading: 'Courses',
    content: <Courses />,
  },
  {
    icon: UilChart,
    heading: 'Post Manager',
    content: <Post />,
  },
  {
    icon: UilImages,
    heading: 'Censorship',
    content: <Certificate />,
  },
];

const SidebarStaff = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);
 

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setExpanded(false);
        setSidebarOpen(false);
      }
    };

    const handleExpandButtonClick = (event) => {
      if (event.target.classList.contains("bars")) {
        setExpanded(true);
        setSidebarOpen(true);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleExpandButtonClick);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleExpandButtonClick);
    };
  }, []);

  return (
    <div className={`Sidebar ${sidebarOpen ? "darkBackground" : ""}`}>
      <div className="columnView">
        <motion.div
          className='menu'
          variants={SidebarVariants}
          animate={animate}
          ref={sidebarRef}
        >
                <div className='logo'>
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
          {MenuItems.map((item, index) => {
            return (
              <div
                className={selected === index ? 'menuItem active' : 'menuItem'}
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            )
          })}
        </motion.div>
        <div className="content">
          {MenuItems[selected] && MenuItems[selected].content}
        </div>
      </div>
    </div>
  );
}

export default SidebarStaff;