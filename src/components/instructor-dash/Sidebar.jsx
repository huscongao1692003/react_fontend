"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilBars,
  UilSignOutAlt
} from "@iconscout/react-unicons";
import MainDash from "./MainDash";
import Table from './Table/Table';
import Courses from './Table/Courses';
import Post from "../Table/Post";
import Orders from "./Table/Orders"
import CourseCreateArea from "../course-create/course-create-area"; 
import { motion } from "framer-motion";
import InstructorReport from "../Table/InstructorReport";

const SidebarInstructor = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState("");
  const MenuItems = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      content: <MainDash />,
    },
    {
      icon: UilEstate,
      heading: "Report",
      content: <InstructorReport />,
    },
    {
      icon: UilClipboardAlt,
      heading: "Orders",
      content: <Orders />,
    },
    {
      icon: UilClipboardAlt,
      heading: "Create Course",
      content: <CourseCreateArea />,
    },
    {
      icon: UilPackage,
      heading: 'Courses',
      content: <Courses setSelected={setSelected} />,
    },
    {
      icon: UilChart,
      heading: 'Post Manager',
      content: <Post />,
    },
  ];

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
    <div className='Sidebar'>
      
      <div className="columnView">
        <motion.div className='menu'
          variants={SidebarVariants}
          animate={animate}><div className='logo'>
        <Link href="/">
          <img src='/assets/img/logo/logo-black.png' alt='logo' />
        </Link>
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
                <span>
                  {item.heading}
                </span>
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

export default SidebarInstructor;