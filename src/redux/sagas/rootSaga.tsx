import { all, call } from 'redux-saga/effects';
import userSaga from './handlers/userHandlers';
import surveySaga from './handlers/surveyHandlers';

export default function* rootSaga() {
    yield all([
        call(userSaga),
        call(surveySaga),
    ]);
}
