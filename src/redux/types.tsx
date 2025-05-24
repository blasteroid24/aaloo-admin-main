import { IInitialSurvey } from "@/types/surveyInterface";
import { IUser } from "@/types/userInterface";

 
export interface AppState {
  userData: IUser,
  surveyData: IInitialSurvey,
}
