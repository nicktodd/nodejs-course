import React, { useState, useEffect } from "react";
import { getCDById} from './actions';

import { useSelector, useDispatch } from "react-redux";


function Edit(props) {

  const cdState = useSelector((state) => state);
  const {cdToEdit, loading, error} = cdState;
  const dispatch = useDispatch();


  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [tracks, setTracks] = useState("");
  const [price, setPrice] = useState("");
  

  useEffect(() => {
    dispatch(getCDById("1"));
    return () => {
      //
    };
  }, []);


  const submitHandler = async(e) => {
    e.preventDefault();
    // this is empty
    cdToEdit.title = title;
    cdToEdit.artist = artist;
    cdToEdit.price = price;
    cdToEdit.tracks = tracks;

    //dispatch(addCD(cd));
  };
  //console.log("title is " + cd.title);
  return (
      
    <>
     {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
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
       )}
       ;
      </>
  );
}

export default Edit;