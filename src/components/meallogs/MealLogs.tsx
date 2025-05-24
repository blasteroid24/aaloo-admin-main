import { ErrorMessage, Form, Formik } from 'formik'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { setFormErrors, userLogin } from '@/redux/actions/userActionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@/redux/types'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import { IFormErrors } from '@/types/userInterface'
import LoginBanner from '../login-right-banner/LoginBanner';
import { FaCalendar } from 'react-icons/fa6'


type Props = {}

const MealLogs = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isLoading = useSelector((state: AppState) => state.userData.userSignUpLoading)
  console.log("isLoading", isLoading);

  const formEroorData = useSelector((state: AppState) => state.userData.formEroors)
  const formEroorDataMessage = useSelector((state: AppState) => state.userData.formEroors)

  return (
    <>
      {/* <div className="p-4 py-14 m-auto sm:w-2/5 md:w-2/5"> */}
      <div className="p-4 py-14 m-auto w-96 sm:w-96 md:w-96">
        <h1 className='text-base mb-5 text-center font-normal'>Log of FoodPrints</h1>
        <div>
          <div className='flex items-center justify-center gap-2 py-6'>
            <Image src={"/images/icons/calendar-month-icon.svg"} alt="Calendar Icon" className="w-6 h-6" width={50} height={50} />
            <span className='text-[#5C5C5C]'>7 Sep 2025</span>
            <span><Image src={"/images/icons/date-line.png"} alt="Date Line Icon" className="w-5 h-2" width={50} height={50} /></span>
            <span className='text-[#5C5C5C]'>30 Sep 2025</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
          <div className=" bg-white shadow-2xl rounded-lg hover:shadow transition duration-500 p-2">
            <div>
              <div className='flex justify-between items-start py-2'>
                <div className='flex items-center gap-2'>
                  <Image src={"/images/icons/drink-icon.svg"} alt="Drink Icon" className="w-10 h-10 object-cover" width={50} height={50} />
                  <div>
                    <h2 className='text-[#D12149] text-xl font-bold'>Drink</h2>
                    <p className='text-[#8F8F8F] text-xs font-normal'>Last Thursday at 8:14 AM</p>
                  </div>
                </div>
                <div className='text-[#CD7E00] font-normal text-xs flex items-center gap-1'>
                  <Image src={"/images/icons/work-icon.svg"} alt="Work Icon" className="w-6 h-6 object-cover" width={32} height={32} />
                  work
                </div>
              </div>
            </div>
            <div className='relative'>
              <Image src={"/images/icons/home-cooked-icon.svg"} alt="Home Cooked Icon" className="absolute top-1 left-1 w-16 h-16" width={500} height={500} />
              <Image src={"/images/footprint-img.jpg"} alt="login img" className="rounded-lg w-full h-80 object-cover" width={500} height={500} />
            </div>
            <div className='py-2'>
              {/* <h2 className='font-semibold text-lg'>Title</h2> */}
              <p className='text-slate-500'>I finally found the richest, creamiest tonkotsu broth in town! This bowl took 12 hours to simmer, and the flavors were unreal.</p>
            </div>
          </div>
          <div className=" bg-white shadow-2xl rounded-lg hover:shadow transition duration-500 p-2">
            <div>
              <div className='flex justify-between items-start py-2'>
                <div className='flex items-center gap-2'>
                  <Image src={"/images/icons/drink-icon.svg"} alt="Drink Icon" className="w-10 h-10 object-cover" width={50} height={50} />
                  <div>
                    <h2 className='text-[#D12149] text-xl font-bold'>Drink</h2>
                    <p className='text-[#8F8F8F] text-xs font-normal'>Last Thursday at 8:14 AM</p>
                  </div>
                </div>
                <div className='text-[#CD7E00] font-normal text-xs flex items-center gap-1'>
                  <Image src={"/images/icons/work-icon.svg"} alt="Work Icon" className="w-6 h-6 object-cover" width={32} height={32} />
                  work
                </div>
              </div>
            </div>
            <div className='relative'>
              <Image src={"/images/icons/home-cooked-icon.svg"} alt="Home Cooked Icon" className="absolute top-1 left-1 w-16 h-16" width={500} height={500} />
              <Image src={"/images/footprint-img.jpg"} alt="login img" className="rounded-lg w-full h-80 object-cover" width={500} height={500} />
            </div>
            <div className='py-2'>
              {/* <h2 className='font-semibold text-lg'>Title</h2> */}
              <p className='text-slate-500'>I finally found the richest, creamiest tonkotsu broth in town! This bowl took 12 hours to simmer, and the flavors were unreal.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MealLogs;
