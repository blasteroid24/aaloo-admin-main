// import BreadCrumbs from '@/components/breadCrumb/BreadCrumbs'
// import Layout from '@/components/Layout'
// import LoadingAnimated from '@/components/loading/LoadingAnimated'
// import TopBar from '@/components/navbars/Topbar'
// import SearchModal from '@/components/search-modal/SearchModal'
// import TopNavbar from '@/components/top-navbar/TopNavbar'
// import { AppState } from '@/redux/types'
// import { ErrorMessage, Field, Form, Formik } from 'formik'
// import * as Yup from 'yup';
// import Head from 'next/head'
// import { Dialog } from 'primereact/dialog'
// import React, { useEffect, useState } from 'react'
// import { HiOutlineInboxStack } from "react-icons/hi2";
// import { useDispatch, useSelector } from 'react-redux'
// import { PulseLoader } from 'react-spinners'
// import { createSurvey, createSurveyStatus, getSurveyData } from '@/redux/actions/surveyActionTypes'
// import { IGetSurvey } from '@/types/surveyInterface'
// import { FaCalendarDays, FaMinus, FaPlus } from 'react-icons/fa6'
// import QuestionManagementTable from '@/components/tables/QuestionManagementTable'

// type Props = {}

// const index = (props: Props) => {
//     const dispatch = useDispatch();
//     const [minExpiryDate, setMinExpiryDate] = React.useState('');
//     const [visible, setVisible] = useState(false);
//     const surveyData = useSelector((state: AppState) => state.surveyData.surveysData)
//     const uploadStatusFile = useSelector((state: AppState) => state.surveyData.uploadStatusFile)

//     const usersLoader = useSelector((state: AppState) => state?.userData?.usersLoader);
//     console.log("surveyData ==>", surveyData);
//     const [iconPreview, setIconPreview] = useState("/images/logo.svg")

//     const [searchQuery, setSearchQuery] = useState('')
//     const columns = [
//         { Header: 'User Name', accessor: 'appointmentTime' },
//     ];

//     const validationSchema = Yup.object().shape({
//         surveyIcon: Yup.mixed()
//             .required('Survey Icon is required.')
//             .test(
//                 'fileType',
//                 'Only image files are allowed (jpg, png)',
//                 (value: any) => value && ['image/jpeg', 'image/png'].includes(value.type)
//             )
//             .test(
//                 "fileSize",
//                 "File size must be less than 2MB.",
//                 (value) => value && (value as File).size <= 2 * 1024 * 1024 // 2MB in bytes
//             ),
//         name: Yup.string()
//             .max(20, 'Survey Name must be 20 characters or less.')
//             .required('Survey Name is required.'),
//         surveyContent: Yup.string()
//             .max(20, 'Survey Content must be 20 characters or less.')
//             .required('Survey Content is required.'),
//         priority: Yup.number()
//             .typeError('Priority must be a number.')
//             .min(1, 'Priority must be at least 1.')
//             .max(5, 'Priority must not exceed 5.')
//             .required('Priority is required.'),
//         startDate: Yup.date()
//             .required('Start Date is required.')
//             .typeError('Invalid date format.'),
//         expiryDate: Yup.date()
//             .required('Expiry Date is required.')
//             .typeError('Invalid date format.')
//             .min(Yup.ref('startDate'), 'Expiry Date cannot be before Start Date.'),
//     });

//     useEffect(() => {
//         const getSurveyPaylod: IGetSurvey = {
//             current_page: 1,
//             search: searchQuery
//         }
//         dispatch(getSurveyData(getSurveyPaylod))
//     }, [searchQuery])

//     const cancelHandler = () => {
//         setVisible(false)
//     }

//     const items = [{ label: 'Add Questions' }];
//     useEffect(() => {
//         if (uploadStatusFile) {
//             setVisible(false)
//             dispatch(createSurveyStatus(false))
//             setIconPreview('/images/logo.svg')
//         }
//     }, [uploadStatusFile])

