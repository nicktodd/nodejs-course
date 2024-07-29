import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Component from "react";
// define some functional components
const AlbumTitle = (props) => <h2 class="album-title">{props.title}</h2>;
const AlbumArtist = (props) => <h3 class="album-artist">{props.name}</h3>;
const AlbumTracks = (props) => {
  return props.visible ? (
    <ol class="album-tracks">
      {props.tracks.map((track, i) => (
        <li key={i}>{track}</li>
      ))}
    </ol>
  ) : null;
};
const ShowHideButton = (props) => (
  <button onClick={props.toggle}>{props.visible ? "Hide" : "Show"}</button>
);

// the album will be maintaining some state, so make this a class component
class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ visible: this.state.visible ? false : true });
  }
  render() {
    return (
      <section
        id={"album-" + this.props.title.toLowerCase().replace(/ /g, "-")}
      >
        <AlbumTitle title={this.props.title} />
        <AlbumArtist name={this.props.artist} />
        <ShowHideButton visible={this.state.visible} toggle={this.toggle} />
        <AlbumTracks tracks={this.props.tracks} visible={this.state.visible} />
      </section>
    );
  }
}

// another functional component for the top level element
class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {music: []};
  }

  componentDidMount() {
    axios.get("/music.json").then(response => {
      //console.log(response.data);
      this.setState({music: response.data});
      //console.log(response.data);
    })
    .catch((e) => {
      console.log("Error occurred " + e);
    });
  }

  render() {
    return (
    <article>
      <h1>Record Collection</h1>
      <div className="albums">
        {this.state.music.map((album, i) => (
          <Album
            title={album.title}
            artist={album.artist}
            tracks={album.tracks}
          />
        ))}
      </div>
    </article>
  )};
};

ReactDOM.render(<App/>, document.getElementById("root"));
