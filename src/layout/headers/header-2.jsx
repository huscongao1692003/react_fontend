import useSticky from "@/hooks/use-sticky";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import NavMenu from "./nav-menu";
import Sidebar from "./sidebar";
import {useRouter} from 'next/router';
import { UilSignOutAlt } from '@iconscout/react-unicons'
import Dropdown from 'react-bootstrap/Dropdown';
import dynamic from "next/dynamic";
import SearchBar from "@/src/layout/headers/SearchBar";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";


const Header = () => {
    const {sticky} = useSticky()
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();
    const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
    const role = typeof window !== 'undefined' ? localStorage.getItem("roles") : null;
    const [isSearching, setIsSearching] = useState(false);
    const avatar = typeof window !== 'undefined' ? localStorage.getItem('avatar') : null;

    const handleLogout = () => {
        localStorage.clear();
        router.push('/');
    };

    return (
        <>
            <header className="header__transparent " style={{backgroundColor: "rgba(36, 93, 81, 0.80)"}}>
                <div className="header__area">
                    <div className={`main-header header-xy-spacing ${sticky ? "header-sticky" : ""}`}
                         id="header-sticky">
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-6">
                                    <div className="logo-area d-flex align-items-center">
                                        <div className="logo">
                                            <Link href="/">
                                                <img src="/assets/img/logo/logo.png" alt="logo"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-xxl-9 col-xl-9 col-lg-7 col-md-6 col-6 d-flex align-items-center justify-content-end">
                                    <div className="main-menu d-flex justify-content-end mr-15">
                                        <nav id="mobile-menu" className="d-none d-xl-block">
                                            <NavMenu/>
                                        </nav>
                                    </div>
                                    <div className="header-right d-md-flex align-items-center">
                                        <div className="header__search d-none d-lg-block">
                                            <form onSubmit={e => e.preventDefault()}>
                                                <div className="header__search-input">
                                                    <button className="header__search-btn" style={{zIndex: "1", backgroundColor: "transparent"}}>
                                                      {isSearching ? 
                                                        <i className="fa-solid fa-spinner fa-spin"></i> 
                                                        :
                                                        <i className="fa-regular fa-magnifying-glass"></i>
                                                    
                                                      }
                                                    </button>
                                                    <SearchBar setIsSearching={ setIsSearching } />
                                                    
                                                </div>
                                            </form>
                                        </div>
                                        <div className="header-meta">
                                            <ul>
                                              {!isLoggedIn ? (
                                                <li>
                                                    <Link href="/sign-in" className="d-none d-md-block">
                                                        <i className="fi fi-rr-user"></i>
                                                    </Link>
                                                </li>
                                                ) : null}
                                              {role === "ROLE_ADMIN" ? (
                                                <li style={{ marginLeft: "0" }}>
                                                    <Dropdown >
                                                    <Dropdown.Toggle variant={"transparent"}  className="custom-dropdown-toggle">
                                                      <Avatar
                                                        src={
                                                          avatar || "/assets/img/zdJeuso-_400x400.jpg"
                                                        }
                                                        alt="avatar"
                                                        size={40}
                                                      />
                                                      </Dropdown.Toggle>

                                                      <Dropdown.Menu>
                                                        <Dropdown.Item href="/Settings">Profile</Dropdown.Item>
                                                        <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                </li>
                                                ) : null}
                                              {role === "ROLE_STAFF" ? (
                                                <li style={{ marginLeft: "0" }}>
                                                    <Dropdown >
                                                    <Dropdown.Toggle variant={"transparent"}  className="custom-dropdown-toggle">
                                                      <Avatar
                                                        src={
                                                          avatar || "/assets/img/zdJeuso-_400x400.jpg"
                                                        }
                                                        alt="avatar"
                                                        size={40}
                                                      />
                                                      </Dropdown.Toggle>

                                                      <Dropdown.Menu>
                                                        <Dropdown.Item href="/Settings">Profile</Dropdown.Item>
                                                        <Dropdown.Item href="/dashboard-staff">Dashboard</Dropdown.Item>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                </li>
                                                ) : null}
                                              {role === "ROLE_INSTRUCTOR" ? (
                                                <li style={{ marginLeft: "0" }} >
                                                    <Dropdown >
                                                      <Dropdown.Toggle variant={"transparent"}  className="custom-dropdown-toggle">
                                                      <Space wrap size={16}>
                                                        <Avatar
                                                          size="large"
                                                          src={avatar}
                                                          icon={<UserOutlined />}
                                                        />
                                                      </Space>
                                                      </Dropdown.Toggle>
                                                  
                                                      <Dropdown.Menu>
                                                        <Dropdown.Item href="/Settings">Profile</Dropdown.Item>
                                                        <Dropdown.Item href="/my-collection">Edit Collection</Dropdown.Item>
                                                        <Dropdown.Item href="/create-post">Create Post</Dropdown.Item>
                                                        <Dropdown.Item href="/view-post">View Your Post</Dropdown.Item>
                                                          {/* <Dropdown.Item href="/course-create">Create Course</Dropdown.Item> */}
                                                        <Dropdown.Item href="/view-instructor-courses">View Your Course</Dropdown.Item>
                                                        <Dropdown.Item href="/dashboard-instructor">Dashboard</Dropdown.Item>

                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                </li>
                                                ) : null}
                                              {role === "ROLE_CUSTOMER" ? (
                                                <li style={{ marginLeft: "0" }}>
                                                    <Dropdown >
                                                    <Dropdown.Toggle variant={"transparent"}  className="custom-dropdown-toggle">
                                                      <Avatar
                                                        src={
                                                          avatar || "/assets/img/zdJeuso-_400x400.jpg"
                                                        }
                                                        alt="avatar"
                                                        size={40}
                                                      />
                                                      </Dropdown.Toggle>

                                                      <Dropdown.Menu>
                                                        <Dropdown.Item href="/Settings">Profile</Dropdown.Item>
                                                        <Dropdown.Item href="/create-post">Create Post</Dropdown.Item>
                                                        <Dropdown.Item href="/view-post">View Your Post</Dropdown.Item>
                                                        <Dropdown.Item href="/my-courses">View My Course</Dropdown.Item>
                                                        <Dropdown.Item href="/my-orders">View Orders</Dropdown.Item>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                </li>
                                                ) : null}

                                                {isLoggedIn ? (
                                                    <li style={{ marginLeft: "0" }}>
                                                        <button onClick={handleLogout} className="d-none d-md-block">
                                                          <UilSignOutAlt size="30" color="#FFF"></UilSignOutAlt>
                                                        </button>
                                                    </li>
                                                ) : null}
                                                <li>
                                                    <a onClick={() => setIsActive(true)} href="#"
                                                       className="tp-menu-toggle d-xl-none">
                                                        <i className="icon_ul"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Sidebar isActive={isActive} setIsActive={setIsActive}/>
        </>
    );
};

export default dynamic (() => Promise.resolve(Header), {ssr: false})
