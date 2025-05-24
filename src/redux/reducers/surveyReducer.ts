import { IInitialSurvey } from "@/types/surveyInterface";
import { SurveyActions, SurveyActionTypes } from "../action-types/surveyActionTypes";
import { number } from "yup";

const initialState: IInitialSurvey = {
  uploadStatusFile: false,
  createQuestionStatus: false,
  createSurveyStatus: false,
  usersLoader: false,
  isFormLoader: false,
  surveysData: {
    surveys: [],
    pagination: {
      total_count: 0,
      current_page: 0,
      next_page: null,
      previous_page: null,
      total_pages: null,
      per_page: null,
    },
  },
  surveyQuestionsData: {
    surveyQuestions: [],
    pagination: {
      total_count: 0,
      current_page: 0,
      next_page: null,
      previous_page: null,
      total_pages: null,
      per_page: null,
    },
  },
  getSurveyByIdData: {
    getSurveyById: {
      id: 0,
      name: "",
      surveyNudgeContent: "",
      surveyNudgeIcon: "",
      startAt: "",
      startAtLabel: "",
      endAt: "",
      endAtLabel: "",
      priority: "",
      isEdit: false,
      questions: [],
      userSurveyResponse: [],
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
    },
  },
  questionsDataById: {
    id: 0,
    surveyId: 0,
    questionText: "",
    optionType: "",
    questionType: "",
    audience: "",
    isSkippable: 0,
    incentivePoint: 0,
    userSurveyResponse: [],
    questionResponse: [],
    questionOption: [],
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  },
  formEroors: [],
};

export default function surveyReducer(
  state = initialState,
  action: SurveyActionTypes
): IInitialSurvey {
  switch (action.type) {
    case SurveyActions.CREATE_SURVEY_STATUS: {
      return {
        ...state,
        uploadStatusFile: action.payload,
      };
    }
    case SurveyActions.CREATE_QUESTION_STATUS: {
      return {
        ...state,
        createQuestionStatus: action.payload,
      };
    }
    case SurveyActions.SET_SURVEY: {
      return {
        ...state,
        surveysData: action.payload,
      };
    }
    case SurveyActions.SET_SURVEY_QUESTIONS: {
      return {
        ...state,
        surveyQuestionsData: action.payload,
      };
    }
    case SurveyActions.SET_SURVEY_BY_ID: {
      return {
        ...state,
        getSurveyByIdData: action.payload,
      };
    }
    case SurveyActions.SET_QUESTION_BY_ID: {
      return {
        ...state,
        questionsDataById: action.payload,
      };
    }

    default:
      return state;
  }
}
