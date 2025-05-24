import React, { useState, useEffect } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { useTable, Row } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { IoMdEye } from "react-icons/io";
import { Dialog } from 'primereact/dialog';
import { Paginator } from 'primereact/paginator';
import { getUsers } from '@/redux/actions/userActionTypes';
import { chef, IGetUsers } from '@/types/userInterface';
import { Tooltip } from '@mui/material';
import { FaFacebook, FaFacebookF, FaFacebookMessenger, FaLinkedinIn, FaLocationArrow, FaLocationDot, FaLocationPin, FaSquareFacebook, FaSquareInstagram, FaTwitter, FaUser, FaYoutube } from 'react-icons/fa6';

type Props = {
    columns: any;
    dataList: any;
    searchQuery: string;
};

const ChefManagementTable = (props: Props) => {
    const { searchQuery } = props;
    const dispatch = useDispatch();
    const pagination = useSelector((state: AppState) => state.userData.chefData.pagination);

    const [visible, setVisible] = useState(false);
    const [chefDetails, setChefDetails] = useState<chef>();
    const [currentPage, setCurrentPage] = useState(0); // State for current page
    const itemsPerPage = 10; // Items to show per page
    const { columns } = props;

    // Initialize current page based on Redux state
    useEffect(() => {
        if (pagination?.current_page) {
            setCurrentPage(pagination.current_page - 1); // Set current page from Redux (convert to zero-indexed)
        }
    }, [pagination]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: props?.dataList,
    });

    // Handle page change
    const onPageChange = (e: any) => {
        setCurrentPage(e.page); // Update the state for the current page
        const getUserPayload: IGetUsers = {
            current_page: e.page + 1, // Convert back to one-indexed page
            search: searchQuery,
        };
        dispatch(getUsers(getUserPayload)); // Dispatch the action to fetch users
    };

    const useDetails = (data: any) => {
        console.log(data, "lkasjdflkj")
        setVisible(true);
        setChefDetails(data);
    }

    return (
        <>
            <div className='max-w-[100%] overflow-auto'>
                <div className='table-responsive border-b-[0.5px] rounded-3xl bg-black'>
                    <table {...getTableProps()} className='upcoming_appoinments_table'>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    <th className='min-w-[200px] max-w-[250px]'>User Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Location</th>
                                    <th>Hashtag</th>
                                    {/* <th className='text-nowrap'>Partner Restaurants / Hotel</th> */}
                                    <th>Action</th>
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {rows.map((row: Row<any>, index: number) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        <td className='min-w-[200px] max-w-[200px]'>
                                            <div className='flex items-center'>
                                                <span className='text-[14px]'>
                                                    {row.original.username}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='min-w-[200px] max-w-[200px]'>
                                            <div className='flex items-center'>
                                                <span className='text-[14px]'>
                                                    {row.original.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='text-nowrap'>
                                            <div className='items-center'>
                                                {row.original.age}
                                            </div>
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            <div className=''>
                                                <span className='text-[14px] p-1'>
                                                    {row.original.gender}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            <div className=''>
                                                <span className='text-[14px] p-1'>
                                                    {row.original.homeLocation}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            <div className=''>
                                                <span className='text-[14px] p-1'>
                                                    {row.original.hashTags}
                                                </span>
                                            </div>
                                        </td>
                                        {/* <td className='text-nowrap cursor-pointer'>
                                            <div className=''>
                                                <span className='text-[14px] p-1'>
                                                    {row.original.partnerRestaurant?.map((restaurant: any) => restaurant.restaurantName)
                                                        .join(', ') || ''}
                                                </span>
                                            </div>
                                        </td> */}
                                        <td className=''>
                                            <IoMdEye className='cursor-pointer' size={20} onClick={() => useDetails(row.original)} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className='flex justify-end px-0 pb-10'>
                <Paginator
                    first={currentPage * itemsPerPage}  // Index for the current page
                    rows={itemsPerPage}                 // Items per page
                    totalRecords={pagination?.total_count} // Total records from Redux
                    onPageChange={onPageChange}         // Page change handler
                    pageLinkSize={3}                    // Set the number of page links visible
                />
            </div>

            <div className="card flex justify-content-center">
                <Dialog visible={visible} className='max-w-[400px]' header="Chef Details" style={{ width: '50vw' }} draggable={false} onHide={() => setVisible(false)}>
                    <div className='py-4'>
                        <div className='py-2'>
                            <div className='md:flex mb-3 block'>
                                <span className='md:w-5/24 mx-auto text-center bg-slate-100 w-24 h-24 rounded-full flex justify-center items-center font-medium text-black'>
                                    {/* <img src={chefDetails?.profilePic} alt="" /> */}
                                    <span>Image</span>
                                </span>
                            </div>
                            <div className='md:flex block'>
                                <span className='md:w-5/24 mx-auto text-center font-medium text-xl text-black'>
                                    {chefDetails?.firstName}{chefDetails?.lastName}{chefDetails?.id}
                                </span>
                            </div>
                            <div className='md:flex block mb-3'>
                                <span className='md:w-5/24 mx-auto text-center font-normal text-sm text-slate-400'>
                                    {chefDetails?.aboutMe}
                                </span>
                            </div>
                            <div className='md:flex block mb-3'>
                                <span className='md:w-5/12 mx-auto p-1 rounded-3xl uppercase text-center font-medium text-sm text-[#D12149] bg-[#FFAEC133] text-400 flex justify-center items-center gap-1'>
                                    <FaLocationDot className="text-600" size={14} /> {chefDetails?.homeLocation}
                                </span>
                                <span className='md:w-5/12 mx-auto p-1 rounded-3xl uppercase text-center font-medium text-sm text-[#D12149] bg-[#FFAEC133] text-400 flex justify-center items-center gap-1'>
                                    <FaUser className="text-600" size={14} /> {chefDetails?.gender}
                                </span>
                            </div>
                            <div className='md:flex block'>
                                <span className='md:w-5/24 w-full p-2 rounded-md text-center font-medium text-sm text-[#333] bg-[#f3f3f3] text-400'>
                                    {chefDetails?.hashTags}
                                </span>
                            </div>
                        </div>
                        {chefDetails?.dateOfBirth ?
                            <div className='py-2'>
                                <h4 className='w-full font-medium text-black'>Date Of Birth :-</h4>
                                <p className='w-full'>{chefDetails?.dateOfBirth ? chefDetails?.dateOfBirth : "-"}</p>
                            </div>
                            : ""}
                        <div className='py-2'>
                            <h4 className='w-full font-medium text-black'>Partner Restaurant :-</h4>
                            <p className='w-full'>
                                {Array.isArray(chefDetails?.partnerRestaurant) ? chefDetails.partnerRestaurant.map((restaurant: any) => restaurant.restaurantName).join(', ') : ''}
                            </p>
                        </div>
                        {chefDetails?.award ?
                            <div className='py-2'>
                                <h4 className='w-full font-medium text-black'>Awards :-</h4>
                                <span className='w-full'>
                                    <ul>
                                        {chefDetails?.award?.map((award: any) => (
                                            <li>{`${award.awardName} - ${award.awardYear}`}</li>
                                        ))}
                                    </ul>
                                </span>
                            </div>
                            : ""}
                        <div className='py-2'>
                            <h4 className='w-full font-medium text-black'>Social Media Links :-</h4>
                            <span className='w-full'>
                                {chefDetails?.socialMediaLinks && chefDetails?.socialMediaLinks.length > 0 && chefDetails?.socialMediaLinks?.map((socialMediaLink: any) => (
                                    <ul className='inline-block' key={socialMediaLink.id}>
                                        {socialMediaLink.socialMediaType === "FACEBOOK" && (
                                            <li className='p-2 pl-0'>
                                                <a
                                                    className='hover:text-red-600 transition'
                                                    target='_blank'
                                                    href={socialMediaLink.url}
                                                    aria-label="Visit our Facebook page"
                                                >
                                                    <FaSquareFacebook className="text-600" size={26} />
                                                </a>
                                            </li>
                                        )}
                                        {socialMediaLink.socialMediaType === "INSTAGRAM" && (
                                            <li className='p-2'>
                                                <a
                                                    className='hover:text-red-600 transition'
                                                    target='_blank'
                                                    href={socialMediaLink.url}
                                                    aria-label="Visit our Instagram page"
                                                >
                                                    <FaSquareInstagram className="text-600" size={26} />
                                                </a>
                                            </li>
                                        )}
                                        {socialMediaLink.socialMediaType === "TWITTER" && (
                                            <li className='p-2'>
                                                <a
                                                    className='hover:text-red-600 transition'
                                                    target='_blank'
                                                    href={socialMediaLink.url}
                                                    aria-label="Visit our Twitter page"
                                                >
                                                    <FaTwitter className="text-600" size={26} />
                                                </a>
                                            </li>
                                        )}
                                        {socialMediaLink.socialMediaType === "YOUTUBE" && (
                                            <li className='p-2 pr-0'>
                                                <a
                                                    className='hover:text-red-600 transition'
                                                    target='_blank'
                                                    href={socialMediaLink.url}
                                                    aria-label="Visit our YouTube channel"
                                                >
                                                    <FaYoutube className="text-600" size={26} />
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                ))}
                            </span>
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default ChefManagementTable;
