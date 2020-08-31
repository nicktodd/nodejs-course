// this is not changed for functional components

import axios from "axios";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cdsReducer from './CDReducer'

// these constants can be used as the names of the actions 
// so you minimise using the wrong string
export const FETCH_CDS_BEGIN   = 'FETCH_CDS_BEGIN';
export const FETCH_CDS_SUCCESS = 'FETCH_CDS_SUCCESS';
export const FETCH_CDS_FAILURE = 'FETCH_CDS_FAILURE';

export const ADD_CD_BEGIN   = 'ADD_CD_BEGIN';
export const ADD_CD_SUCCESS = 'ADD_CD_SUCCESS';
export const ADD_CD_FAILURE = 'ADD_CD_FAILURE';


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

// Add CD
export const addCDBegin = () => ({
  type: ADD_CD_BEGIN
});

export const addCDSuccess = cds => ({
  type: ADD_CD_SUCCESS,
  payload: { message: "success" }
});

export const addCDFailure = error => ({
  type: ADD_CD_FAILURE,
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


export function addCD(cd) {
  return dispatch => {
    dispatch(addCDBegin());
    axios
    .post("http://localhost:8081/albums", cd)
    .then(response => {
      console.log(response.data);
      dispatch(addCDSuccess(response.data));
    })
    .catch(error => dispatch(addCDFailure(error)));
  }
}

const initialState = {
  cds: [],
  cd: {}
}

export const store = createStore(cdsReducer, initialState, applyMiddleware(thunk));


