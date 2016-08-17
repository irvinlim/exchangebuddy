import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import { messageSnackbarOpen, messageSnackbarMessage } from './messageSnackbar';

const rootReducer = combineReducers({
  // Add more reducers here
  messageSnackbarOpen,
  messageSnackbarMessage,

  // Add routerReducer
  routing: routerReducer
});

export default rootReducer;
