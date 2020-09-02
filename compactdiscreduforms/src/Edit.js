import React, { useState, useEffect, connect } from "react";
import { getCDById} from './actions';

import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from 'redux-form'

import getCDByID from './actions'

function Edit(props) {

  const cdState = useSelector((state) => state.cdsReducer);
  const {cdToEdit, loading, error} = cdState;
  //const dispatch = useDispatch();

  //const {title,artist,price,tracks} = cdToEdit;

  // now initialised at the end of the file
  /*useEffect(() => {
    dispatch(getCDById("1"));
    return () => {
      //
    };
  }, []);
*/
  
  const submitHandler = async(e) => {
    e.preventDefault();
  };

  return (
      
    <>
     {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
      <div style={{ marginTop: 10 }}>
        <h3>Edit Album</h3>

        <form onSubmit={submitHandler} autoComplete="off">
          <div className="form-row">
            <div className="form-group col-md-5">
              <label for="title">Title: </label>
              <Field
                component="input"
                className="form-control"
                name="title"
              />
            </div>
            <div className="form-group col-md-5">
              <label for="artist">Artist: </label>
              <Field 
                component="input"
                className="form-control"
                name="artist"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label for="price">Price: </label>
              <Field
                name="price"
                component="input"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-5">
              <label for="tracks">Number of tracks: </label>
              <Field
                name="tracks"
                type="number"
                className="form-control"
                component="input"
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Album"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
       )}
       ;
      </>
  );
}

Edit = reduxForm({
  form: 'editForm' // a unique identifier for this form
})(Edit)

// You have to connect() to any reducers that you wish to connect to yourself
Edit = connect(
  state => ({
    initialValues: state.cdsReducer.cdToEdit // pull initial values from account reducer
  }),
  // action, ????
  { getCDById: getCDById } // bind account loading action creator
)(Edit)

export default Edit;