//     const [inputFields, setInputFields] = useState<{ [key: string]: string }[]>([{ surveyContent: '' }]);

//     // Add new input field
//     const handleAddField = () => {
//         setInputFields([...inputFields, { surveyContent: '' }]);
//     };

//     // Remove input field
//     const handleRemoveField = (index: number) => {
//         const newFields = inputFields.filter((_, i) => i !== index);
//         setInputFields(newFields);
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//         const { name, value } = e.target;
//         const newFields = [...inputFields];
//         newFields[index][name] = value;
//         setInputFields(newFields);
//     };

//     return (
//         <div>
//             <Head>
//                 <title>Add Questions - Aaloo</title>
//             </Head>
//             <Layout>
//                 {/* <TopNavbar /> */}
//                 {/* <TopBar /> */}
//                 <div className='flex flex-wrap justify-between px-5 pt-4'>
//                     <div>
//                         <h1 className='title_text_expo gradient-text font-bold'>
//                             Add Questions</h1>
//                     </div>
//                     <div>
//                         <BreadCrumbs items={items} />
//                     </div>
//                 </div>
//                 <div className='px-5'>
//                     <div className="relative flex flex-col bg-red-100 text-red-700 shadow-sm border border-red-200 rounded-lg w-full p-2 px-3">
//                         <h3 className='text-lg font-medium flex align-middle items-center justify-between'><span>Survey Name</span> <span className='text-sm'>Start Date: January 22, 2025 | Expiry Date: January 22, 2025</span></h3>
//                     </div>
//                     <div className="relative flex flex-col my-6 bg-white shadow-xl border border-slate-200 rounded-lg w-full p-4">
//                         <Formik
//                             enableReinitialize
//                             initialValues={{
//                                 name: "",
//                                 surveyIcon: "",
//                                 surveyContent: "",
//                                 priority: "",
//                                 startDate: "",
//                                 expiryDate: "",
//                             }}
//                             validationSchema={validationSchema}
//                             onSubmit={(values, { resetForm }) => {
//                                 console.log("Survey Sucessfully Submit", values);
//                                 dispatch(createSurvey(values));
//                                 // resetForm()
//                             }}
//                         >
//                             {({ values, setFieldValue }) => (
//                                 <Form className="form-input">
//                                     <div className="grid grid-cols-4 gap-x-4 gap-y-2 pb-2">
//                                         <div className="col-span-1">
//                                             <div className="">
//                                                 <label>Question Type</label>
//                                                 <Field className="border w-full" name="questionType" as="select">
//                                                     <option value="" selected disabled>Select Audience</option>
//                                                     <option value="multiple">Multiple Choice</option>
//                                                     <option value="single">Single Choice</option>
//                                                 </Field>
//                                                 <ErrorMessage
//                                                     name="surveyContent"
//                                                     component="div"
//                                                     className="text-red-500 text-[13px]"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-span-1">
//                                             <div className="">
//                                                 <label>Skipable Question</label>
//                                                 <Field className="border w-full" name="skipableQuestion" as="select">
//                                                     <option value="multiple">True</option>
//                                                     <option value="single">False</option>
//                                                 </Field>
//                                                 <ErrorMessage
//                                                     name="surveyContent"
//                                                     component="div"
//                                                     className="text-red-500 text-[13px]"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-span-1">
//                                             <div className="">
//                                                 <label>Aaloo Fries</label>
//                                                 <input
//                                                     className="border w-full"
//                                                     type="number"
//                                                     id="surveyContent"
//                                                     name="surveyContent"
//                                                     maxLength={5}
//                                                     placeholder="Aaloo Fries"
//                                                     onChange={(e) => setFieldValue("surveyContent", e.target.value)} // Set email value
//                                                 />
//                                                 <ErrorMessage
//                                                     name="surveyContent"
//                                                     component="div"
//                                                     className="text-red-500 text-[13px]"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-span-1">
//                                             <div className="">
//                                                 <label>Survey Content</label>
//                                                 <Field className="border w-full" name="audience" as="select">
//                                                     <option value="" selected disabled>Select Audience</option>
//                                                     <option value="male">Male</option>
//                                                     <option value="female">Female</option>
//                                                     <option value="other">Other</option>
//                                                 </Field>
//                                                 {/* <input
//                                                     className="border w-full"
//                                                     type="text"
//                                                     id="surveyContent"
//                                                     name="surveyContent"
//                                                     maxLength={20}
//                                                     placeholder="Survey Nudge Content"
//                                                     onChange={(e) => setFieldValue("surveyContent", e.target.value)} // Set email value
//                                                 /> */}
//                                                 <ErrorMessage
//                                                     name="surveyContent"
//                                                     component="div"
//                                                     className="text-red-500 text-[13px]"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="grid grid-cols-4 gap-x-4 gap-y-2 pb-2">
//                                         <div className="col-span-1">
//                                             <div className="">
//                                                 <label>Answer Type</label>
//                                                 <Field className="border w-full" name="answerType" as="select">
//                                                     <option value="" selected disabled>Select Answer Type</option>
//                                                     <option value="Image">Image</option>
//                                                     <option value="Text">Text</option>
//                                                 </Field>
//                                                 <ErrorMessage
//                                                     name="surveyContent"
//                                                     component="div"
//                                                     className="text-red-500 text-[13px]"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="relative flex flex-col my-6 bg-white shadow-xl border border-slate-200 rounded-lg w-full p-4">
//                                         <div className="grid grid-cols-3 gap-x-4 gap-y-2 pb-2">
//                                             <div className="grid grid-cols-1 gap-x-4 gap-y-2 pb-2">
//                                                 <div className="col-span-1 mb-1">
//                                                     <div className="">
//                                                         <label>Question</label>
//                                                         <input
//                                                             className="border w-full"
//                                                             type="text"
//                                                             id="surveyContent"
//                                                             name="surveyContent"
//                                                             maxLength={20}
//                                                             placeholder="Add Question"
//                                                             onChange={(e) => setFieldValue("surveyContent", e.target.value)} // Set email value
//                                                         />
//                                                         <ErrorMessage
//                                                             name="surveyContent"
//                                                             component="div"
//                                                             className="text-red-500 text-[13px]"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 {/* <div className="col-span-1 mb-1">
//                                                     <div className="flex gap-2">
//                                                         <input
//                                                             className="border w-full"
//                                                             type="text"
//                                                             id="surveyContent"
//                                                             name="surveyContent"
//                                                             maxLength={20}
//                                                             placeholder=""
//                                                             onChange={(e) => setFieldValue("surveyContent", e.target.value)} // Set email value
//                                                         />
//                                                         <button type='button' className='btn btn-light w-1/6 text-center flex justify-center items-center'><FaMinus className='cursor-pointer' size={16} /></button>
//                                                         <button type='button' className='btn btn-light w-1/6 text-center flex justify-center items-center'><FaPlus className='cursor-pointer' size={16} /></button>
//                                                     </div>
//                                                 </div> */}
//                                                 {inputFields.map((field, index) => (
//                                                     <div className="col-span-1 mb-1" key={index}>
//                                                         <div className="flex gap-2">
//                                                             <input
//                                                                 className="border w-full"
//                                                                 type="text"
//                                                                 id={`surveyContent-${index}`}
//                                                                 name="surveyContent"
//                                                                 maxLength={20}
//                                                                 value={field.surveyContent}
//                                                                 placeholder=""
//                                                                 onChange={(e) => handleChange(e, index)}
//                                                             />
//                                                             {inputFields.length > 1 && (
//                                                                 <button
//                                                                     type="button"
//                                                                     className="btn btn-light w-1/6 text-center flex justify-center items-center"
//                                                                     onClick={() => handleRemoveField(index)}
//                                                                 >
//                                                                     <FaMinus className="cursor-pointer" size={16} />
//                                                                 </button>
//                                                             )}
//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-light w-1/6 text-center flex justify-center items-center"
//                                                                 onClick={handleAddField}
//                                                             >
//                                                                 <FaPlus className="cursor-pointer" size={16} />
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="my-3 flex justify-between">
//                                         <button type="button" className="btn btn-light p-4 w-2/4 me-4" onClick={() => cancelHandler()} style={{ height: "52px" }}>
//                                             Cancel
//                                         </button>
//                                         {/* disabled={disabled}  */}
//                                         <button type="submit" className="btn btn-dark w-2/4" disabled={uploadStatusFile} style={{ height: "52px" }}>
//                                             {uploadStatusFile ? <PulseLoader color="#ffffff" /> : 'Submit'}
//                                         </button>
//                                     </div>
//                                     {/* <div className="mt-3">
//                                                 <button
//                                                     type="submit"
//                                                     className="btn btn-dark w-full uppercase hover:!border-none hover:!text-white hover:[#000]"
//                                                     disabled={isLoading}
//                                                     style={{
//                                                         padding: "14px",
//                                                         borderRadius: "8px",
//                                                     }}
//                                                 >
//                                                     {isLoading ? <PulseLoader color="#ffffff" /> : "Sign In"}
//                                                 </button>
//                                             </div> */}
//                                 </Form>
//                             )}
//                         </Formik>
//                     </div>
//                 </div>
//             </Layout>
//         </div>
//     )
// }

