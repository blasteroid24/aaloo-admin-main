import BreadCrumbs from '@/components/breadCrumb/BreadCrumbs'
import Layout from '@/components/Layout'
import LoadingAnimated from '@/components/loading/LoadingAnimated'
import TopBar from '@/components/navbars/Topbar'
import SearchModal from '@/components/search-modal/SearchModal'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import { AppState } from '@/redux/types'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup';
import Head from 'next/head'
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useState } from 'react'
import { HiOutlineInboxStack } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import { createSurvey, createSurveyStatus, getSurveyById, getSurveyData, getSurveyQuestionsData } from '@/redux/actions/surveyActionTypes'
import { IGetSurvey, IGetSurveyById, IGetSurveyQuestions } from '@/types/surveyInterface'
import { FaCalendarDays, FaPlus } from 'react-icons/fa6'
import QuestionManagementTable from '@/components/tables/QuestionManagementTable'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {}

const index = (props: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const surveyId = router.query.id;
    const [minExpiryDate, setMinExpiryDate] = React.useState('');
    const [visible, setVisible] = useState(false);
    const surveyQuestionsData = useSelector((state: AppState) => state.surveyData.surveyQuestionsData)
    const getSurvey = useSelector((state: AppState) => state.surveyData.getSurveyByIdData.getSurveyById)
    const surveyQuestions = useSelector((state: AppState) => state.surveyData.surveyQuestionsData.surveyQuestions)
    const uploadStatusFile = useSelector((state: AppState) => state.surveyData.uploadStatusFile)
    console.log("getSurvey", getSurvey);

    const usersLoader = useSelector((state: AppState) => state?.surveyData.createSurveyStatus);
    const [iconPreview, setIconPreview] = useState("/images/logo.svg")

    const [searchQuery, setSearchQuery] = useState('')
    const columns = [
        { Header: 'User Name', accessor: 'appointmentTime' },
    ];

    const validationSchema = Yup.object().shape({
        surveyIcon: Yup.mixed()
            .required('Survey Icon is required.')
            .test(
                'fileType',
                'Only image files are allowed (jpg, png)',
                (value: any) => value && ['image/jpeg', 'image/png'].includes(value.type)
            )
            .test(
                "fileSize",
                "File size must be less than 2MB.",
                (value) => value && (value as File).size <= 2 * 1024 * 1024 // 2MB in bytes
            ),
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
        startDate: Yup.date()
            .required('Start Date is required.')
            .typeError('Invalid date format.'),
        expiryDate: Yup.date()
            .required('Expiry Date is required.')
            .typeError('Invalid date format.')
            .min(Yup.ref('startDate'), 'Expiry Date cannot be before Start Date.'),
    });

    useEffect(() => {
        if (router.isReady) {
            const getSurveyPaylod: IGetSurveyQuestions = {
                surveyId: Number(surveyId),
                current_page: 1,
                search: searchQuery
            }
            dispatch(getSurveyQuestionsData(getSurveyPaylod))
            const getSurveyByIdPaylod: IGetSurveyById = {
                surveyId: Number(surveyId)
            }
            dispatch(getSurveyById(getSurveyByIdPaylod))
        }
    }, [searchQuery, surveyId, router])

    const openModal = () => {
        setVisible(true);
    }

    const cancelHandler = () => {
        setVisible(false)
    }

    const items = [{ label: 'Questions List' }];
    useEffect(() => {
        if (uploadStatusFile) {
            setVisible(false)
            dispatch(createSurveyStatus(false))
            setIconPreview('/images/logo.svg')
        }
    }, [uploadStatusFile])

    return (
        <div>
            <Head>
                <title>Questions List - Aaloo</title>
            </Head>
            <Layout>
                {/* <TopNavbar /> */}
                {/* <TopBar /> */}
                <div className='flex flex-wrap justify-between px-5 pt-4'>
                    <div>
                        <h1 className='title_text_expo gradient-text font-bold'>
                            Questions List</h1>
                    </div>
                    <div>
                        <BreadCrumbs items={items} />
                    </div>
                </div>
                <div className='px-5'>
                    <div className="relative flex flex-col bg-red-100 text-red-700 shadow-sm border border-red-200 rounded-lg w-full p-2 px-3">
                        <h3 className='text-lg font-medium flex align-middle items-center justify-between'><span>{getSurvey?.name}</span> <span className='text-sm'>Start Date: {getSurvey?.startAtLabel} | Expiry Date: {getSurvey?.endAtLabel}</span></h3>
                    </div>
                    <div className='flex py-3 justify-between relative'>
                        <div className='md:w-3/12'>
                            {/* <div className='relative'>
                                <SearchModal setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                            </div> */}
                        </div>
                        <div className='md:w-6/24'>
                            <div className='flex gap-3'>
                                {/* /questions/22/add-question */}
                                {getSurvey?.isEdit === true && (
                                    <Link href={`/questions/${router.query.id}/question`}>
                                        <button className='bg-[#D12149] p-2 px-4 rounded-md flex items-center gap-1 text-white hover:!bg-gradient-to-l hover:from-[#D12149] hover:to-[#932e46]'><FaPlus className='cursor-pointer' size={16} /> Add Question</button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    {usersLoader ?
                        <LoadingAnimated />
                        : <>
                            {surveyQuestions?.length > 0 ?
                                <QuestionManagementTable searchQuery={searchQuery} columns={columns} dataList={surveyQuestionsData.surveyQuestions} isEdit={getSurvey.isEdit} />
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
                <Dialog visible={visible} className='max-w-[600px]' header="Add Survey" style={{ width: '50vw' }} draggable={false} onHide={() => setVisible(false)}>
                    <div className='py-4'>
                        <div className='mb-3'>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: "",
                                    surveyNudgeIcon: "",
                                    surveyContent: "",
                                    priority: "",
                                    startDate: "",
                                    expiryDate: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    console.log("Survey Sucessfully Submit", values);
                                    dispatch(createSurvey(values));
                                    // resetForm()
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="form-input">
                                        <div className="grid grid-flow-col gap-3">
                                            <div className="col-span-1">
                                                <div className='bg-slate-100 rounded-full p-2 w-20 h-20 mt-2'>
                                                    <img src={iconPreview} className='w-full h-full object-contain' alt="" />
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div className="pb-2">
                                                    <label htmlFor="surveyIcon" className="block mb-1 font-medium">
                                                        Survey Nudge Icon
                                                    </label>
                                                    <input
                                                        className="border w-full p-2"
                                                        type="file"
                                                        id="surveyIcon"
                                                        name="surveyIcon"
                                                        accept="image/png, image/jpeg"
                                                        title="Upload Survey Nudge Icon"
                                                        onChange={(e) => {
                                                            const file = e.target.files ? e.target.files[0] : null;

                                                            if (file) {
                                                                setFieldValue("surveyIcon", file);

                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    if (typeof reader.result === 'string') {
                                                                        setIconPreview(reader.result);
                                                                    }
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />

                                                    <ErrorMessage
                                                        name="surveyIcon"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-x-4 gap-y-2 pb-2">
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Survey Content</label>
                                                    <input
                                                        className="border w-full"
                                                        type="text"
                                                        id="surveyContent"
                                                        name="surveyContent"
                                                        maxLength={20}
                                                        placeholder="Survey Nudge Content"
                                                        onChange={(e) => setFieldValue("surveyContent", e.target.value)} // Set email value
                                                    />
                                                    <ErrorMessage
                                                        name="surveyContent"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-2">
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Survey Name</label>
                                                    <input
                                                        className="border w-full"
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        maxLength={20}
                                                        placeholder="Survey Name"
                                                        onChange={(e) => setFieldValue("name", e.target.value)} // Set email value
                                                    />
                                                    <ErrorMessage
                                                        name="name"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Priority</label>
                                                    <input
                                                        className="border w-full p-2"
                                                        type="text"
                                                        id="priority"
                                                        name="priority"
                                                        maxLength={1}
                                                        placeholder="Survey priority"
                                                        onChange={(e) => {
                                                            if (e.target.value.length <= 1) { // Max length logic
                                                                setFieldValue("priority", e.target.value);
                                                            }
                                                        }} // Set email value
                                                    />
                                                    <ErrorMessage
                                                        name="priority"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Start Date</label>
                                                    <input
                                                        className="border w-full p-2"
                                                        type="date"
                                                        id="startDate"
                                                        name="startDate"
                                                        placeholder="Start Date"
                                                        min={new Date().toISOString().split("T")[0]} // Disable past dates
                                                        onChange={(e) => {
                                                            setFieldValue("startDate", e.target.value)
                                                            setMinExpiryDate(e.target.value); // Update minimum Expiry Date
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name="startDate"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div className="">
                                                    <label>Expiry Date</label>
                                                    <input
                                                        className="border w-full p-2"
                                                        type="date"
                                                        id="expiryDate"
                                                        name="expiryDate"
                                                        placeholder="Expiry Date"
                                                        min={minExpiryDate || new Date().toISOString().split("T")[0]} // Disable past dates
                                                        onChange={(e) => setFieldValue("expiryDate", e.target.value)}
                                                    />
                                                    <ErrorMessage
                                                        name="expiryDate"
                                                        component="div"
                                                        className="text-red-500 text-[13px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="my-3 flex justify-between">
                                            <button type="button" className="btn btn-light p-4 w-2/4 me-4" onClick={() => cancelHandler()} style={{ height: "52px" }}>
                                                Cancel
                                            </button>
                                            {/* disabled={disabled}  */}
                                            <button type="submit" className="btn btn-dark w-2/4" disabled={uploadStatusFile} style={{ height: "52px" }}>
                                                {uploadStatusFile ? <PulseLoader color="#ffffff" /> : 'Submit'}
                                            </button>
                                        </div>
                                        {/* <div className="mt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-dark w-full uppercase hover:!border-none hover:!text-white hover:[#000]"
                                                disabled={isLoading}
                                                style={{
                                                    padding: "14px",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                {isLoading ? <PulseLoader color="#ffffff" /> : "Sign In"}
                                            </button>
                                        </div> */}
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default index