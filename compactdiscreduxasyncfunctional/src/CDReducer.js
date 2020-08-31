// This does not change whether functional or class based components


// import the various actions from actions.js which are used in the reducer
import { FETCH_CDS_BEGIN,
 FETCH_CDS_SUCCESS,
 FETCH_CDS_FAILURE } from './actions';

 import { ADD_CD_BEGIN,
  ADD_CD_SUCCESS,
  ADD_CD_FAILURE } from './actions';

 // an initial state variable used at the start
 const initialState = {
    cds: [],
    loading: false,
    error: null,
   
  };

  // the reducer is here. It is going to return different states depending upon the action
 export default  function cdsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_CDS_BEGIN:
        return {
          ...state,
          loading:true,
          error: null
        }
      case FETCH_CDS_SUCCESS:
        return {
          ...state,
          loading: false,
          cds: action.payload.cds
        };
      case FETCH_CDS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          cds: []
        };
        case ADD_CD_BEGIN:
          return {
            ...state,
            loading:true,
            error: null
          }
        case ADD_CD_SUCCESS:
          return {
            ...state,
            loading: false,
            
          };
        case ADD_CD_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
            
          };
      default:
          return state;
      }  
  }