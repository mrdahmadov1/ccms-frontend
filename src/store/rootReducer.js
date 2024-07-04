import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import complaintReducer from './complaintSlice';

const rootReducer = combineReducers({
  user: userReducer,
  complaint: complaintReducer,
});

export default rootReducer;
