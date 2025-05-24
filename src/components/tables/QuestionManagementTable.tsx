import React, { useState, useEffect } from 'react';
import { useTable, Row } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { IoMdEye } from "react-icons/io";
import { Dialog } from 'primereact/dialog';
import { Paginator } from 'primereact/paginator';
import surveyIcon from '../../../public/images/icons/calender.svg';
import { Tooltip } from '@mui/material';
import { FaPencil, FaPlus, FaTrash } from 'react-icons/fa6';
import { IGetSurvey, ISurvey, ISurveyQuestions } from '@/types/surveyInterface';
import { deleteQuestion, getSurveyData } from '@/redux/actions/surveyActionTypes';
import Link from 'next/link';

type Props = {
    columns: any;
    dataList: any;
    isEdit: boolean;
    searchQuery: string;
};

const QuestionManagementTable = (props: Props) => {
    const { searchQuery, isEdit } = props;
    const dispatch = useDispatch();
    const pagination = useSelector((state: AppState) => state.surveyData.surveyQuestionsData.pagination);
    console.log("isEdit Value", isEdit);

    const [visible, setVisible] = useState(false);
    const [surveyDetails, setSurveyDetails] = useState<ISurveyQuestions>();
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

    const deleteQuestionHandler = (data: any) => {
        console.log("Question Delete Successfully", data);
        dispatch(deleteQuestion(data));
    }

    const useDetails = (data: any) => {
        console.log("Survey Question", data)
        setVisible(true);
        setSurveyDetails(data);
    }

    return (
        <>
            <div className='max-w-[100%] overflow-auto'>
                <div className='table-responsive border-b-[0.5px] rounded-3xl bg-black'>
                    <table {...getTableProps()} className='upcoming_appoinments_table'>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    <th className='min-w-[160px] max-w-[200px]'>Question</th>
                                    <th>Option Type</th>
                                    <th>Question Type</th>
                                    <th>Aaloo Fries</th>
                                    <th>isSkippable</th>
                                    <th>Gender</th>
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
                                                {/* <span className='text-[14px] bg-slate-100 rounded-full w-10 h-10 mr-2 p-2'>
                                                    <img src={row?.original?.surveyNudgeIcon} alt="" />
                                                </span> */}
                                                {row?.original?.questionText}
                                            </div>
                                        </td>
                                        <td className='text-nowrap'>
                                            {row.original.optionType === "TEXT" ? "Text" : "Image"}
                                        </td>
                                        <td className='text-nowrap'>
                                            {row.original.questionType === "SINGLE_CHOICE" ? "Single Choice" : "Multiple Choice"}
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            {row.original.incentivePoint}
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            {row.original.isSkippable === true ? "Yes" : "No"}
                                        </td>
                                        <td className='text-nowrap cursor-pointer'>
                                            {row.original.audience === "MALE" ? "Male" : row.original.audience === "FEMALE" ? "Female" : "All"}
                                        </td>
                                        <td>
                                            <div className='grid grid-flow-col-dense gap-2 w-20'>

                                                <Tooltip title="View Question Details" arrow placement="bottom">
                                                    <button
                                                        aria-label="View Question Details"
                                                        className='w-9 h-9 text-center rounded flex justify-center items-center bg-slate-200'
                                                        onClick={() => useDetails(row.original)}
                                                    >
                                                        <IoMdEye size={18} />
                                                    </button>
                                                </Tooltip>

                                                {isEdit === true && (
                                                    <Link href={`/questions/${row.original.surveyId}/question?param=${row.original.id}`}>
                                                        <Tooltip title="Edit Question" arrow placement="bottom">
                                                            <button
                                                                aria-label="Edit Question"
                                                                className='w-9 h-9 text-center rounded flex justify-center items-center bg-slate-200'
                                                            >
                                                                <FaPencil size={18} />
                                                            </button>
                                                        </Tooltip>
                                                    </Link>
                                                )}

                                                {isEdit === true && (
                                                    <Tooltip title="Delete Question" arrow placement="bottom">
                                                        <button
                                                            aria-label="Delete Question"
                                                            className='w-9 h-9 text-center rounded flex justify-center items-center bg-red-600 text-white'
                                                            onClick={() => deleteQuestionHandler(row.original)}
                                                        >
                                                            <FaTrash className='cursor-pointer' size={16} />
                                                        </button>
                                                    </Tooltip>
                                                )}
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
            {/* <div className='flex justify-end px-0 pb-10'>
                <Paginator
                    first={currentPage * itemsPerPage}  // Index for the current page
                    rows={itemsPerPage}                 // Items per page
                    totalRecords={pagination?.total_count} // Total records from Redux
                    onPageChange={onPageChange}         // Page change handler
                    pageLinkSize={3}                    // Set the number of page links visible
                />
            </div> */}

            <div className="card flex justify-content-center">
                <Dialog visible={visible} className='max-w-[400px]' header="Question Details" style={{ width: '60vw' }} draggable={false} onHide={() => setVisible(false)}>
                    <div className='py-4'>
                        <div className='md:flex block mb-3'>
                            <span className='md:w-5/24 mx-auto p-6 text-center font-semibold text-3xl text-white bg-red-700 rounded-full'>
                                {surveyDetails?.incentivePoint}
                            </span>
                        </div>
                        <div className='py-2'>
                            <div className='md:flex block'>
                                <span className='md:w-5/24 w-full p-2 rounded-md font-medium text-lg text-[#333] bg-[#f3f3f3] text-400'>
                                    <span>{surveyDetails?.questionText}</span>
                                    {surveyDetails?.optionType === "TEXT" ?
                                        <ul className='md:w-5/24 w-full mt-2 p-3 rounded-md font-normal text-md text-[#333] bg-[#fff] text-400'>
                                            {surveyDetails?.questionOption?.map((options: any) => (
                                                <li>{`${options.optionText}`}</li>
                                            ))}
                                        </ul> : ""
                                    }
                                    {surveyDetails?.optionType === "IMAGE" ?
                                        <div className='flex items-center gap-3'>
                                            {surveyDetails?.questionOption?.map((options: any) => (
                                                <div className='md:w-5/24 w-full mt-2 p-3 rounded-md font-normal text-md text-[#333] bg-[#fff] text-400'>
                                                    <div className='bg-slate-100 w-full h-full p-4'>
                                                        <img className='w-20 h-20 mx-auto' src={options.optionImage} alt="" />
                                                        {options.optionText}
                                                    </div>
                                                </div>
                                            ))}
                                        </div> : ""
                                    }
                                </span>
                            </div>
                        </div>
                        {surveyDetails?.questionType ?
                            <div className='py-2'>
                                <h4 className='w-full font-medium text-black'>Question Type :-</h4>
                                {surveyDetails?.questionType === "SINGLE_CHOICE" ? "Single Choice" : "Multiple Choice"}
                            </div>
                            : ""}
                        {surveyDetails?.optionType ?
                            <div className='py-2'>
                                <h4 className='w-full font-medium text-black'>Answer Type :-</h4>
                                {surveyDetails?.optionType === "TEXT" ? "Text" : "Image"}
                            </div>
                            : ""}
                        {surveyDetails?.audience ?
                            <div className='py-2'>
                                <h4 className='w-full font-medium text-black'>Gender :-</h4>
                                <p className='w-full'>
                                    {surveyDetails.audience === "MALE" ? "Male" : surveyDetails.audience === "FEMALE" ? "Female" : "All"}
                                </p>
                            </div>
                            : ""}
                        {/* <div className='py-2'>
                            <h4 className='w-full font-medium text-black'>Partner Restaurant :-</h4>
                            <p className='w-full'>
                                {Array.isArray(surveyDetails?.questionOption) ? surveyDetails.questionOption.map((restaurant: any) => restaurant.restaurantName).join(', ') : ''}
                            </p>
                        </div> */}
                        {/* {surveyDetails?.questionType ?
                            <div className='py-2'>
                                <h4 className='w-full font-medium text-black'>Awards :-</h4>
                                <span className='w-full'>
                                    <ul>
                                        {surveyDetails?.questionType?.map((award: any) => (
                                            <li>{`${award.awardName} - ${award.awardYear}`}</li>
                                        ))}
                                    </ul>
                                </span>
                            </div>
                            : ""} */}
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default QuestionManagementTable;
