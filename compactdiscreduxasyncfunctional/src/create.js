import React, { useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {addCD, store, ADD_CD_BEGIN} from './actions';

import { useSelector, useDispatch } from "react-redux";


function Create(props) {

  const cdState = useSelector((state) => state);
  const {cd, loading, error} = cdState;
  const dispatch = useDispatch();


  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [tracks, setTracks] = useState("");
  const [price, setPrice] = useState("");
  


  const submitHandler = async(e) => {
    e.preventDefault();
    // this is empty
    cd.title = title;
    cd.artist = artist;
    cd.price = price;
    cd.tracks = tracks;

    dispatch(addCD(cd));
  };

  return (
    <>
      <div style={{ marginTop: 10 }}>
        <h3>Add New Training Album</h3>

        <form onSubmit={submitHandler} autoComplete="off">
          <div className="form-row">
            <div className="form-group col-md-5">
              <label for="title">Title: </label>
              <input
                id="title"
                type="text"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                
              />
            </div>
            <div className="form-group col-md-5">
              <label for="artist">Artist: </label>
              <input
                id="artist"
                type="text"
                className="form-control"
                onChange={(e) => setArtist(e.target.value)}
                
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label for="price">Price: </label>
              <input
                id="price"
                type="number"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                
              />
            </div>
            <div className="form-group col-md-5">
              <label for="tracks">Number of tracks: </label>
              <input
                id="tracks"
                type="number"
                className="form-control"
                onChange={(e) => setTracks(e.target.value)}
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
      </>
  );
}

export default Create;