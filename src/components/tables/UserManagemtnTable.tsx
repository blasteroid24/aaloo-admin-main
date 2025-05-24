import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { Paginator } from 'primereact/paginator';
import { getUsers } from '@/redux/actions/userActionTypes';
import { IGetUsers } from '@/types/userInterface';

type Props = {
    columns: any;
    dataList: any;
};

const UserManagementTable = (props: Props) => {
    const dispatch = useDispatch();
    const pagination = useSelector((state: AppState) => state.userData.usersData.pagination);

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
        headerGroups,
    } = useTable({
        columns,
        data: props?.dataList,
    });

    // Handle page change
    const onPageChange = (e: any) => {
        setCurrentPage(e.page); // Update the state for the current page
        const getUserPayload: IGetUsers = {
            current_page: e.page + 1, // Convert back to one-indexed page
            search: ''
        };
        dispatch(getUsers(getUserPayload)); // Dispatch the action to fetch users
    };
 
    return (
        <>
            <div className='max-w-[100%] overflow-auto'>
                <div className='table-responsive border-b-[0.5px] rounded-3xl bg-black'>
                    <table {...getTableProps()} className='upcoming_appoinments_table'>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    <th className='min-w-[200px] max-w-[250px]'>Column 1</th>
                                    <th>Column 2</th>
                                    <th>Column 3</th>
                                    <th className='text-nowrap'>Column 4</th>
                                    <th>Action</th>
                                    <th>View</th>
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            <tr>
                                <td className='h-20 text-center' colSpan={10}>No Data Available</td>
                            </tr>
                        </tbody>
                        {/* <tbody {...getTableBodyProps()}>
                            {rows.map((row: Row<any>, index: number) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        <td className='max-w-[250px]'>
                                            <div className='flex'>
                                                <span className='text-truncate-2 FaExclamationCircle_inline if-text-no-cpace'>
                                                    {row.original.name}
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
                                        <td className='text-nowrap min-w-[200px] max-w-[200px]'>
                                            <div className='items-center'>
                                                {row.original.gameStatus}
                                            </div>
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            <div className=''>
                                                <span className='text-[14px] p-1'>
                                                    {row.original.gameRank}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <InputSwitch
                                                checked={row.original.isActive}
                                                onChange={(e) => handleSwitchChange(row)}
                                            />
                                        </td>
                                        <td className=''>
                                            <IoMdEye className='cursor-pointer' size={20} onClick={() => useDetails(row.original.id)} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody> */}
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

export default UserManagementTable;
