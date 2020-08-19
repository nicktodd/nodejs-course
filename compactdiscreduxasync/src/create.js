import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {addCD, store, ADD_CD_BEGIN} from './actions';


function mapStateToProps(state) { 
  console.log(JSON.stringify(state));  
  return { 
      error: state.error,
      loading: state.loading,
      cd: state.cd
    };
}

// used in the connect
// allows you to call dispatchers
// without referring to the dispatch function directly
const mapDispatchToProps = {
  addCD
};

class Create extends React.Component {

  async onSubmit(e) {
    e.preventDefault();
    let cd = {
      title: this.getTitle.value,
      artist: this.getArtist.value,
      price: this.getPrice.value,
      tracks: this.getTracks.value
    };
    this.props.addCD(cd);
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Training Album</h3>

        <form onSubmit={this.onSubmit.bind(this)} autoComplete="off">
          <div className="form-row">
            <div className="form-group col-md-5">
              <label for="title">Title: </label>
              <input
                id="title"
                type="text"
                className="form-control"
                ref={(input)=>this.getTitle = input} 
                
              />
            </div>
            <div className="form-group col-md-5">
              <label for="artist">Artist: </label>
              <input
                id="artist"
                type="text"
                className="form-control"
                ref={(input)=>this.getArtist = input} 
                
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
                ref={(input)=>this.getPrice = input} 
                
              />
            </div>
            <div className="form-group col-md-5">
              <label for="tracks">Number of tracks: </label>
              <input
                id="tracks"
                type="number"
                className="form-control"
                ref={(input)=>this.getTracks = input} 
                
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
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Create);