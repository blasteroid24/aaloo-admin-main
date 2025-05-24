import React, { useEffect, useState } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import Layout from "@/components/Layout";
import BreadCrumbs from "@/components/breadCrumb/BreadCrumbs";
import { FaAngleDown, FaMinus, FaPlus } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestion,
  questionStatus,
  getQuestionById,
  getSurveyById,
  setQuestionById,
  updateQuestion,
} from "@/redux/actions/surveyActionTypes";
import { toast } from "react-toastify";
import { AppState } from "@/redux/types";
import { useRouter } from "next/router";
import { IGetQuestionsById, IGetSurveyById } from "@/types/surveyInterface";
import { PulseLoader } from "react-spinners";

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #cccccc",
  borderRadius: "5px",
  padding: "15px",
  textAlign: "center",
  cursor: "pointer",
};

const previewContainerStyles: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const previewItemStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imageStyles: React.CSSProperties = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
  marginBottom: "5px",
};

type Props = {};

const AddQuestions = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const surveyId = router.query.id;
  const questionId = router.query.param;
  const items = [{ label: questionId ? "Update Questions" : "Add Questions" }];
  const [files, setFiles] = useState<Array<{ preview: string; name: string }>>(
    []
  );
  const getSurvey = useSelector(
    (state: AppState) => state.surveyData.getSurveyByIdData.getSurveyById
  );
  const getQuestionDetails = useSelector(
    (state: AppState) => state.surveyData.questionsDataById
  );
  const createQuestionState = useSelector(
    (state: AppState) => state.surveyData.createQuestionStatus
  );
  const isLoader = useSelector(
    (state: AppState) => state.userData.isFormLoader
  );
  console.log("surveyId", surveyId);
  console.log("questionId234234", questionId);
  console.log("getQuestionDetails", getQuestionDetails);

  useEffect(() => {
    if (router.isReady) {
      if (questionId) {
        const getQuestionByIdPaylod: IGetQuestionsById = {
          questionId: Number(questionId),
        };
        dispatch(getQuestionById(getQuestionByIdPaylod));
      }
    }
  }, [questionId, router]);
  useEffect(() => {
    if (createQuestionState) {
      dispatch(questionStatus(false));
      router.push(`/questions/${router.query.id}`);
    }
  }, [createQuestionState]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] }, // Accept image files
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

  useEffect(() => {
    if (router.isReady) {
      if (!questionId) {
        const payload = {
          id: null,
          surveyId: 0,
          questionText: "",
          optionType: "",
          questionType: "",
          isSkippable: 0,
          audience: "",
          incentivePoint: 0,
          userSurveyResponse: [],
          questionResponse: [],
          questionOption: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        };
        dispatch(setQuestionById(payload));
      }
    }
  }, []);

  return (
    <div>
      <Layout>
        <div className="flex flex-wrap justify-between px-5 pt-4">
          <div>
            <h1 className="title_text_expo gradient-text font-bold">
              {questionId ? "Update Questions" : "Add Questions"}
            </h1>
          </div>
          <div>
            <BreadCrumbs items={items} />
          </div>
        </div>
        <div className="px-5">
          <div className="relative flex flex-col  bg-red-100 text-red-700 shadow-sm border border-red-200 rounded-lg w-full p-2 px-3">
            <h3 className="text-lg font-medium flex align-middle items-center justify-between">
              <span>{getSurvey?.name}</span>{" "}
              <span className="text-sm">
                Start Date: {getSurvey?.startAtLabel} | Expiry Date:{" "}
                {getSurvey?.endAtLabel}
              </span>
            </h3>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              surveyId: surveyId,
              questionText:
                getQuestionDetails && questionId
                  ? getQuestionDetails.questionText
                  : "",
              optionType:
                getQuestionDetails && questionId
                  ? getQuestionDetails.optionType.toLowerCase()
                  : "text",
              isSkippable:
                getQuestionDetails && questionId
                  ? getQuestionDetails.isSkippable
                  : 0,

              // Ensure 'options' and 'optionsImage' have the required fields
              options:
                getQuestionDetails &&
                  questionId &&
                  getQuestionDetails.questionOption
                  ? getQuestionDetails.questionOption.map((option: any) => ({
                    optionId: option.id,
                    questionId: option.questionId, // Ensure questionId is included
                    optionText: option.optionText,
                    optionImage: option.optionImage || "", // Add fallback in case of missing optionImage
                  }))
                  : [
                    {
                      optionId: "",
                      questionId: "", // Add questionId to match IOptions
                      optionText: "",
                      optionImage: "", // Empty fallback
                    },
                  ],

              questionType:
                getQuestionDetails && questionId
                  ? getQuestionDetails.questionType
                  : "",
              audience:
                getQuestionDetails && questionId
                  ? getQuestionDetails.audience.toLowerCase()
                  : "",
              incentivePoint:
                getQuestionDetails && questionId
                  ? getQuestionDetails.incentivePoint
                  : 0,

              optionsImage:
                getQuestionDetails &&
                  questionId &&
                  getQuestionDetails.questionOption
                  ? getQuestionDetails.questionOption.map((option: any) => ({
                    optionId: option.id,
                    optionText: option.optionText,
                    optionImage: option.optionImage,
                    image: option.image || "", // Add fallback for image
                    imageUrl: option.imageUrl || "", // Ensure imgUrl exists
                  }))
                  : [
                    {
                      optionId: "", // Ensure it matches IOptionsImage structure
                      optionText: "",
                      optionImage: "",
                      image: "",
                      imageUrl: "", // Empty fallback for imageUrl
                    },
                  ],

              ...(questionId && { questionId }), // Conditionally add questionId if it exists
            }}
            // onSubmit handler
            onSubmit={(values, { resetForm }) => {
              console.log("Submitted values:", values);

              // Ensure values have the required structure before dispatch
              const formattedValues = {
                ...values,
                options: values.options.map((option) => ({
                  ...option,
                  questionId: option.questionId || values.questionId, // Ensure questionId is there
                })),
                optionsImage: values.optionsImage.map((optionImage) => ({
                  ...optionImage,
                  imgUrl: optionImage.imageUrl || "", // Ensure imgUrl exists
                  options: optionImage.optionText || "", // Add the missing options property
                })),
              };

              if (values.questionId) {
                // If there's a questionId, it's an update
                dispatch(updateQuestion(formattedValues));
              } else {
                // Otherwise, it's a create action
                dispatch(createQuestion(formattedValues));
              }

              // If the createQuestion state is successful, reset the form
              if (createQuestionState) {
                resetForm();
              }
            }}
          >
            {({ values, setFieldValue }) => {
              const handleAnswerTypeChange = (event: any) => {
                const selectedAnswerType = event.target.value;
                setFieldValue("optionType", selectedAnswerType);

                // Clear optionType when switching to "image"
                if (selectedAnswerType === "image") {
                  setFieldValue("options", [""]); // Reset optionType when changing to image
                }
                // You can add more logic for clearing file inputs if needed
              };
              return (
                <Form className="mx-auto form-input pt-5">
                  {/* {console.log("werwerwe", values)} */}
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-5">
                    <div>
                      <label
                        htmlFor="questionType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Question Type
                      </label>
                      <div className="relative">
                        <Field
                          id="questionType"
                          name="questionType"
                          as="select"
                          value={values.questionType}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" selected disabled>
                            Select Question Type
                          </option>
                          <option value="SINGLE_CHOICE">Single Choice</option>
                          <option value="MULTIPLE_CHOICE">
                            Multiple Choice
                          </option>
                        </Field>
                        <div className="pointer-events-none absolute inset-y-0 top-1 right-0 flex items-center px-2 text-sm text-gray-700">
                          <FaAngleDown />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="isSkippable"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Skipable Question
                      </label>
                      <div className="relative">
                        <Field
                          id="isSkippable"
                          name="isSkippable"
                          as="select"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" selected disabled>
                            Select Option Type
                          </option>
                          <option value="1">True</option>
                          <option value="0">False</option>
                        </Field>
                        <div className="pointer-events-none absolute inset-y-0 top-1 right-0 flex items-center px-2 text-sm text-gray-700">
                          <FaAngleDown />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="incentivePoint"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Incentive Points
                      </label>
                      <Field
                        id="incentivePoint"
                        name="incentivePoint"
                        value={values.incentivePoint}
                        type="number"
                        max={99999}
                        min={0}
                        onInput={(e: any) => {
                          if (e.target.value.length > 5) {
                            e.target.value = e.target.value.slice(0, 5); // Limit input to 5 digits
                          }
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="audience"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Audience
                      </label>
                      <div className="relative">
                        <Field
                          id="audience"
                          name="audience"
                          as="select"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    </div>
                  </div>

                  {/* Answer Type: Select dropdown */}
                  <div className="grid grid-cols-4 gap-x-4 gap-y-2 pb-2">
                    <div>
                      <label
                        htmlFor="optionType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Answer Type
                      </label>
                      <div className="relative">
                        <Field
                          id="optionType"
                          name="optionType"
                          disabled={questionId ? true : false}
                          as="select"
                          value={values.optionType}
                          onChange={handleAnswerTypeChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" selected disabled>
                            Select Option Type
                          </option>
                          <option value="text">Text</option>
                          <option value="image">Image</option>
                        </Field>
                        <div className="pointer-events-none absolute inset-y-0 top-1 right-0 flex items-center px-2 text-sm text-gray-700">
                          <FaAngleDown />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* FieldArray for questionType */}
                  <div className="relative flex flex-col my-2 bg-white shadow-sm border border-slate-200 rounded-lg w-full p-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Question
                        </label>
                        <Field
                          id="questionText"
                          name="questionText"
                          type="text"
                          value={values.questionText}
                          placeholder="Add Question"
                          className="mt-1 mb-3 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <label className="block text-sm font-medium text-gray-700">
                          Question Options
                        </label>
                        {values.optionType === "text" ? (
                          // <FieldArray name="options">
                          //     {({ push, remove }) => (
                          //         <div className="space-y-2">
                          //             {values.options.map((question, index) => (
                          //                 // <div key={index} className="flex items-center space-x-4">
                          //                 <div className="grid grid-cols-6 gap-x-3 gap-y-2 pb-2">
                          //                     <Field
                          //                         name={`options[${index}].optionText`} // Bind to optionText
                          //                         type="text"
                          //                         placeholder="Add Option"
                          //                         className="col-span-5 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          //                     />
                          //                     <div className='col-span-1'>
                          //                         {index === values.options.length - 1 && values.options.length < 7 && (
                          //                             <button
                          //                                 type="button"
                          //                                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full h-full flex justify-center items-center"
                          //                                 onClick={() => push(
                          //                                     [{
                          //                                         optionId: '',
                          //                                         questionId: '',  // Add questionId to match IOptions
                          //                                         optionText: '',
                          //                                         optionImage: '', // Empty fallback
                          //                                     }]
                          //                                 )} // Add at the last index
                          //                             >
                          //                                 <FaPlus className="cursor-pointer" size={16} />
                          //                             </button>
                          //                         )}
                          //                         {index !== values.options.length - 1 && (
                          //                             <button
                          //                                 type="button"
                          //                                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full h-full flex justify-center items-center"
                          //                                 onClick={() => remove(index)} // Remove current option
                          //                             >
                          //                                 <FaMinus className="cursor-pointer" size={16} />
                          //                             </button>
                          //                         )}
                          //                     </div>

                          //                 </div>
                          //             ))}

                          //         </div>
                          //     )}
                          // </FieldArray>
                          <FieldArray name="options">
                            {({ push, remove }) => (
                              <div className="space-y-2">
                                {values.options.map((question, index) => (
                                  <div
                                    className="grid grid-cols-6 gap-x-3 gap-y-2 pb-2"
                                    key={index}
                                  >
                                    <Field
                                      name={`options[${index}].optionText`}
                                      type="text"
                                      placeholder="Add Option"
                                      className="col-span-5 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <div className="col-span-1">
                                      {index === values.options.length - 1 && values.options.length < 7 && (
                                        <button
                                          type="button"
                                          aria-label="Add Option"
                                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full h-full flex justify-center items-center"
                                          onClick={() =>
                                            push({
                                              optionId: "",
                                              questionId: "",
                                              optionText: "",
                                              optionImage: "", // Empty fallback
                                            })
                                          }
                                        >
                                          <FaPlus className="cursor-pointer" size={16} />
                                        </button>
                                      )}
                                      {index !== values.options.length - 1 && (
                                        <button
                                          type="button"
                                          aria-label="Remove Option"
                                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full h-full flex justify-center items-center"
                                          onClick={() => remove(index)}
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
                        ) : values.optionType === "image" ? (
                          <div>
                            {/* <div {...getRootProps()} style={dropzoneStyles}>
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
                                                        </div> */}

                            <FieldArray name="optionsImage">
                              {({ push, remove }) => (
                                <div className="space-y-2">
                                  {values.optionsImage.map((option, index) => (
                                    <div
                                      key={index}
                                      className="grid grid-cols-6 gap-x-3 gap-y-2 pb-2"
                                    >
                                      <Field
                                        name={`optionsImage[${index}].optionText`}
                                        type="text"
                                        placeholder="Add Option"
                                        className="col-span-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />

                                      <div className="col-span-2">
                                        {/* Conditionally render the file upload section only if the imageUrl is not set */}
                                        {!option.imageUrl &&
                                          !option.optionImage && (
                                            <div
                                              {...getRootProps()}
                                              style={dropzoneStyles}
                                            >
                                              <input
                                                {...getInputProps()}
                                                accept=".png, .jpeg, .jpg" // Restrict to PNG and JPEG
                                                onChange={(e) => {
                                                  const file = e.target.files
                                                    ? e.target.files[0]
                                                    : null;
                                                  if (!file) return;
                                                  if (file) {
                                                    // Check if the file is either PNG or JPEG
                                                    const validTypes = [
                                                      "image/png",
                                                      "image/jpeg",
                                                    ];
                                                    if (
                                                      !validTypes.includes(
                                                        file.type
                                                      )
                                                    ) {
                                                      // Show toast notification for invalid file type
                                                      toast.error(
                                                        "Only PNG and JPEG images are allowed!"
                                                      );
                                                      return; // Don't upload or store invalid file
                                                    }

                                                    // Store the file itself
                                                    setFieldValue(
                                                      `optionsImage[${index}].image`,
                                                      file
                                                    );
                                                    // Create a URL for the image to display
                                                    const imageUrl =
                                                      URL.createObjectURL(file);
                                                    setFieldValue(
                                                      `optionsImage[${index}].imageUrl`,
                                                      imageUrl
                                                    ); // Store image URL for display
                                                  }
                                                }}
                                              />
                                              <p>Select files</p>
                                            </div>
                                          )}
                                        {/* Show the uploaded image if it exists */}
                                        {option.imageUrl && (
                                          <img
                                            src={option.imageUrl}
                                            alt="Uploaded"
                                            className="w-14 h-14 object-cover"
                                          />
                                        )}
                                        {option.optionImage && (
                                          <img
                                            src={option.optionImage}
                                            alt="Uploaded"
                                            className="w-14 h-14 object-cover"
                                          />
                                        )}
                                      </div>

                                      <div className="col-span-1">
                                        {index === values.optionsImage.length - 1 && values.optionsImage.length < 4 && (
                                          <button
                                            type="button"
                                            aria-label="Add Option with Image"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full h-full flex justify-center items-center"
                                            onClick={() => {
                                              if (!option.imageUrl && !option.optionImage) {
                                                toast.error("Please upload an image");
                                                return;
                                              }
                                              push({
                                                optionText: "",
                                                optionId: "",
                                                optionImage: "",
                                                image: "",
                                                imageUrl: "",
                                              });
                                            }}
                                          >
                                            <FaPlus className="cursor-pointer" size={16} />
                                          </button>
                                        )}
                                        {index !== values.optionsImage.length - 1 && (
                                          <button
                                            type="button"
                                            aria-label="Remove Option with Image"
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full h-full flex justify-center items-center"
                                            onClick={() => remove(index)}
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
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mb-10">
                    <button
                      type="submit"
                      className="w-auto py-3 px- btn btn-dark px-6"
                      disabled={isLoader}
                    >
                      {isLoader ? <PulseLoader color="#ffffff" /> : "Submit"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Layout>
    </div>
  );
};

export default AddQuestions;
