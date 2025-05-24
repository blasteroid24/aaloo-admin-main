import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { UserActionTypes, UserActions } from '@/redux/action-types/userActionTypes';
import { toast } from 'react-toastify';
import router from 'next/router';
import { api } from '@/api-config/api';
import { getChefApi } from '../requests/userHandlerRequest';
import { setChefData, setFormErrors, setFormLoader, setUserLoader } from '@/redux/actions/userActionTypes';
import { SurveyActions, SurveyActionTypes } from '@/redux/action-types/surveyActionTypes';
import { IGetSurvey, IGetSurveyByIdData, IGetSurveyQuestions, ISurveyData, ISurveyQuestionsData } from '@/types/surveyInterface';
import { questionStatus, createSurveyStatus, getSurveyData, getSurveyQuestionsData, setQuestionById, setSurveyById, setSurveyData, setSurveyQuestionsData } from '@/redux/actions/surveyActionTypes';
import { createQuestionApi, createSurveyApi, deleteQuestionApi, deleteSurveyApi, getQuestionByIdApi, getSurveyApi, getSurveyByIdApi, getSurveyQuestionsApi, updateQuestionApi, updateSurveyApi } from '../requests/surveyHandlerRequest';


function* getSurveyHandler(action: SurveyActionTypes) {
    yield put(setUserLoader(true));

    try {
        const { data } = yield call(getSurveyApi, action.payload);
        if (data.status) {
            let surveyData: ISurveyData = {
                pagination: data?.data?.pagination,
                surveys: data?.data?.surveys,
            }
            console.log("Survey data", data);
            yield put(setSurveyData(surveyData))
        } else {
            toast.dismiss();
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(setUserLoader(false));
    }
}

function* deleteSurveyHandler(action: UserActionTypes) {
    // yield put(setUpdateLaunchTimeLoader(true));
    try {
        const { data } = yield call(deleteSurveyApi, action.payload);
        if (data.status) {
            toast.dismiss();
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            yield put(createSurveyStatus(true))
            const getSurveyPayload: IGetSurvey = {
                current_page: 1, // Convert back to one-indexed page
                search: ""
            };
            yield put(getSurveyData(getSurveyPayload));
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        // yield put(setUpdateLaunchTimeLoader(false));
    }
}

function* getSurveyQuestionsHandler(action: SurveyActionTypes) {
    yield put(setUserLoader(true));

    try {
        const { data } = yield call(getSurveyQuestionsApi, action.payload);
        if (data.status) {
            let surveyQuestionsData: ISurveyQuestionsData = {
                pagination: data?.data?.pagination,
                surveyQuestions: data?.data,
            }
            yield put(setSurveyQuestionsData(surveyQuestionsData))
        } else {
            toast.dismiss();
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(setUserLoader(false));
    }
}

function* getSurveyQuestionsByIdHandler(action: SurveyActionTypes) {
    yield put(setUserLoader(true));

    try {
        const { data } = yield call(getQuestionByIdApi, action.payload);
        if (data.status) {
            yield put(setQuestionById(data.data))
        } else {
            toast.dismiss();
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(setUserLoader(false));
    }
}

function* getSurveyByIdHandler(action: SurveyActionTypes) {
    yield put(setUserLoader(true));

    try {
        const { data } = yield call(getSurveyByIdApi, action.payload);
        if (data.status) {
            let surveyByIdData: IGetSurveyByIdData = {
                getSurveyById: data?.data,
            }
            yield put(setSurveyById(surveyByIdData))
        } else {
            toast.dismiss();
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(setUserLoader(false));
    }
}

function* createSurveyHandler(action: SurveyActionTypes) {
    yield put(setFormLoader(true));
    try {
        const { data } = yield call(createSurveyApi, action.payload);
        if (data.status) {
            toast.dismiss();
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            yield put(createSurveyStatus(true))
            const getSurveyPayload: IGetSurvey = {
                current_page: 1, // Convert back to one-indexed page
                search: ""
            };
            yield put(getSurveyData(getSurveyPayload)); // Dispatch the action to fetch users
            // yield put({ type: UserActions.CREATE_GAME_STATUS, payload: true });
        } else {
            toast.dismiss();
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(setFormLoader(false));
    }
}

function* updateSurveyHandler(action: SurveyActionTypes) {
    yield put(setFormLoader(true));
    try {
        const { data } = yield call(updateSurveyApi, action.payload);
        if (data.status) {
            toast.dismiss();
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            yield put(createSurveyStatus(true))
            const getSurveyPayload: IGetSurvey = {
                current_page: 1, // Convert back to one-indexed page
                search: ""
            };
            yield put(getSurveyData(getSurveyPayload)); // Dispatch the action to fetch users
        } else {
            toast.dismiss();
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(setFormLoader(false));
    }
}

function* createQuestionHandler(action: SurveyActionTypes) {
    yield put(setFormLoader(true));
    try {
        const { data } = yield call(createQuestionApi, action.payload);
        if (data.status) {
            yield put(questionStatus(true));
            toast.dismiss();
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            const getQuestionPayload: IGetSurveyQuestions = {
                surveyId: action.payload.surveyId,
                current_page: 1, // Convert back to one-indexed page
                search: ""
            };
            yield put(getSurveyQuestionsData(getQuestionPayload)); // Dispatch the action to fetch users
            // yield put({ type: UserActions.CREATE_GAME_STATUS, payload: true });
        } else {
            toast.dismiss();
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(setFormLoader(false));
    }
}

function* updateQuestionHandler(action: SurveyActionTypes) {
    yield put(setFormLoader(true));
    try {
        const { data } = yield call(updateQuestionApi, action.payload);
        if (data.status) {
            yield put(questionStatus(true));
            toast.dismiss();
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            const getQuestionPayload: IGetSurveyQuestions = {
                surveyId: action.payload.surveyId,
                current_page: 1,
                search: ""
            };
            yield put(getSurveyQuestionsData(getQuestionPayload)); // Dispatch the action to fetch users
        } else {
            toast.dismiss();
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(setFormLoader(false));
    }
}


function* deleteQuestionHandler(action: UserActionTypes) {
    // yield put(setUpdateLaunchTimeLoader(true));
    try {
        const { data } = yield call(deleteQuestionApi, action.payload);
        if (data.status) {
            console.log("deleteQuestionHandler", data);
            toast.dismiss();
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            const getQuestionPayload: IGetSurveyQuestions = {
                surveyId: action.payload.surveyId,
                current_page: 1, // Convert back to one-indexed page
                search: ""
            };
            yield put(getSurveyQuestionsData(getQuestionPayload));
        }
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        // yield put(setUpdateLaunchTimeLoader(false));
    }
}

export default function* surveySaga() {
    yield takeLatest(SurveyActions.GET_SURVEY, getSurveyHandler);
    yield takeLatest(SurveyActions.CREATE_SURVEY, createSurveyHandler);
    yield takeLatest(SurveyActions.UPDATE_SURVEY, updateSurveyHandler);
    yield takeLatest(SurveyActions.DELETE_SURVEY, deleteSurveyHandler);
    yield takeLatest(SurveyActions.CREATE_QUESTION, createQuestionHandler);
    yield takeLatest(SurveyActions.UPDATE_QUESTION, updateQuestionHandler);
    yield takeLatest(SurveyActions.DELETE_QUESTION, deleteQuestionHandler);
    yield takeLatest(SurveyActions.GET_SURVEY_QUESTIONS, getSurveyQuestionsHandler);
    yield takeLatest(SurveyActions.GET_QUESTION_BY_ID, getSurveyQuestionsByIdHandler);
    yield takeLatest(SurveyActions.GET_SURVEY_BY_ID, getSurveyByIdHandler);
}