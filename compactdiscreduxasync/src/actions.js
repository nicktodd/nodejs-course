import axios from "axios";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'
import cdsReducer from './CDReducer'

// these constants can be used as the names of the actions 
// so you minimise using the wrong string
export const FETCH_CDS_BEGIN   = 'FETCH_CDS_BEGIN';
export const FETCH_CDS_SUCCESS = 'FETCH_CDS_SUCCESS';
export const FETCH_CDS_FAILURE = 'FETCH_CDS_FAILURE';

export const fetchCDsBegin = () => ({
  type: FETCH_CDS_BEGIN
});

export const fetchCDsSuccess = cds => ({
  type: FETCH_CDS_SUCCESS,
  payload: { cds }
});

export const fetchCDsFailure = error => ({
  type: FETCH_CDS_FAILURE,
  payload: { error }
});

export function fetchCDs() {
  return dispatch => {
    dispatch(fetchCDsBegin());
    axios
    .get("http://localhost:8081/albums")
    .then(response => {
      console.log(response.data);
      dispatch(fetchCDsSuccess(response.data));
    })
    .catch(error => dispatch(fetchCDsFailure(error)));
  }
}

//TODO THIS IS NOT WORKING WITH ROOT REDUCER
export const store = createStore(cdsReducer, applyMiddleware(thunk));


