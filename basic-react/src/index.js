import React from "react";
import ReactDOM from "react-dom";

// declare some data
var data = [
  {
    title: "Jagged Little Pill",
    artist: "Alanis Morisette",
    tracks: [
      "All I Really Want",
      "You Oughta Know",
      "Perfect",
      "Hand In My Pocket",
      "Right Through You",
      "Forgiven",
      "You Learn",
      "Head Over Feet",
      "Mary Jane",
      "Ironic",
      "Not the Doctor",
      "Wake Up",
    ],
  },
  {
    title: "Codes and Keys",
    artist: "Death Cab for Cutie",
    tracks: [
      "Hope Is a Fire",
      "Codes and Keys",
      "Some Boys",
      "Doors Unlocked and Open",
      "You Are a Tourist",
      "Unobstructed Views",
      "Monday Morning",
      "Portable Television",
      "Underneath the Sycamore",
      "St. Peter's Cathedral",
      "Stay Young, Go Dancing",
    ],
  },
  {
    title: "Sunshine",
    artist: "S Club 7",
    tracks: [
      "Don't Stop Movin'",
      "Show Me Your Colours",
      "You",
      "Have You Ever",
      "Good Times",
      "Boy Like You",
      "Sunshine",
      "Dance Dance Dance",
      "It's Alright",
      "Stronger",
      "Summertime Feeling",
      "I Will Find You",
      "Never Had a Dream Come True",
    ],
  },
];

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
const App = (props) => {
  return (
    <article>
      <h1>Record Collection</h1>
      <div class="albums">
        {props.data.map((album, i) => (
          <Album
            title={album.title}
            artist={album.artist}
            tracks={album.tracks}
          />
        ))}
      </div>
    </article>
  );
};
ReactDOM.render(<App data={data} />, document.getElementById("root"));
