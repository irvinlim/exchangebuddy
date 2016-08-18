import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

// Reducers
import { messageSnackbarOpen, messageSnackbarMessage } from './messageSnackbar';

const rootReducer = combineReducers({
  // Add more reducers here
  messageSnackbarOpen,
  messageSnackbarMessage,

  // Add routerReducer
  routing: routerReducer,

  // Add formReducer
  form: formReducer,
});

export default rootReducer;
