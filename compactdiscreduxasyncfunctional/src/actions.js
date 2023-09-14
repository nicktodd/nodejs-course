// this is not changed for functional components

import axios from "axios";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cdsReducer from './CDReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

// these constants can be used as the names of the actions 
// so you minimise using the wrong string
export const FETCH_CDS_BEGIN   = 'FETCH_CDS_BEGIN';
export const FETCH_CDS_SUCCESS = 'FETCH_CDS_SUCCESS';
export const FETCH_CDS_FAILURE = 'FETCH_CDS_FAILURE';

export const ADD_CD_BEGIN   = 'ADD_CD_BEGIN';
export const ADD_CD_SUCCESS = 'ADD_CD_SUCCESS';
export const ADD_CD_FAILURE = 'ADD_CD_FAILURE';

export const GET_CD_BEGIN   = 'GET_CD_BEGIN';
export const GET_CD_SUCCESS = 'GET_CD_SUCCESS';
export const GET_CD_FAILURE = 'GET_CD_FAILURE';


export const getCDBegin = () => ({
  type: GET_CD_BEGIN
  
});

export const getCDSuccess = cd => ({
  type: GET_CD_SUCCESS,
  payload: { cd }
});

export const getCDFailure = error => ({
  type: GET_CD_FAILURE,
  payload: { error }
});



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


export function getCDById(id) {
  return dispatch => {
    dispatch(getCDBegin());
    axios
    .get("http://localhost:8081/albums/" + id)
    .then(response => {
      console.log(response.data);
      dispatch(getCDSuccess(response.data));
    })
    .catch(error => dispatch(getCDFailure(error)));
  }
}

const initialState = {
  cds: [],
  cd: {}
}

// this is how you can enable the redux plugin in chrome
// https://github.com/zalmoxisus/redux-devtools-extension#usage

export const store = createStore(cdsReducer, initialState, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

// original without the plugin
//export const store = createStore(cdsReducer, initialState, applyMiddleware(thunk));

