import useSticky from "@/hooks/use-sticky";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import NavMenu from "./nav-menu";
import Sidebar from "./sidebar";
import {useRouter} from 'next/router';
import { UilSignOutAlt } from '@iconscout/react-unicons'
import { UilUserSquare } from '@iconscout/react-unicons'


const Header = () => {
    const {sticky} = useSticky()
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();
    const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
    const role = typeof window !== 'undefined' ? localStorage.getItem("roles") : null;
    console.log(role);


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
                            <div className="row align-items-center">
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
                                                    <button className="header__search-btn">
                                                        <i className="fa-regular fa-magnifying-glass"></i>
                                                    </button>
                                                    <input type="text" placeholder="Search Courses"/>
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
                                                <li>
                                                  <Link href="/dashboard" className="d-none d-md-block">
                                                    <UilUserSquare></UilUserSquare>
                                                  </Link>
                                                </li>
                                                ) : null}
                                              {role === "ROLE_STAFF" ? (
                                                <li>
                                                  <Link href="/dashboard-staff" className="d-none d-md-block">
                                                    <UilUserSquare ></UilUserSquare>
                                                  </Link>
                                                </li>
                                                ) : null}
                                              {role === "ROLE_INSTRUCTOR" ? (
                                                <li>
                                                  <Link href="/Settings" className="d-none d-md-block">
                                                    <UilUserSquare></UilUserSquare>
                                                  </Link>
                                                </li>
                                                ) : null}
                                              {role === "ROLE_CUSTOMER" ? (
                                                <li>
                                                  <Link href="/Settings" className="d-none d-md-block">
                                                    <UilUserSquare></UilUserSquare>
                                                  </Link>
                                                </li>
                                                ) : null}

                                                {isLoggedIn ? (
                                                    <li>
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

export default Header;
