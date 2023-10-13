import React, { useState } from "react";
import { SidebarData } from '@/src/data/Data'
import Link from "next/link";
import { UilSignOutAlt } from '@iconscout/react-unicons'
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
            <div className='menu'>
                {SidebarData.map((item, index) => {
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
                <div className='menuItem'>
                    <Link href="/">
                        <UilSignOutAlt />
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Sidebar
