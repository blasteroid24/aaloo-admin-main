import BreadCrumbs from '@/components/breadCrumb/BreadCrumbs'
import Layout from '@/components/Layout'
import LoadingAnimated from '@/components/loading/LoadingAnimated'
import TopBar from '@/components/navbars/Topbar'
import SearchModal from '@/components/search-modal/SearchModal'
import ChefManagementTable from '@/components/tables/ChefManagementTable'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import UploadExcelModal from '@/components/upload-excel/UploadExcelModal'
import { getChefData } from '@/redux/actions/userActionTypes'
import { AppState } from '@/redux/types'
import { IGetChef } from '@/types/userInterface'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { HiOutlineInboxStack } from "react-icons/hi2";
import { IoMdCloudUpload, IoMdTrash } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}

const index = (props: Props) => {
    const dispatch = useDispatch()
    const chefData = useSelector((state: AppState) => state?.userData?.chefData)
    const usersLoader = useSelector((state: AppState) => state?.userData?.usersLoader);
    
    const [searchQuery, setSearchQuery] = useState('')
    const columns = [
        { Header: 'User Name', accessor: 'appointmentTime' },
    ];


    useEffect(() => {
        const getChefPaylod: IGetChef = {
            current_page: 1,
            search: searchQuery
        }
        dispatch(getChefData(getChefPaylod))
    }, [searchQuery])

    const items = [{ label: 'Chef Management' }];

    const [visible, setVisible] = useState(false);

    const uploadExcelModal = (e: { currentTarget: { id: string } }) => {
        if (e.currentTarget) {
            setVisible(true);
            console.log("Modal Visible True", visible);
            
            // dispatch(setUpdateLaunchTimeLoader(false))
        }
    }

    return (
        <div>
            <Head>
                <title>Chef Management - Aaloo</title>
            </Head>
            <Layout>
                <TopNavbar />
                <TopBar />
                <div className='flex flex-wrap justify-between px-5 pt-4'>
                    <div>
                        <h1 className='title_text_expo gradient-text font-bold'>
                        Chef Management</h1>
                    </div>
                    <div>
                        <BreadCrumbs items={items} />
                    </div>
                </div>
                <div className='px-5'>
                    <div className='flex py-3 justify-between relative'>
                        <div className='md:w-4/12'>
                            <div className='relative'>
                                <SearchModal setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                            </div>
                        </div>
                        <div className='md:w-6/24'>
                            <div className='flex'>
                                <button className='bg-slate-200 p-2 px-4 rounded-md flex items-center gap-1' onClick={uploadExcelModal}><span><IoMdCloudUpload className='cursor-pointer' size={20} /></span> Upload Excel</button>
                            </div>
                        </div>
                    </div>
                    {usersLoader ?
                        <LoadingAnimated />
                        : <>
                            {chefData.chefs.length > 0 ?
                                <ChefManagementTable searchQuery={searchQuery} columns={columns} dataList={chefData.chefs} />
                                :
                                <>
                                    <div className='justify-center text-center w-full flex pt-20'>
                                        <div>
                                            <HiOutlineInboxStack size={100} className='justify-center inline' />
                                            <h1 className='text-center text-2xl font-bold'>
                                                No Data Found
                                            </h1>
                                        </div>
                                    </div>
                                </>
                            }
                        </>
                    }
                </div>
                <UploadExcelModal
                    visible={visible}
                    setVisible={setVisible}
                    isEdit={false}
                />
            </Layout>
        </div>
    )
}

export default index