import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { UserActionTypes, UserActions } from '@/redux/action-types/userActionTypes';
import { toast } from 'react-toastify';
import router from 'next/router';
import { ISetChefData, IUserProfile, IUsersData } from '@/types/userInterface';
import { api } from '@/api-config/api';
import { getChefApi, getUserApi, uploadExcelApi, userLoginApi, userLogoutApi } from '../requests/userHandlerRequest';
import { setChefData, setFormErrors, setUserLoader, setUserProfile, setUsers, uploadExcelStatus, userLoginLoading } from '@/redux/actions/userActionTypes';


function* userLoginHandler(action: UserActionTypes) {
    yield put(userLoginLoading(true));
    try {
        const { data } = yield call(userLoginApi, action.payload);
        if (data.status) {
            yield localStorage.setItem("access_token", data?.data?.token);
            yield (api.defaults.headers.common = {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            });
            const userPorfile: IUserProfile = {
                isAuth: true,
                email: data?.data?.user?.email,
                id: data?.data?.user?.id,
                name: data?.data?.user?.username,
            }
            if (data?.data?.user?.isEmailVerified) {
                yield router.push('/chef-management/survey-management')
            }
            yield put(setUserProfile(userPorfile))
            toast.success(data?.message);
        } else {
            yield put(setFormErrors(data?.message))
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

        }
    } catch (error: any) {
        yield put(setFormErrors(error?.response?.data.errors))
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(userLoginLoading(false));
    }
}

function* uploadExcelHandler(action: UserActionTypes) {
    yield put(userLoginLoading(true));
    try {
        const { data } = yield call(uploadExcelApi, action.payload);
        if (data.status) {
            console.log("Upload Excel Successfully", data);
            // yield put(setUploadExcel(data?.data))
            toast.success(data?.message);
            yield put(uploadExcelStatus(true));
        } else {
            yield put(setFormErrors(data?.message))
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // yield put(setFormErrors(error?.response?.data.errors))
        // toast.error(error?.response?.data?.message, {
        //     position: toast.POSITION.TOP_RIGHT,
        // });
        yield put(setFormErrors(error?.response?.data.errors))
        console.log("Error Log ==>0", error?.response?.data?.errors[0].rowIndex);
        const rowIndexError = error?.response?.data?.errors[0].rowIndex;
        const errorShow = error?.response?.data?.errors[0].errors[0];
        toast.error("Row" + rowIndexError + ":" + errorShow, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(userLoginLoading(false));
    }
}

function* getChefHandler(action: UserActionTypes) {
    yield put(setUserLoader(true));

    try {
        const { data } = yield call(getChefApi, action.payload);

        if (data.status) {
            let userData: ISetChefData = {
                pagination: data?.data?.pagination,
                chefs: data?.data?.chefs,
            }
            yield put(setChefData(userData))
        } else {

        }
    } catch (error: any) {

    } finally {
        yield put(setUserLoader(false));
    }
}

function* getUsersHandler(action: UserActionTypes) {
    yield put(setUserLoader(true));

    try {
        const { data } = yield call(getUserApi, action.payload);

        if (data.status) {
            let userData: IUsersData = {
                pagination: data?.data?.pagination,
                users: data?.data?.users,
            }
            yield put(setUsers(userData))
        } else {

        }
    } catch (error: any) {

    } finally {
        yield put(setUserLoader(false));
    }
}

function* userLogoutdHandler() {
    try {
        const { data } = yield call(userLogoutApi);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
    }
}

export default function* userSaga() {
    yield takeLatest(UserActions.USER_LOGIN, userLoginHandler);
    yield takeLatest(UserActions.UPLOAD_EXCEL, uploadExcelHandler);
    yield takeLatest(UserActions.GET_CHEF, getChefHandler);
    yield takeLatest(UserActions.GET_USERS, getUsersHandler);
    yield takeLatest(UserActions.LOGOUT, userLogoutdHandler);
}