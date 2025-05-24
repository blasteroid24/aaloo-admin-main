import BreadCrumbs from '@/components/breadCrumb/BreadCrumbs'
import Layout from '@/components/Layout'
import LoadingAnimated from '@/components/loading/LoadingAnimated'
import TopBar from '@/components/navbars/Topbar'
import SearchModal from '@/components/search-modal/SearchModal'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import { AppState } from '@/redux/types'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import Head from 'next/head'
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useState } from 'react'
import { HiOutlineInboxStack } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import { createSurvey, createSurveyStatus, getSurveyData, updateSurvey } from '@/redux/actions/surveyActionTypes'
import { IGetSurvey, ISurvey } from '@/types/surveyInterface'
import { FaAngleDown, FaCalendarDays, FaDownload, FaPlus } from 'react-icons/fa6'
import SurveyManagementTable from '@/components/tables/SurveyManagementTable'
import moment from 'moment'
import * as XLSX from 'xlsx';
import NotificationManagementTable from '@/components/tables/NotificationManagementTable'

type Props = {}

const index = (props: Props) => {
    const dispatch = useDispatch();
    const [minExpiryDate, setMinExpiryDate] = React.useState('');
    const [surveyDetails, setSurveyDetails] = useState<ISurvey>();
    const formatDate = (date: any) => date ? new Date(date).toISOString().split('T')[0] : '';

    const [visible, setVisible] = useState(false);
    const surveyData = useSelector((state: AppState) => state.surveyData.surveysData)
    const uploadStatusFile = useSelector((state: AppState) => state.surveyData.uploadStatusFile)
    const isLoader = useSelector((state: AppState) => state.userData.isFormLoader)

    const usersLoader = useSelector((state: AppState) => state?.userData?.usersLoader);
    // console.log("surveyData ==>", surveyData);
    const [iconPreview, setIconPreview] = useState("/images/logo.svg")

    const [searchQuery, setSearchQuery] = useState('')
    const columns = [
        { Header: 'User Name', accessor: 'appointmentTime' },
    ];

    const validationSchema = Yup.object().shape({
        // surveyNudgeIcon: Yup.mixed()
        //     .required('Survey Icon is required.')
        //     .test(
        //         'fileType',
        //         'Only image files are allowed (jpg, jpeg, png)',
        //         (value: any) => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
        //     )
        //     .test(
        //         "fileSize",
        //         "File size must be less than 2MB.",
        //         (value) => value && (value as File).size <= 2 * 1024 * 1024 // 2MB in bytes
        //     ),
        name: Yup.string()
            .max(20, 'Survey Name must be 20 characters or less.')
            .required('Survey Name is required.'),
        surveyContent: Yup.string()
            .max(20, 'Survey Content must be 20 characters or less.')
            .required('Survey Content is required.'),
        priority: Yup.number()
            .typeError('Priority must be a number.')
            .min(1, 'Priority must be at least 1.')
            .max(5, 'Priority must not exceed 5.')
            .required('Priority is required.'),
        // startDate: Yup.date()
        //     .required('Start Date is required.')
        //     .typeError('Invalid date format.'),
        // expiryDate: Yup.date()
        //     .required('Expiry Date is required.')
        //     .typeError('Invalid date format.')
        //     .min(Yup.ref('startDate'), 'Expiry Date cannot be before Start Date.'),
        startDate: Yup.date()
            .required('Start Date is required.')
            .typeError('Invalid date format.')
            .min(new Date(), 'Start Date must be in the future.'), // Start date should be in the future
        expiryDate: Yup.date()
            .required('Expiry Date is required.')
            .typeError('Invalid date format.')
            .min(Yup.ref('startDate'), 'Expiry Date cannot be before Start Date.') // Expiry should be after start date
            .min(new Date(), 'Expiry Date must be in the future.'), // Expiry date should also be in the future
    });

    useEffect(() => {
        const getSurveyPaylod: IGetSurvey = {
            current_page: 1,
            search: searchQuery
        }
        dispatch(getSurveyData(getSurveyPaylod))
    }, [searchQuery])

    const openModal = () => {
        setVisible(true);
        resetDetailsForm();
    }
    const data = [
        { name: 'John', age: 28, occupation: 'Engineer' },
        { name: 'Jane', age: 22, occupation: 'Designer' },
        { name: 'Doe', age: 34, occupation: 'Manager' }
    ];

    const cancelHandler = () => {
        setVisible(false)
        setIconPreview('/images/logo.svg')
    }

    const items = [{ label: 'Notification Management' }];
    useEffect(() => {
        if (uploadStatusFile) {
            setVisible(false)
            dispatch(createSurveyStatus(false))
            setIconPreview('/images/logo.svg')
        }
    }, [uploadStatusFile])

    console.log("surveyDetails ==>", surveyDetails);

    useEffect(() => {
        if (surveyDetails && surveyDetails?.name?.length > 0) {
            setVisible(true)
        }
    }, [surveyDetails])

    const resetDetailsForm = () => {
        setSurveyDetails(
            {
                name: "",
                surveyNudgeIcon: "",
                surveyNudgeContent: "",
                priority: "5",
                startAt: "",
                endAt: ""
            } as ISurvey
        )
    }

    useEffect(() => {
        if (visible === false) {
            resetDetailsForm()
        }
    }, [visible])

    return (
        <div>
            <Head>
                <title>Notification Management - Aaloo</title>
            </Head>
            <Layout>
                {/* <TopNavbar /> */}
                {/* <TopBar /> */}
                <div className='flex flex-wrap justify-between px-5 pt-4'>
                    <div>
                        <h1 className='title_text_expo gradient-text font-bold'>
                            Notification Management</h1>
                    </div>
                    <div>
                        <BreadCrumbs items={items} />
                    </div>
                </div>
                <div className='px-5'>
                    <div className='flex py-3 justify-between relative'>
                        <div className='md:w-3/12'>
                            <div className='relative'>
                                <SearchModal setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                            </div>
                        </div>
                        <div className='md:w-6/24'>
                            <div className='flex gap-3'>
                                <button className='bg-[#D12149] p-2 px-4 rounded-md flex items-center gap-1 text-white hover:!bg-gradient-to-l hover:from-[#D12149] hover:to-[#932e46]' onClick={() => openModal()}><FaPlus className='cursor-pointer' size={16} /> Add Notification</button>
                            </div>
                        </div>
                    </div>
                    {usersLoader ?
                        <LoadingAnimated />
                        : <>
                            {surveyData?.surveys?.length > 0 ?
                                <NotificationManagementTable searchQuery={searchQuery} columns={columns} dataList={surveyData.surveys} setSurveyDetails={setSurveyDetails} />
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
            </Layout>
            <div className="card flex justify-content-center">
                <Dialog visible={visible} className='max-w-[600px]' header={surveyDetails?.id ? "Update Notification" : "Add Notification"} style={{ width: '50vw' }} draggable={false} onHide={() => {
                    setVisible(false);
                    setIconPreview('/images/logo.svg')
                }}>
                    <div className='py-4'>
                        <div className='mb-3'>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: surveyDetails ? surveyDetails.name : "",
                                    surveyNudgeIcon: surveyDetails ? surveyDetails.surveyNudgeIcon : "",
                                    surveyContent: surveyDetails ? surveyDetails.surveyNudgeContent : "",
                                    priority: surveyDetails ? surveyDetails.priority : 5,
                                    startDate: surveyDetails ? moment(surveyDetails.startAt).format('YYYY-MM-DDTHH:mm') : "",
                                    expiryDate: surveyDetails ? moment(surveyDetails.endAt).format('YYYY-MM-DDTHH:mm') : "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    console.log("Survey Sucessfully Submit", values);
                                    if (surveyDetails?.id) {
                                        dispatch(updateSurvey({ ...values, id: surveyDetails.id }));
                                        console.log("Survey Update Sucessfully Submit", surveyDetails.id);

                                    } else {
                                        dispatch(createSurvey(values));
                                    }
                                    resetForm()
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="form-input">
                                        <div className="grid grid-cols-1 gap-x-4 gap-y-2 pb-2">
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Title</label>
                                                    <input
                                                        className="border w-full"
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        value={values.surveyContent || ''}
                                                        maxLength={20}
                                                        placeholder="Title"
                                                        onChange={(e) => setFieldValue("title", e.target.value)} // Set email value
                                                    />
                                                    <ErrorMessage
                                                        name="title"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Description</label>
                                                    <input
                                                        className="border w-full"
                                                        type="text"
                                                        id="description"
                                                        name="description"
                                                        value={values.name || ''}
                                                        maxLength={20}
                                                        placeholder="Description"
                                                        onChange={(e) => setFieldValue("description", e.target.value)} // Set email value
                                                    />
                                                    <ErrorMessage
                                                        name="description"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-2">
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Audience</label>
                                                    <div className="relative">
                                                        <Field
                                                            id="audience"
                                                            name="audience"
                                                            as="select"
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option value="" selected disabled>
                                                                Select Option Type
                                                            </option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="all">All</option>
                                                        </Field>
                                                        <div className="pointer-events-none absolute inset-y-0 top-1 right-0 flex items-center px-2 text-sm text-gray-700">
                                                            <FaAngleDown />
                                                        </div>
                                                    </div>
                                                    <ErrorMessage
                                                        name="description"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Nudge Time </label>
                                                    <input
                                                        className="border w-full p-2"
                                                        type="datetime-local"
                                                        id="nudgeTime"
                                                        name="nudgeTime"
                                                        value={values.startDate || ''}
                                                        placeholder="Nudge Time"
                                                        min={new Date().toISOString().slice(0, 16)} // Disable past dates
                                                        onChange={(e) => {
                                                            setFieldValue("nudgeTime", e.target.value)
                                                            setMinExpiryDate(e.target.value); // Update minimum Expiry Date
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name="nudgeTime"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="my-3 flex justify-between">
                                            <button type="button" className="btn btn-light p-4 w-2/4 me-4 h-52px" onClick={() => cancelHandler()} >
                                                Cancel
                                            </button>
                                            {/* disabled={disabled}  */}
                                            <button type="submit" className="btn btn-dark w-2/4 h-52px" disabled={isLoader} >
                                                {/* {surveyDetails?.id ? 'Update' : 'Submit'} */}
                                                {isLoader ? <PulseLoader color="#ffffff" /> : surveyDetails?.id ? 'Update' : 'Submit'}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Dialog>
            </div >
        </div >
    )
}

export default index