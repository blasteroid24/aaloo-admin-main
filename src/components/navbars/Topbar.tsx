import { AppState } from '@/redux/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

 

const TopBar = () => {
  const userProfile = useSelector((state: AppState) => state.userData.userProfile)
  function getInitials(name: string) {
    return name
      .split(' ')                  
      .map(word => word.charAt(0))  
      .slice(0, 2)                  
      .join('');                   
  }
  return (
    <div className='px-5 pb-2 pt-2  lg:flex justify-end items-center border-b border-t hidden'>
 
      <div className="">
           {userProfile?.name && (
            <div className="flex items-center">
              <div className='user_icon_navbar text-black'>
                <p className="text-black text-truncate-1 max-w-[171px]">
                  <span>{getInitials(userProfile.name)}</span>
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default TopBar