// export default index
import React, { useState } from 'react';
import { Formik, Field, FieldArray, Form } from 'formik';
import Layout from '@/components/Layout';
import BreadCrumbs from '@/components/breadCrumb/BreadCrumbs';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useDropzone } from 'react-dropzone';

const dropzoneStyles: React.CSSProperties = {
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
};

const previewContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
};

const previewItemStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const imageStyles: React.CSSProperties = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginBottom: '5px',
};

const index = () => {
    const items = [{ label: 'Add Questions' }];
    const [files, setFiles] = useState<Array<{ preview: string; name: string }>>([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] }, // Accept image files
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file), // Create file preview URL
                    })
                )
            );
        },
    });
    return (
        <div>
            <Layout>
                <div className='flex flex-wrap justify-between px-5 pt-4'>
                    <div>
                        <h1 className='title_text_expo gradient-text font-bold'>Add Questions</h1>
                    </div>
                    <div>
                        <BreadCrumbs items={items} />
                    </div>
                </div>
                <div className='px-5'>
                    <div className="relative flex flex-col  bg-red-100 text-red-700 shadow-sm border border-red-200 rounded-lg w-full p-2 px-3">
                        <h3 className='text-lg font-medium flex align-middle items-center justify-between'><span>Survey Name</span> <span className='text-sm'>Start Date: January 22, 2025 | Expiry Date: January 22, 2025</span></h3>
                    </div>
                    <Formik
                        initialValues={{
                            surveyId: 1,
                            skipableQuestion: '',
                            optionType: [''], // This will be a string representing the selected option
                            questionType: '',
                            audience: '',
                            answerType: 'text',
                            question: '',
                            incentivePoint: 0,
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ values }) => (
                            <Form className="mx-auto form-input pt-5">
                                <div className='grid md:grid-cols-4 grid-cols-2 gap-4 mb-2'>
                                    {/* <div>
                                        <label htmlFor="surveyId" className="block text-sm font-medium text-gray-700">
                                            Survey ID
                                        </label>
                                        <Field
                                            id="surveyId"
                                            name="surveyId"
                                            type="number"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div> */}

                                    {/* Option Type: Select dropdown */}
                                    <div>
                                        <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">
                                            Question Type
                                        </label>
                                        <Field
                                            id="questionType"
                                            name="questionType"
                                            as="select"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Option Type</option>
                                            <option value="singleChoice">Single Choice</option>
                                            <option value="multipleChoice">Multiple Choice</option>
                                        </Field>
                                    </div>
                                    {/* Option Type: Select dropdown */}
                                    <div>
                                        <label htmlFor="skipableQuestion" className="block text-sm font-medium text-gray-700">
                                            Skipable Question
                                        </label>
                                        <Field
                                            id="skipableQuestion"
                                            name="skipableQuestion"
                                            as="select"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Option Type</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </Field>
                                    </div>
                                    <div>
                                        <label htmlFor="incentivePoint" className="block text-sm font-medium text-gray-700">
                                            Incentive Points
                                        </label>
                                        <Field
                                            id="incentivePoint"
                                            name="incentivePoint"
                                            type="number"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
                                            Audience
                                        </label>
                                        <Field
                                            id="audience"
                                            name="audience"
                                            as="select"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Option Type</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                    </div>
                                </div>

                                {/* Answer Type: Select dropdown */}
                                <div className="grid grid-cols-4 gap-x-4 gap-y-2 pb-2">
                                    <div>
                                        <label htmlFor="answerType" className="block text-sm font-medium text-gray-700">
                                            Answer Type
                                        </label>
                                        <Field
                                            id="answerType"
                                            name="answerType"
                                            as="select"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Option Type</option>
                                            <option value="text">Text</option>
                                            <option value="image">Image</option>
                                        </Field>
                                    </div>
                                </div>
                                {/* FieldArray for questionType */}
                                <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full p-4">
                                    <div className="grid grid-cols-3 gap-x-4 gap-y-2 pb-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Question
                                            </label>
                                            <Field
                                                id="question"
                                                name="question"
                                                type="text"
                                                placeholder="Add Question"
                                                className="mt-1 mb-3 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {values.answerType === 'text' ? (
                                                <FieldArray name="optionType">
                                                    {({ push, remove }) => (
                                                        <div className="space-y-2">
                                                            {values.optionType.map((question, index) => (
                                                                // <div key={index} className="flex items-center space-x-4">
                                                                <div className="grid grid-cols-6 gap-x-3 gap-y-2 pb-2">
                                                                    <Field
                                                                        name={`optionType[${index}]`}
                                                                        type="text"
                                                                        placeholder="Add Option"
                                                                        className="col-span-5 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    />
                                                                    <div className='col-span-1'>
                                                                        {index === values.optionType.length - 1 && values.optionType.length < 7 && (
                                                                            <button
                                                                                type="button"
                                                                                aria-label="Add Option"
                                                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full h-full flex justify-center items-center"
                                                                                onClick={() => push('')} // Add at the last index
                                                                            >
                                                                                <FaPlus className="cursor-pointer" size={16} />
                                                                            </button>
                                                                        )}
                                                                        {index !== values.optionType.length - 1 && (
                                                                            <button
                                                                                type="button"
                                                                                aria-label="Remove Option"
                                                                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full h-full flex justify-center items-center"
                                                                                onClick={() => remove(index)} // Remove current option
                                                                            >
                                                                                <FaMinus className="cursor-pointer" size={16} />
                                                                            </button>
                                                                        )}
                                                                    </div>


                                                                </div>
                                                            ))}

                                                        </div>
                                                    )}
                                                </FieldArray>
                                            ) : (
                                                <div>
                                                    <div {...getRootProps()} style={dropzoneStyles}>
                                                        <input {...getInputProps()} />
                                                        <p>Drag & drop some files here, or click to select files</p>
                                                    </div>

                                                    <div style={previewContainerStyles}>
                                                        {files.map((file, index) => (
                                                            <div key={index} style={previewItemStyles}>
                                                                <img src={file.preview} alt="preview" style={imageStyles} />
                                                                <p>{file.name}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <button
                                        type="submit"
                                        className="w-auto py-3 px- btn btn-dark px-6"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Layout>
        </div>

    );
};

export default index;
