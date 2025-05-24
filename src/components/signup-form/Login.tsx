import { ErrorMessage, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { setFormErrors, userLogin } from '@/redux/actions/userActionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@/redux/types'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import { IFormErrors } from '@/types/userInterface'
import LoginBanner from '../login-right-banner/LoginBanner';


type Props = {}

const Login = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isLoading = useSelector((state: AppState) => state.userData.userSignUpLoading)
  console.log("isLoading", isLoading);
  
  const formEroorData = useSelector((state: AppState) => state.userData.formEroors)
  const formEroorDataMessage = useSelector((state: AppState) => state.userData.formEroors)

  const [isShowPassword, setShowPassword] = useState(false)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address.')
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email address.'
      )
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required.'),
  });


  useEffect(() => {
    if (router.isReady) {
      dispatch(setFormErrors(
        formEroorData?.length &&
        formEroorData?.map((error) =>
          error.path === 'otp' ? { ...error, msg: '' } : error
        ) || []
      ));
    }
  }, [router])


  return (
    <>
      <div className="relative flex flex-wrap h-screen  bg-white">

        <div className="w-full h-full  md:w-1/2 login_baner md:block hidden">
          <LoginBanner />
        </div>
        <div className="relative w-full  md:w-1/2 p-8 md:overflow-hidden" style={{ backgroundImage: "linear-gradient(45deg, #ffffffed, #ffffffed), url('/images/bg-img2.svg')", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }}>

          <div className='flex h-full items-center md:mx-6 md:pt-10 sign-form'>

            <div className='w-full md:pt-2 pb-4 small-view md:px-10 lg:px-20'>
              <div className='flex justify-center items-center pb-5'>
                <Link href={"/"} className=''>
                  {/* <Image src={"/images/logo.svg"} alt="login img" width={215} height={51} /> */}
                  <h1 className='logo'>Aaloo</h1>
                </Link>

              </div>
              <Formik
                enableReinitialize
                initialValues={{
                  email: "",
                  password: "",
                  rememberMe: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  dispatch(userLogin(values));
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form className="form-input">
                    <div className="pb-4">
                      <input
                        className="border w-full p-2 mt-2"
                        type="text"
                        id="emailId"
                        name="email"
                        maxLength={30}
                        placeholder="Email"
                        onChange={(e) => setFieldValue("email", e.target.value)} // Set email value
                        onClick={() =>
                          dispatch(setFormErrors(
                            Array.isArray(formEroorData) 
                              ? formEroorData.map((error) =>
                                  error.path === 'email' ? { ...error, msg: '' } : error
                                )
                              : [] // Fallback to an empty array if formEroorData is not an array
                          ))
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-[13px]"
                      />
                    </div>

                    <div className="pb-4">
                      <div className="relative">
                        <input
                          className="border w-full p-2 mt-2"
                          type={isShowPassword ? "text" : "password"} // Fix toggle for password visibility
                          id="password"
                          name="password"
                          maxLength={16}
                          placeholder="Password"
                          onChange={(e) => setFieldValue("password", e.target.value)} // Set password value
                        />
                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center top-2 cursor-pointer">
                          {isShowPassword ? (
                            <Image
                              onClick={() => setShowPassword(false)} // Fix toggle handler
                              src="/images/icons/showPassword.png"
                              alt="hidePassword"
                              width={18}
                              height={12}
                            />
                          ) : (
                            <Image
                              onClick={() => setShowPassword(true)}
                              src="/images/icons/hidePassword.png"
                              alt="showPassword"
                              width={18}
                              height={12}
                            />
                          )}
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-[13px]"
                      />
                    </div>

                    {/* <div className="flex pb-3 pt-2">
                      <label className="flex">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          onChange={(e) => setFieldValue("rememberMe", e.target.checked)} // Handle rememberMe state
                        />
                        <span className="px-2 font-medium">Remember me for 14 days</span>
                      </label>
                    </div> */}

                    <div className="mt-3">
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
                    </div>
                  </Form>
                )}
              </Formik>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;
