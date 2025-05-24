import React, { useState, useEffect } from 'react';
import { useTable, Row } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { Dialog } from 'primereact/dialog';
import { Paginator } from 'primereact/paginator';
import surveyIcon from '../../../public/images/icons/calender.svg';
import { Tooltip } from '@mui/material';
import { FaLocationDot, FaPencil, FaPlus, FaSquareFacebook, FaTrash, FaUser } from 'react-icons/fa6';
import { IGetSurvey, ISurvey } from '@/types/surveyInterface';
import { deleteSurvey, getSurveyData, updateSurvey } from '@/redux/actions/surveyActionTypes';
import Link from 'next/link';
import moment from 'moment';
import { chef } from '@/types/userInterface';

type Props = {
    columns: any;
    dataList: any;
    searchQuery: string;
    setSurveyDetails: (data: ISurvey) => void;
};

const NotificationManagementTable = (props: Props) => {
    const { searchQuery, setSurveyDetails } = props;
    const dispatch = useDispatch();
    const pagination = useSelector((state: AppState) => state.surveyData.surveysData.pagination);

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
        const getSurveyPayload: IGetSurvey = {
            current_page: e.page + 1, // Convert back to one-indexed page
            search: searchQuery
        };
        dispatch(getSurveyData(getSurveyPayload)); // Dispatch the action to fetch users
    };

    const editSurveyModal = (data: any) => {
        setSurveyDetails(data);
        setVisible(true);
        // dispatch(updateSurvey(updateSurveyPayload));
    }

    const deleteSurveyHandler = (data: any) => {
        console.log("Survey Delete Successfully", data);
        dispatch(deleteSurvey(data.id));
    }

    const useDetails = (data: any) => {
        console.log(data, "lkasjdflkj")
        setVisible(true);
        setSurveyDetails(data);
    }

    const formatDate = (dateString: string) => {
        const date = moment(dateString);
        const now = moment();

        // If the notification was sent today
        if (date.isSame(now, 'day')) {
            const minutesAgo = now.diff(date, 'minutes');
            const hoursAgo = now.diff(date, 'hours');

            if (minutesAgo < 1) {
                return 'Now';
            } else if (minutesAgo < 60) {
                return `${minutesAgo} min ago`;
            } else {
                return `${hoursAgo} hrs ago`;
            }
        }

        // For past notifications
        if (date.isSame(now, 'year')) {
            return date.format('DD MMM');
        } else {
            return date.format('DD MMM, YYYY');
        }
    };

    return (
        <>
            <div className='max-w-[100%] overflow-auto'>
                <div className='table-responsive border-b-[0.5px] rounded-3xl bg-black'>
                    <table {...getTableProps()} className='upcoming_appoinments_table'>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    <th className='min-w-[160px] max-w-[200px]'>Title</th>
                                    <th>Description</th>
                                    <th>Date/Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {rows.map((row: Row<any>, index: number) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        <td>
                                            <div className='flex items-center'>
                                                {row?.original?.surveyNudgeContent}
                                            </div>
                                        </td>
                                        <td className='text-nowrap'>
                                            <div className='items-center'>
                                                {row.original.name}
                                            </div>
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            <div className=''>
                                                <span className='text-[14px] p-1'>
                                                    {/* {row.original.startAtLabel} ,  */}
                                                    {moment(row.original.startAt).format('MMMM D, YYYY, h:mm A')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            <div className=''>
                                                <span className='text-[14px] p-1'>
                                                    {/* {row.original.endAtLabel} ,  */}
                                                    Read/Unread
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='grid grid-flow-col-dense gap-2 w-12'>
                                                <Tooltip title="View Notification" arrow placement="bottom">
                                                    <button
                                                        aria-label="Edit Notification"
                                                        className='w-9 h-9 text-center rounded flex justify-center items-center bg-slate-200'
                                                        onClick={() => useDetails(row.original)}
                                                    >
                                                        <FaPencil size={18} />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip title="Delete Notification" arrow placement="bottom">
                                                    <button
                                                        aria-label="Delete Notification"
                                                        className='w-9 h-9 text-center rounded flex justify-center items-center bg-red-600 text-white'
                                                        onClick={() => deleteSurveyHandler(row.original)}
                                                    >
                                                        <FaTrash className='cursor-pointer' size={16} />
                                                    </button>
                                                </Tooltip>
                                            </div>
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

        </>
    );
};

export default NotificationManagementTable;
