import Link from 'next/link'
import React, { useState } from "react";
import styles from '../../styles/Layout.module.css';
import { AppState } from '@/redux/types';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { RiMenu3Fill, RiMenu5Line } from 'react-icons/ri';
import { userLogout } from '@/redux/actions/userActionTypes';
import { commonNavItems } from "@/components/navItems/navItems";
import { FaChevronRight } from 'react-icons/fa6';

type Props = {
    providerName?: string
}
const TopNavbar = (props: Props) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userProfile = useSelector((state: AppState) => state.userData.userProfile)
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };


    const userLogoutHandler = async () => {
        localStorage.clear();
        dispatch(userLogout());
    }
    function getInitials(name: string) {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .slice(0, 2)
            .join('');
    }

    return (
        <div>
            <nav className={`${styles.rightTopNavbar} ${userProfile?.isAuth ? styles.rightTopNavbar_desktop : styles.main_content_hideSideNave} sideNavbarResponsiveOverlay flex`}>
                <span className={`text-black title_text_expo font-medium ${!userProfile?.isAuth ? 'md:px-10' : 'md:px-5'} px-3 w-100`}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            {userProfile?.isAuth && (
                                <>
                                    <div className='py-2 min-w-[80px] md:hidden block'>
                                        <Link href={'/'}>
                                            <Image src={"/images/logo.svg"} width={100} height={59} alt="Logo" />
                                        </Link>
                                    </div>

                                </>
                            )}
                        </div>

                        {/* {userProfile?.isAuth && ( */}
                       <div className='flex'>
                       <button onClick={() => toggleSidebar()} className='md:hidden block'>
                            {isSidebarVisible ?
                                <RiMenu3Fill color="#282C32" size={30} />
                                :
                                <IoCloseSharp color="#CB333B" size={30} />
                            }
                        </button>
                        {userProfile?.name && (
                            <div className="flex items-center ps-3 md:hidden ">
                                <div className='user_icon_navbar text-black'>
                                    <p className="text-black text-truncate-1 max-w-[171px]">
                                        <span>{getInitials(userProfile.name)}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                       </div>
                        {/* )} */}
                    </div>
                </span>
                <nav className={`${styles.sideNavbar} ${isSidebarVisible ? styles.sideNavbarResponsive : styles.sideNavbarResponsiveShow} md:hidden block`}>
                    <div className="p-5">
                        <Link href={'/'}>
                            <Image src={"/images/logo.svg"} width={150} height={51} alt="Logo" />
                        </Link>
                        <header className="navbar">
                            <ul className="nav_items">
                                {commonNavItems.map((item, index) => (
                                    <li key={index} className={`nav_item ${router?.asPath === item.href && 'active'}`}>
                                        <Link href={item.href} className="flex items-center">
                                            <span className="pr-2">
                                                {typeof item.icon === 'string' ? (
                                                    <Image src={item.icon} width={22} height={22} alt={item.label} />
                                                ) : (
                                                    item.icon
                                                )}
                                            </span>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}

                                <li className="nav_item cursor-pointer">
                                    <span className="flex items-center" onClick={() => userLogoutHandler()}>
                                        <Link href="/" className="flex items-center">
                                            <span className="pr-2">
                                                <BiLogOut size={22} />
                                            </span>
                                            Logout
                                        </Link>
                                    </span>
                                </li>
                            </ul>
                        </header>
                    </div>
                </nav>
            </nav>
        </div>
    )
}

export default TopNavbar
