import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import complaintReducer from './complaintSlice';
import responseReducer from './responseSlice';

const rootReducer = combineReducers({
  user: userReducer,
  complaint: complaintReducer,
  response: responseReducer,
});

export default rootReducer;
