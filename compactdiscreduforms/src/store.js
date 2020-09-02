import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cdsReducer from './CDReducer'
import { composeWithDevTools } from 'redux-devtools-extension';


import { reducer as formReducer } from 'redux-form'

const initialState = {
    cds: [],
    cd: {}
  }
// see this for combined reducers: https://stackoverflow.com/questions/35402389/combinereducers-causes-code-to-break
const rootReducer = combineReducers({
    cdsReducer:cdsReducer,
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer,
  });
  
  
  // this is how you can enable the redux plugin in chrome
  // https://github.com/zalmoxisus/redux-devtools-extension#usage
  export const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
  ));

