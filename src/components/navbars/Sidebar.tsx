import { userLogout } from "@/redux/actions/userActionTypes";
import { AppState } from "@/redux/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { commonNavItems } from "@/components/navItems/navItems";
import { StreamChat, Channel } from 'stream-chat';

type Props = {
  isSidebarVisibleDesktop: boolean;
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  toggleSidebarClose: () => void;
  toggleSidebarDesktop: () => void;
}


const Sidebar = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userProfile = useSelector((state: AppState) => state.userData.userProfile);


  const userLogoutHandler = async () => {
    localStorage.clear();
    localStorage.removeItem("access_token");
    dispatch(userLogout());
    router.push("/");
  };

  return (
    <div className="h-100 grid p-3">
      <div className="">
        <Link href={'/survey-management'}>
          <Image className="flex justify-center" src={"/images/logo.svg"} width={50} height={30} alt="Logo" />
        </Link>
        <header className="navbar">
          <ul className="nav_items">
            {commonNavItems.map((item, index) => (
              <Link href={item.href} className="whitespace-nowrap w-full">
                <li key={index} className={`nav_item flex ${router?.asPath === item.href && 'active'}`}>
                  <span className="pr-2">
                    {typeof item.icon === 'string' ? (
                      <Image src={item.icon} width={22} height={22} alt={item.label} />
                    ) : (
                      item.icon
                    )}
                  </span>
                  {item.label}
                </li>
              </Link>
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

    </div>
  );
};

export default Sidebar;
