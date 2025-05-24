import { Pagination } from "./userInterface";

export interface IInitialSurvey {
  // surveyData: ISurveyData;
  usersLoader: boolean;
  isFormLoader: boolean;
  formEroors: IFormErrors[];
  uploadStatusFile: boolean;
  createSurveyStatus: boolean;
  createQuestionStatus: boolean;
  surveysData: ISurveyData;
  surveyQuestionsData: ISurveyQuestionsData;
  getSurveyByIdData: IGetSurveyByIdData;
  // getQuestionsByIdData: IGetQuestionsByIdData;
  questionsDataById: ISurveyQuestions;
}

export interface IFormErrors {
  path: string;
  msg: string;
}

// new interface
export interface ICreateSurvey {
  id?: any;
  name: any;
  surveyNudgeIcon: any;
  surveyContent: any;
  priority: any;
  startDate: any;
  expiryDate: any;
}

export interface ICreateQuestion {
  id?: any;
  surveyId: any;
  questionText: string;
  optionType: string;
  options: IOptions[];
  questionType: string;
  audience: string;
  isSkippable: any;
  incentivePoint: any;
  optionsImage: IOptionsImage[];
  questionId?: any;
}
interface IOptions {
  optionId: any;
  questionId: any;
  optionText: any;
  optionImage: File | string;

}
interface IOptionsImage {
  options: any;
  optionId: any;
  optionText: string;
  image: any;
  optionImage: any;
  imgUrl: string;
}

export interface ISurvey {
  id: number | null;
  name: string; // Since `name` can be null
  surveyNudgeContent: string | null; // Since `surveyNudgeContent` can be null
  surveyNudgeIcon: string;
  startAt: string | null; // startAt can be null
  startAtLabel: string | null; // startAt can be null
  endAt: string | null; // endAt can be null
  endAtLabel: string | null; // endAt can be null
  priority: string; // priority can be null
  questions: IQuestions[] | null; // questions is an array and can be null
  userSurveyResponse: IUserSurveyResponse[] | null; // userSurveyResponse is an array, and can be null
  isEdit: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null; // deletedAt can be null
}
export interface ISurveyData {
  surveys: ISurvey[];
  pagination: Pagination;
}

interface IQuestions {
  id: number;
  image: string | null;
}

interface IUserSurveyResponse {
  id: number;
  socialMediaType: string;
  url: string;
}

export interface IGetSurvey {
  current_page: number,
  search: string;
}

export interface ISurveyQuestions {
  id: number | null;
  surveyId: number;
  questionText: string;
  optionType: string;
  questionType: string;
  isSkippable: number;
  audience: string;
  incentivePoint: number;
  userSurveyResponse: any[]; // or a more specific type
  questionResponse: any[];  // You can adjust the type here if necessary
  questionOption: any[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ISurveyQuestionsData {
  surveyQuestions: ISurveyQuestions[];
  pagination: Pagination;
}

export interface IGetSurveyQuestions {
  surveyId: number,
  current_page: number,
  search: string;
}

export interface IGetSurveyByIdData {
  getSurveyById: ISurvey;
}

export interface IGetSurveyById {
  surveyId: number,
}

export interface IGetQuestionsByIdData {
  getQuestionsById: ISurveyQuestions;
}

export interface IGetQuestionsById {
  questionId: number,
}

