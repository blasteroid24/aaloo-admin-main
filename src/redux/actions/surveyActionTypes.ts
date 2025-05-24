import { ICreateQuestion, ICreateSurvey, IGetQuestionsById, IGetQuestionsByIdData, IGetSurvey, IGetSurveyById, IGetSurveyByIdData, IGetSurveyQuestions, ISurveyData, ISurveyQuestions, ISurveyQuestionsData } from "@/types/surveyInterface";
import { SurveyActions, SurveyActionTypes } from "../action-types/surveyActionTypes";
  
export const getSurveyData = (payload:IGetSurvey): SurveyActionTypes => ({
    type: SurveyActions.GET_SURVEY,
    payload
})

export const setSurveyData = (payload:ISurveyData): SurveyActionTypes => ({
    type: SurveyActions.SET_SURVEY,
    payload
})

export const deleteSurvey = (payload:any): SurveyActionTypes => ({
    type: SurveyActions.DELETE_SURVEY,
    payload
})

export const deleteQuestion = (payload:any): SurveyActionTypes => ({
    type: SurveyActions.DELETE_QUESTION,
    payload
})

export const createSurvey = (payload:ICreateSurvey): SurveyActionTypes => ({
    type: SurveyActions.CREATE_SURVEY,
    payload
})

export const createSurveyStatus = (payload: boolean): SurveyActionTypes => ({
    type: SurveyActions.CREATE_SURVEY_STATUS,
    payload
})

export const updateSurvey = (payload:ICreateSurvey): SurveyActionTypes => ({
    type: SurveyActions.UPDATE_SURVEY,
    payload
})

export const createQuestion = (payload:ICreateQuestion): SurveyActionTypes => ({
    type: SurveyActions.CREATE_QUESTION,
    payload
})

export const updateQuestion = (payload:ICreateQuestion): SurveyActionTypes => ({
    type: SurveyActions.UPDATE_QUESTION,
    payload
})

export const getQuestionById = (payload:IGetQuestionsById): SurveyActionTypes => ({
    type: SurveyActions.GET_QUESTION_BY_ID,
    payload
})

export const setQuestionById = (payload:ISurveyQuestions): SurveyActionTypes => ({
    type: SurveyActions.SET_QUESTION_BY_ID,
    payload
})

export const questionStatus = (payload: boolean): SurveyActionTypes => ({
    type: SurveyActions.CREATE_QUESTION_STATUS,
    payload
})

export const getSurveyQuestionsData = (payload:IGetSurveyQuestions): SurveyActionTypes => ({
    type: SurveyActions.GET_SURVEY_QUESTIONS,
    payload
})

export const setSurveyQuestionsData = (payload:ISurveyQuestionsData): SurveyActionTypes => ({
    type: SurveyActions.SET_SURVEY_QUESTIONS,
    payload
})

export const getSurveyById = (payload:IGetSurveyById): SurveyActionTypes => ({
    type: SurveyActions.GET_SURVEY_BY_ID,
    payload
})

export const setSurveyById = (payload:IGetSurveyByIdData): SurveyActionTypes => ({
    type: SurveyActions.SET_SURVEY_BY_ID,
    payload
})