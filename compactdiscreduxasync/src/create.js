import React, { Component } from "react";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeTracks = this.onChangeTracks.bind(this);
    this.state = this.resetState();
    this.state.errors = {};
  }

  onChangeArtist(e) {
    this.setState({
      artist: e.target.value
    });
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeTracks(e) {
    this.setState({
      tracks: e.target.value
    });
  }

  resetState() {
    return {
      title: "",
      artist: "",
      tracks: "",
      price: ""
    };
  }

  async onSubmit(e) {
    e.preventDefault();

    const obj = {
      price: this.state.price,
      title: this.state.title,
      artist: this.state.artist,
      tracks: this.state.tracks
    };
    axios
      .post("http://localhost:8081/music", obj)
      .then(res => {
        console.log(res.data);
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
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
                value={this.state.title}
                onChange={this.onChangeTitle}
              />
            </div>
            <div className="form-group col-md-5">
              <label for="artist">Artist: </label>
              <input
                id="artist"
                type="text"
                className="form-control"
                value={this.state.artist}
                onChange={this.onChangeArtist}
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
                value={this.state.price}
                onChange={this.onChangePrice}
              />
            </div>
            <div className="form-group col-md-5">
              <label for="tracks">Number of tracks: </label>
              <input
                id="tracks"
                type="number"
                className="form-control"
                value={this.state.tracks}
                onChange={this.onChangeTracks}
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
