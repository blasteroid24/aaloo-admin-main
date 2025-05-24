import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from '../styles/Layout.module.css';
import Sidebar from './navbars/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { AppState } from '@/redux/types';
import { useSelector } from 'react-redux';
import TopNavbar from './top-navbar/TopNavbar';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter()
    const menuRef = useRef<HTMLDivElement>(null);
    const userProfile = useSelector((state: AppState) => state.userData.userProfile)

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isSidebarVisibleDesktop, setSidebarVisibleDesktop] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    const toggleSidebarDesktop = () => {
        setSidebarVisibleDesktop(!isSidebarVisibleDesktop);
    };
    const toggleSidebarClose = () => {
        setIsSidebarVisible(false);
    };

    
 
    return (
        <div className={`${styles.layout}`}>
            {userProfile &&
                <nav
                    ref={menuRef}
                    className={`${styles.sideNavbar} ${isSidebarVisible ? styles.sideNavbarResponsive : styles.sideNavbarResponsiveShow
                        } ${!isSidebarVisibleDesktop ? styles.sideNavbarHideOnDesktop : styles.sideNavbarShowOnDesktop}`}
                >
                    <Sidebar 
                       isSidebarVisibleDesktop={isSidebarVisibleDesktop}
                       isSidebarVisible={isSidebarVisible}
                       toggleSidebar={toggleSidebar}
                       toggleSidebarClose={toggleSidebarClose}
                       toggleSidebarDesktop={toggleSidebarDesktop}
                    />
                </nav>
            }

            <div className={`${styles.mainContent}  ${isSidebarVisibleDesktop && userProfile?.isAuth ? styles.main_content_desktop : styles.main_content_full}`}>{children}</div>
           
        </div>
    );
};

export default Layout;
