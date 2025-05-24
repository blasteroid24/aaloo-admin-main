import { combineReducers } from 'redux';
import { Reducer } from 'redux';
import { AppState } from './types';

import userReducer from './reducers/userReducer';
import surveyReducer from './reducers/surveyReducer';

const appReducers: Reducer<AppState> = combineReducers({
   userData : userReducer,
   surveyData : surveyReducer,
});

// for reseting root reducer on logout
const rootReducer = (state: any, action: any) => {
   if (action.type === 'RESET_ALL_DATA') {
      const { featured } = state;
      const { myLearning } = state;
      const updatedLearning = {
         languageList : myLearning.languageList
      }
      state = { featured, updatedLearning };
      return appReducers(state, action);
   }
   return appReducers(state, action)
}

export default rootReducer;